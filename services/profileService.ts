import { databases, APPWRITE_CONFIG, Query } from '../lib/appwrite';

interface Profile {
    $id: string;
    full_name: string;
    avatar_url?: string;
    address_street?: string;
    address_city?: string;
    address_state?: string;
    address_zip?: string;
    phone?: string;
}

export const getProfile = async (userId: string): Promise<Profile | null> => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.usersCollectionId,
            [Query.equal("$id", userId)]
        );
        return response.documents[0] as unknown as Profile || null;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
    try {
        const response = await databases.updateDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.usersCollectionId,
            userId,
            updates
        );
        return response;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const getWishlist = async (userId: string) => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            'wishlist',
            [Query.equal("user_id", userId)]
        );
        return response.documents;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
};

export const addToWishlist = async (userId: string, productId: string) => {
    try {
        const response = await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            'wishlist',
            'unique()',
            {
                user_id: userId,
                product_id: productId,
                created_at: new Date().toISOString()
            }
        );
        return response;
    } catch (error: any) {
        if (error.code === 409) {
            return null;
        }
        console.error('Error adding to wishlist:', error);
        throw error;
    }
};

export const removeFromWishlist = async (userId: string, productId: string) => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            'wishlist',
            [Query.equal("user_id", userId), Query.equal("product_id", productId)]
        );

        if (response.documents.length > 0) {
            await databases.deleteDocument(
                APPWRITE_CONFIG.databaseId,
                'wishlist',
                response.documents[0].$id
            );
        }
        return true;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
};

export const isInWishlist = async (userId: string, productId: string): Promise<boolean> => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            'wishlist',
            [Query.equal("user_id", userId), Query.equal("product_id", productId)]
        );
        return response.documents.length > 0;
    } catch (error) {
        console.error('Error checking wishlist:', error);
        return false;
    }
};

export const toggleWishlist = async (userId: string, productId: string): Promise<boolean> => {
    const exists = await isInWishlist(userId, productId);

    if (exists) {
        await removeFromWishlist(userId, productId);
        return false;
    } else {
        await addToWishlist(userId, productId);
        return true;
    }
};