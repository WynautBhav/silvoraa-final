'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    getCurrentUser, 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    appwriteSignOut 
} from '@/lib/appwrite';
import { Product } from '@/types';
import * as profileService from '@/services/profileService';
import { trackLogin, captureIdentify } from '@/hooks/useAnalytics';

export interface Order {
    id: string;
    date: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    items: { product: Product; quantity: number }[];
    total: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    joinedDate: string;
    orders: Order[];
    wishlist: Product[];
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
    };
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    appwriteUser: any;
    session: any;
    showSplash: boolean;
    dismissSplash: () => void;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ error?: string }>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (updates: Partial<User>) => Promise<void>;
    toggleWishlist: (product: Product) => Promise<boolean>;
    isInWishlist: (productId: string) => boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [appwriteUser, setAppwriteUser] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(typeof document !== 'undefined');
    const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set<string>());
    const [showSplash, setShowSplash] = useState(false);
    const dismissSplash = () => setShowSplash(false);

    const loadUserProfile = async (awUser: any) => {
        try {
            const profilePromise = profileService.getProfile(awUser.$id);
            const wishlistPromise = profileService.getWishlist(awUser.$id);

            const timeout = (p: Promise<any>, ms: number) =>
                Promise.race([p, new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))]);

            const [profileResult, wishlistResult] = await Promise.allSettled([
                timeout(profilePromise, 8000),
                timeout(wishlistPromise, 8000),
            ]);

            const profile = profileResult.status === 'fulfilled' ? profileResult.value : null;
            const wishlist = wishlistResult.status === 'fulfilled' ? wishlistResult.value : [];

            const wishlistProductIds = new Set<string>(
                wishlist?.map((w: any) => w.products?.id).filter(Boolean) || []
            );
            setWishlistIds(wishlistProductIds);

            const mappedUser: User = {
                id: awUser.$id,
                name: profile?.full_name || awUser.name || awUser.email?.split('@')[0] || 'User',
                email: awUser.email || '',
                avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || awUser.email}`,
                joinedDate: awUser.$createdAt || new Date().toISOString(),
                orders: [],
                wishlist: wishlist?.map((w: any) => w.products).filter(Boolean) || [],
                address: profile?.address_street ? {
                    street: profile.address_street,
                    city: profile.address_city || '',
                    state: profile.address_state || '',
                    zip: profile.address_zip || '',
                    phone: profile.phone || '',
                } : undefined,
            };

            setUser(mappedUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error loading user profile:', error);
            setUser({
                id: awUser.$id,
                name: awUser.email?.split('@')[0] || 'User',
                email: awUser.email || '',
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${awUser.email}`,
                joinedDate: awUser.$createdAt || new Date().toISOString(),
                orders: [],
                wishlist: [],
            });
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        let mounted = true;

        const timer = setTimeout(() => {
            if (mounted && isLoading) {
                console.warn('Auth initialization timed out, forcing completion');
                setIsLoading(false);
            }
        }, 5000);

        const initAuth = async () => {
            try {
                const { user, error } = await getCurrentUser();

                if (!mounted) return;

                if (user) {
                    console.log('User found in initAuth, loading profile:', user.email);
                    setAppwriteUser(user);
                    setSession(user); // Mapping user to session for initial state
                    await loadUserProfile(user);
                }
            } catch (error: any) {
                console.error('Error initializing auth:', error.message || error);
            } finally {
                if (mounted) {
                    clearTimeout(timer);
                    setIsLoading(false);
                }
            }
        };

        initAuth();

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, []);

    const login = async (email: string, password: string): Promise<{ error?: string }> => {
        setIsLoading(true);
        console.log('Attempting login for:', email);
        try {
            const { user, session: awSession, error } = await signInWithEmail(email, password);

            if (error) {
                console.error('Login error returned from Appwrite:', error);
                setIsLoading(false);
                return { error };
            }

            if (user) {
                console.log('Login successful, setting user state:', user.email);
                setAppwriteUser(user);
                setSession(awSession);
                await loadUserProfile(user);
                trackLogin('email');
                captureIdentify(user.$id, user.email, user.name || user.email?.split('@')[0]);
                setShowSplash(true);
            }

            setIsLoading(false);
            return {};
        } catch (error: any) {
            console.error('Unexpected login exception:', error.message || error);
            setIsLoading(false);
            return { error: error.message || 'Login failed' };
        }
    };

    const signup = async (email: string, password: string, name: string): Promise<{ error?: string }> => {
        setIsLoading(true);
        console.log('Attempting signup for:', email);
        try {
            const { user, session: awSession, error } = await signUpWithEmail(email, password, name);

            if (error) {
                console.error('Signup error returned from Appwrite:', error);
                setIsLoading(false);
                return { error };
            }

            if (user) {
                console.log('Signup successful, setting user state:', user.email);
                setAppwriteUser(user);
                setSession(awSession);
                await loadUserProfile(user);
                trackLogin('email');
                captureIdentify(user.$id, user.email, name);
                setShowSplash(true);
            }
            setIsLoading(false);
            return {};
        } catch (error: any) {
            console.error('Unexpected signup exception:', error.message || error);
            setIsLoading(false);
            return { error: error.message || 'Signup failed' };
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithGoogle();
            trackLogin('google');
        } catch (error) {
            console.error('Google sign in error:', error);
            throw error;
        }
    };

    const logout = async () => {
        await appwriteSignOut();
        setUser(null);
        setAppwriteUser(null);
        setSession(null);
        setIsAuthenticated(false);
        setWishlistIds(new Set());
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!user || !appwriteUser) return;

        try {
            await profileService.updateProfile(appwriteUser.$id, {
                full_name: updates.name,
                avatar_url: updates.avatar,
                address_street: updates.address?.street,
                address_city: updates.address?.city,
                address_state: updates.address?.state,
                address_zip: updates.address?.zip,
                phone: updates.address?.phone,
            });

            setUser({ ...user, ...updates });
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    const toggleWishlist = async (product: Product): Promise<boolean> => {
        if (!user || !appwriteUser) return false;

        try {
            const added = await profileService.toggleWishlist(appwriteUser.$id, product.id);

            if (added) {
                setWishlistIds(new Set([...wishlistIds, product.id]));
                setUser({ ...user, wishlist: [...user.wishlist, product] });
            } else {
                const newIds = new Set(wishlistIds);
                newIds.delete(product.id);
                setWishlistIds(newIds);
                setUser({ ...user, wishlist: user.wishlist.filter(p => p.id !== product.id) });
            }

            return added;
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            return false;
        }
    };

    const isInWishlist = (productId: string): boolean => {
        return wishlistIds.has(productId);
    };

    const refreshUser = async () => {
        if (appwriteUser) {
            await loadUserProfile(appwriteUser);
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            user,
            appwriteUser,
            session,
            showSplash,
            dismissSplash,
            login,
            signup,
            loginWithGoogle,
            logout,
            updateProfile,
            toggleWishlist,
            isInWishlist,
            refreshUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};