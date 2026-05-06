"use client";
import React, { useMemo } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/Product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductType } from '@/types';
import { ChevronRight, ArrowLeft, Sparkles, Gem, Loader2 } from 'lucide-react';



import { useRouter } from 'next/navigation';

const CategoryDetailPage : React.FC = () => {
    const router = useRouter();
    const onProductClick = (product: Product) => router.push(`/product/${product.handle}`);
    const { categorySlug } = useParams<{ categorySlug: string }>();

    // Mapping slugs to ProductType
    const categoryType = useMemo(() => {
        if (!categorySlug) return null;
        const normalizedSlug = categorySlug.toLowerCase().replace(/-/g, ' ');
        const match = Object.values(ProductType).find(
            ct => ct.toLowerCase() === normalizedSlug ||
                (ct === ProductType.EARRINGS && normalizedSlug === 'earrings')
        );
        return match || null;
    }, [categorySlug]);

    const { products: allProducts, isLoading } = useProducts({
        type: categoryType || undefined
    });

    const filteredProducts = useMemo(() => {
        if (!categoryType) return [];
        return allProducts; // The hook already filters if we pass the type
    }, [allProducts, categoryType]);

    // Format display title (e.g., 'Necklace' -> 'Necklaces')
    const displayTitle = useMemo(() => {
        if (!categoryType) return '';
        if (categoryType.endsWith('s')) return categoryType;
        if (categoryType === ProductType.NOSE_RING) return 'Nose Rings';
        return `${categoryType}s`;
    }, [categoryType]);

    if (!categoryType && !isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-center px-6 animate-in fade-in duration-500">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Gem className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-4xl font-serif mb-4 text-silvoraa-black">Category Not Found</h1>
                    <p className="text-silvoraa-warmGray mb-8 max-w-md">This category doesn't exist or has been moved to a new location.</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-black text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        View All Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
        
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Premium Hero Banner */}
            <div className="relative bg-silvoraa-black text-white overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-silvoraa-gold/20 via-transparent to-transparent rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl opacity-30" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
                </div>

                <div className="relative container mx-auto px-6 pt-12 pb-8">
                    <div className="max-w-4xl">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors animate-in fade-in slide-in-from-left-4 duration-500"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Shop All</span>
                        </Link>


                        <h1 className="text-2xl md:text-3xl font-serif mb-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            {displayTitle}
                        </h1>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Explore our curated selection of {displayTitle.toLowerCase()}.
                            Each piece is crafted with meaning and intention to elevate your daily ritual.
                        </p>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto block">
                        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="#FFFFFF" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-6 py-6">
                {/* Breadcrumb */}
                <div className="flex items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-10 animate-in fade-in duration-500">
                    <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <Link href="/shop" className="hover:text-silvoraa-gold transition-colors">Shop</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <span className="text-silvoraa-black font-bold">{displayTitle}</span>
                </div>

                {/* Toolbar - Stats */}
                {!isLoading && (
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-silvoraa-warmGray text-sm font-medium">
                            <span className="text-silvoraa-black font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'piece' : 'pieces'} found in this category
                        </span>
                    </div>
                )}

                {/* Product Grid */}
                {isLoading ? (
                    <div className="min-h-[40vh] flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-silvoraa-gold animate-spin" />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
                            >
                                <ProductCard
                                    product={product}
                                    onClick={() => onProductClick(product)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center animate-in fade-in duration-500">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <Sparkles className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-serif text-silvoraa-black mb-3">No Treasures Found</h3>
                        <p className="text-silvoraa-warmGray max-w-md mx-auto">
                            We couldn't find any {displayTitle.toLowerCase()} pieces at the moment. Please check back soon or explore other categories.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block mt-8 px-8 py-3 bg-silvoraa-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-silvoraa-gold transition-colors"
                        >
                            View All Products
                        </Link>
                    </div>
                )}

                {/* Related Categories */}
                <div className="mt-24 pt-16 border-t border-gray-200">
                    <h3 className="text-2xl font-serif text-silvoraa-black mb-8">Explore Other Categories</h3>
                    <div className="flex flex-wrap gap-3">
                        {Object.values(ProductType)
                            .filter((type) => type !== categoryType)
                            .map((type) => (
                                <Link
                                    key={type}
                                    href={`/shop/${type.toLowerCase().replace(/ /g, '-')}`}
                                    className="px-5 py-2.5 border-2 border-gray-200 rounded-full text-sm font-medium text-silvoraa-warmGray hover:border-silvoraa-gold hover:text-silvoraa-gold transition-all duration-200"
                                >
                                    {type}s
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryDetailPage;
