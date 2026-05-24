"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/components/Auth/AuthContext';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Loader2, Gem, AlertCircle, CheckCircle } from 'lucide-react';



const AuthPage : React.FC = () => {
    const router = useRouter();
    const onLoginSuccess = () => router.push('/account');
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup, loginWithGoogle, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [localLoading, setLocalLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLocalLoading(true);

        try {
            if (isLogin) {
                const result = await login(formData.email, formData.password);
                if (result.error) {
                    setError(result.error);
                } else {
                    onLoginSuccess();
                }
            } else {
                // Signup
                if (formData.password.length < 6) {
                    setError('Password must be at least 6 characters');
                    setLocalLoading(false);
                    return;
                }

                const result = await signup(formData.email, formData.password, formData.name);
                if (result.error) {
                    // Check if it's an email confirmation message
                    if (result.error && result.error.includes('check your email')) {
                        setSuccessMessage(result.error);
                        setError(null);
                    } else {
                        setError(result.error || 'An error occurred');
                    }
                } else {
                    onLoginSuccess();
                }
            }
        } catch (err: any) {
            let userMessage = 'An error occurred. Please try again.';
            
            if (err.message?.includes('Invalid credentials')) {
                userMessage = 'Invalid email or password. Please double-check your credentials.';
            } else if (err.message?.includes('network')) {
                userMessage = 'Connection error. Please check your internet.';
            } else {
                userMessage = err.message || userMessage;
            }
            
            setError(userMessage);
        } finally {
            setLocalLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        try {
            await loginWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Google login failed');
        }
    };

    const loading = localLoading || isLoading;

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#FDFCF8] text-silvoraa-black">
            

            {/* Ethereal Background (Light Theme) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-silvoraa-gold/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-gray-200 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 opacity-40" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            {/* Interaction Card */}
            <div className="relative z-10 w-full max-w-5xl lg:h-[700px] flex flex-col lg:flex-row bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/50 animate-in fade-in zoom-in-95 duration-1000">

                {/* Left: Branding & Visuals (Editorial Style) */}
                <div className="hidden lg:flex w-[45%] relative flex-col justify-between p-12 bg-white">
                    {/* Abstract Silver Visual */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-[#F5F5F0]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 rotate-12 bg-[url('https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-125" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-8">
                            <Gem className="w-6 h-6 text-silvoraa-black" />
                        </div>
                        <h1 className="text-5xl font-serif text-silvoraa-black leading-[1.1]">
                            Authentic.<br />
                            <span className="text-gray-400 font-light italic">Timeless.</span><br />
                            Yours.
                        </h1>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-gold mb-2">
                            <span className="w-8 h-px bg-silvoraa-gold" />
                            The Promise
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[80%] font-medium">
                            Step inside to curate your personal collection of sterling silver and ethically sourced gemstones.
                        </p>
                    </div>
                </div>

                {/* Right: Auth Forms */}
                <div className="w-full lg:w-[55%] p-8 md:p-16 flex flex-col justify-center bg-white/40">
                    <div className="max-w-sm w-full mx-auto">
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-2xl font-serif text-silvoraa-black mb-2 animate-in slide-in-from-bottom-2 fade-in">
                                {isLogin ? 'Sign In to Silvoraa' : 'Create Your Account'}
                            </h2>
                            <p className="text-sm text-gray-500 animate-in slide-in-from-bottom-2 fade-in delay-75">
                                {isLogin ? 'Welcome back, collector.' : 'Join us for exclusive access and rewards.'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm animate-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 text-sm animate-in slide-in-from-top-2">
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{successMessage}</span>
                            </div>
                        )}

                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full mb-6 bg-white border border-gray-200 py-3.5 rounded-xl font-medium text-sm hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-bottom-4 fade-in delay-150">
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-silvoraa-black transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-silvoraa-black/30 placeholder-gray-300 transition-all shadow-sm hover:border-gray-300"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-silvoraa-black transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-silvoraa-black/30 placeholder-gray-300 transition-all shadow-sm hover:border-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Password</label>
                                    {isLogin && <button type="button" className="text-[10px] font-bold text-silvoraa-gold hover:underline">Forgot?</button>}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-silvoraa-black transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={6}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-silvoraa-black/30 placeholder-gray-300 transition-all shadow-sm hover:border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-silvoraa-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {!isLogin && (
                                    <p className="text-[10px] text-gray-400 ml-1">Minimum 6 characters</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-silvoraa-black text-white py-4 rounded-xl font-bold uppercase tracking-[0.15em] text-xs hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group mt-6 shadow-xl shadow-black/5"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-200/60 text-center">
                            <p className="text-sm text-gray-500">
                                {isLogin ? "New to Silvoraa?" : "Already a member?"}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError(null);
                                        setSuccessMessage(null);
                                    }}
                                    className="ml-2 font-bold text-silvoraa-black hover:text-silvoraa-gold transition-colors"
                                >
                                    {isLogin ? 'Create an account' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="absolute bottom-6 flex gap-6 text-[10px] text-gray-300 uppercase tracking-widest font-medium">
                <span>Secure Login</span>
                <span>•</span>
                <span>Privacy First</span>
            </div>
        </div>
    );
};


export default AuthPage;
