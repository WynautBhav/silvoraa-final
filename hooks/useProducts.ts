'use client';
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/appwrite';
import type { Product } from '../types';
import { PRODUCTS } from '../constants';
import { enrichProduct, getStylistNote } from '../utils/productDataGenerator';

interface UseProductsOptions {
    type?: string;
    stone?: string;
    limit?: number;
    search?: string;
}

interface UseProductsReturn {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

// Cache for products to avoid refetching
let productsCache: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const FETCH_TIMEOUT = 5000; // 5 second timeout for Supabase queries

// Helper to create a timeout promise
const withTimeout = <T>(promiseLike: PromiseLike<T>, ms: number): Promise<T> => {
    const promise = Promise.resolve(promiseLike);
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), ms)
        )
    ]);
};

// Helper function for filtering products
const filterProducts = (products: Product[], options: UseProductsOptions): Product[] => {
    let filtered = [...products];
    if (options.type) {
        filtered = filtered.filter(p => p.type === options.type);
    }
    if (options.stone) {
        filtered = filtered.filter(p => p.stone === options.stone);
    }
    if (options.search) {
        const q = options.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.stone.toLowerCase().includes(q) ||
            p.type.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
        );
    }
    if (options.limit) {
        filtered = filtered.slice(0, options.limit);
    }
    
    return filtered;
};

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            // Optimistic Loading: Show local products IMMEDIATELY
            // This makes the UI feel instant (0ms latency)
            const localFallback = filterProducts(PRODUCTS.map(enrichProduct), options);
            if (isMounted) {
                setProducts(localFallback);
                setIsLoading(false); // UI is ready
            }

            // If Supabase is not configured, we're done
            if (!isSupabaseConfigured) {
                return;
            }

            // Check cache logic (still valid for background refresh)
            const now = Date.now();
            if (productsCache && (now - cacheTimestamp) < CACHE_DURATION && !options.type && !options.stone && !options.search && !options.limit) {
                if (isMounted) {
                    setProducts(filterProducts(productsCache, options));
                }
                return;
            }

            try {
                let query: any = supabase.from('products').select('*');

                if (options.type) {
                    query = query.eq('type', options.type);
                }
                if (options.stone) {
                    query = query.eq('stone', options.stone);
                }
            if (options.search) {
              const sanitized = options.search.replace(/[%_]/g, '').replace(/[{}()]/g, '');
              const searchT = `%${sanitized}%`;
              query = query.or(`title.ilike.${searchT},stone.ilike.${searchT},type.ilike.${searchT}`);
            }
                if (options.limit) {
                    query = query.limit(options.limit);
                }

                // Background fetch with timeout (reduced to 3s)
                const { data, error: fetchError } = await withTimeout<any>(
                    query.order('created_at', { ascending: false }),
                    3000 // 3s timeout for background update
                );

                if (!isMounted) return;

                if (fetchError) {
                    throw fetchError;
                }

                if (data && data.length > 0) {
                    const mappedProducts: Product[] = data.map((p: any) => {
                        const baseProduct = {
                            id: p.id,
                            title: p.title,
                            handle: p.handle,
                            price: p.price,
                            description: p.description || '',
                            image: p.image ? p.image.replace(/\.[^.]+$/, '.webp') : '',
                            images: (p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : []).map((img: string) => img.replace(/\.[^.]+$/, '.webp')),
                            type: p.type as Product['type'],
                            stone: p.stone as Product['stone'],
                            variants: (p.variants as unknown as Product['variants']) || [],
                            tags: p.tags || [],
                            benefits: p.benefits || [],
                            seoTitle: p.seo_title || p.title,
                            seoDescription: p.seo_description || p.description || '',
                            related_product_ids: p.related_product_ids || [],
                            stylist_note: p.stylist_note || getStylistNote(p.stone),
                        };
                        return enrichProduct(baseProduct as Product);
                    }).map((p: any) => {
                        // Use server price if > 0, otherwise sync with constants.ts
                        const staticP = PRODUCTS.find(sp => sp.handle === p.handle);
                        if (staticP && (!p.price || p.price === 0)) {
                            return { ...p, price: staticP.price };
                        }
                        return p;
                    });

                    // Update cache
                    if (!options.type && !options.stone && !options.search && !options.limit) {
                        productsCache = mappedProducts;
                        cacheTimestamp = now;
                    }

                    // Update state with fresh server data
                    setProducts(mappedProducts);
                }
            } catch (err: any) {
                console.warn('[useProducts] Background fetch failed (using local data):', err.message);
                // No action needed: UI is already showing local data
            }
        };

        setIsLoading(true);
        setError(null);
        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, [options.type, options.stone, options.search, options.limit, fetchTrigger]);

    const refetch = () => setFetchTrigger(prev => prev + 1);

    return { products, isLoading, error, refetch };
};

// Hook for single product by handle
export const useProduct = (handle: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            if (!handle) {
                setIsLoading(false);
                return;
            }

            // Optimistic Loading: Show local product IMMEDIATELY
            const staticProduct = PRODUCTS.find(p => p.handle === handle);
            if (isMounted) {
                const enrichedProduct = staticProduct ? enrichProduct(staticProduct) : null;
                setProduct(enrichedProduct);
                // If we found it locally, we're ready!
                // If not, we might still find it on server, so keep loading true only if static missing?
                // Better UX: Show static, but keep "updating" in background.
                // Actually, if we miss locally, we MUST wait for server.
                if (staticProduct) {
                    setIsLoading(false);
                    setError(null);
                }
            }

            // If Supabase is not configured, we're done
            if (!isSupabaseConfigured) {
                if (!staticProduct && isMounted) {
                    setError('Product not found');
                    setIsLoading(false);
                }
                return;
            }

            try {
                // Background fetch
                const { data, error: fetchError } = await withTimeout<any>(
                    supabase
                        .from('products')
                        .select('*')
                        .eq('handle', handle)
                        .single(),
                    3000 // 3s timeout
                );

                if (!isMounted) return;

                if (fetchError) {
                    throw fetchError;
                }

                if (data) {
                    // Use server price if > 0, otherwise sync with constants.ts
                    const staticP = PRODUCTS.find(sp => sp.handle === data.handle);
                    const finalPrice = (staticP && (!data.price || data.price === 0)) ? staticP.price : data.price;
                    const baseProduct = {
                        id: data.id,
                        title: data.title,
                        handle: data.handle,
                        price: finalPrice,
                        description: data.description || '',
                        image: data.image ? data.image.replace(/\.[^.]+$/, '.webp') : '',
                        images: (data.images && data.images.length > 0 ? data.images : data.image ? [data.image] : []).map((img: string) => img.replace(/\.[^.]+$/, '.webp')),
                        type: data.type as Product['type'],
                        stone: data.stone as Product['stone'],
                        variants: (data.variants as unknown as Product['variants']) || [],
                        tags: data.tags || [],
                        benefits: data.benefits || [],
                        seoTitle: data.seo_title || data.title,
                        seoDescription: data.seo_description || data.description || '',
                        related_product_ids: data.related_product_ids || [],
                        stylist_note: data.stylist_note || getStylistNote(data.stone),
                    };
                    setProduct(enrichProduct(baseProduct as Product));
                    if (isMounted) setIsLoading(false);
                }
            } catch (err: any) {
                console.warn('[useProduct] Background fetch failed:', err.message);
                if (isMounted) {
                    // If we didn't have static product, NOW we show error
                    if (!product && !staticProduct) {
                        setError(err.message || 'Product not found');
                    }
                    setIsLoading(false);
                }
            }
        };

        setIsLoading(true);
        setError(null);
        fetchProduct();

        return () => {
            isMounted = false;
        };
    }, [handle]);

    return { product, isLoading, error };
};

// Clear cache utility
export const clearProductsCache = () => {
    productsCache = null;
    cacheTimestamp = 0;
};
