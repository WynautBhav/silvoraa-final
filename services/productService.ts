import { getDatabases, APPWRITE_CONFIG, Query } from '../lib/appwrite';

interface Product {
    $id: string;
    title: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    images?: string[];
    type: string;
    stone?: string;
    tags?: string[];
    handle: string;
    created_at: string;
    updated_at?: string;
}

export const getProducts = async (): Promise<Product[]> => {
    const db = getDatabases();
    if (!db) return [];
    try {
        const response = await db.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            [Query.limit(1000)]
        );
        return response.documents as unknown as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const getProductByHandle = async (handle: string): Promise<Product | null> => {
    const db = getDatabases();
    if (!db) return null;
    try {
        const response = await db.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            [Query.equal("handle", handle)]
        );
        return (response.documents[0] as unknown as Product) || null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const db = getDatabases();
    if (!db) return null;
    try {
        const response = await db.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            id
        );
        return response as unknown as Product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export const getProductsByType = async (type: string): Promise<Product[]> => {
    const db = getDatabases();
    if (!db) return [];
    try {
        const response = await db.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            [Query.equal("type", type), Query.limit(1000)]
        );
        return response.documents as unknown as Product[];
    } catch (error) {
        console.error('Error fetching products by type:', error);
        return [];
    }
};

export const getProductsByStone = async (stone: string): Promise<Product[]> => {
    const db = getDatabases();
    if (!db) return [];
    try {
        const response = await db.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            [Query.equal("stone", stone), Query.limit(1000)]
        );
        return response.documents as unknown as Product[];
    } catch (error) {
        console.error('Error fetching products by stone:', error);
        return [];
    }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    const db = getDatabases();
    if (!db) return [];
    try {
        const response = await db.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            [Query.or([Query.search("title", query), Query.search("description", query)]), Query.limit(1000)]
        );
        return response.documents as unknown as Product[];
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
};

export const getProductTypes = async (): Promise<string[]> => {
    try {
        const products = await getProducts();
        const types = [...new Set(products.map(p => p.type).filter(Boolean))];
        return types;
    } catch (error) {
        console.error('Error fetching product types:', error);
        return [];
    }
};

export const getStoneTypes = async (): Promise<string[]> => {
    try {
        const products = await getProducts();
        const stones = [...new Set(products.map(p => p.stone).filter(Boolean))];
        return stones as string[];
    } catch (error) {
        console.error('Error fetching stone types:', error);
        return [];
    }
};

export const insertProduct = async (product: Partial<Product>) => {
    const db = getDatabases();
    if (!db) return null;
    try {
        const response = await db.createDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            'unique()',
            product
        );
        return response;
    } catch (error) {
        console.error('Error inserting product:', error);
        throw error;
    }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
    const db = getDatabases();
    if (!db) return null;
    try {
        const response = await db.updateDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            id,
            updates
        );
        return response;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    const db = getDatabases();
    if (!db) return false;
    try {
        await db.deleteDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.productsCollectionId,
            id
        );
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};