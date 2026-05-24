"use client";
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ProductCard } from '@/components/Product/ProductCard';
import { STONES } from '@/constants';
import { StoneType } from '@/types';
import { ChevronRight, ArrowLeft, Sparkles, Gem, Layers, Check, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

interface CollectionDetailPageProps {
    onProductClick: (product: any) => void;
}

import { useRouter } from 'next/navigation';
const CollectionDetailPage : React.FC = () => {
    const router = useRouter();
    const onProductClick = (product: any) => router.push(`/product/${product.handle}`);
    const { collectionSlug } = useParams<{ collectionSlug: string }>();
    // Removed: const [showSubDivisions, setShowSubDivisions] = useState(false);

    // Featured stones list - centralized for filtering
    const FEATURED_STONES = [
        StoneType.CITRINE,
        StoneType.AMETHYST,
        StoneType.GARNET,
        StoneType.TOPAZ,
        StoneType.TOURMALINE,
        StoneType.LAPIS,
        StoneType.CZ,
        StoneType.BLUE_TOPAZ,
        StoneType.LEMON_TOPAZ,
        StoneType.SKY_BLUE_TOPAZ
    ];

    // Find matching stone type from slug
    const stoneType = useMemo(() => {
        if (!collectionSlug) return null;
        if (collectionSlug === 'other-stones') return 'Other Stones'; // Special handle for aggregated collection

        const normalizedSlug = collectionSlug.toLowerCase().replace(/-/g, ' ');
        const match = Object.values(StoneType).find(
            st => st.toLowerCase() === normalizedSlug
        );
        return match || null;
    }, [collectionSlug]);

    // Get stone info (benefits, description, RELATED STONES)
    const stoneInfo = useMemo(() => {
        if (!stoneType || stoneType === 'Other Stones') return null;
        return STONES.find(s => s.stone === stoneType);
    }, [stoneType]);

    // Determine which stones to query
    const activeStones = useMemo(() => {
        if (!stoneType) return [];

        // If "Other Stones", return all stones NOT in featured list
        if (stoneType === 'Other Stones') {
            return Object.values(StoneType).filter(s => !FEATURED_STONES.includes(s));
        }

        if (stoneInfo?.relatedStones) {
            return stoneInfo.relatedStones;
        }
        return [stoneType];
    }, [stoneType, stoneInfo]);

    // Fetch products using our robust hook
    // Note: useProducts takes 'stone' (singular) for strict filtering
    // but we might need a custom filter here since we want OR logic (Amethyst OR Rose Amethyst)
    // The useProducts hook currently filters by a single stone. 
    // Optimization: We'll fetch ALL products and filter locally for this advanced "multi-stone" view
    // Or, we update useProducts. For now, let's fetch all and filter, which remains fast given client-side limits.
    const { products: allProducts, isLoading } = useProducts();

    // Removed: Auto-enable sub-divisions if main category is empty but related stones have items (e.g. Topaz -> Blue Topaz)
    // Removed: const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
    // Removed: useEffect(() => { ... }, [isLoading, allProducts, stoneType, stoneInfo, hasAutoExpanded]);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => activeStones.includes(p.stone));
    }, [allProducts, activeStones]);

    // Dynamic Page Title - Always use the main Stone Type name
    const pageTitle = stoneType;

    // Get gradient for stone
    const getStoneGradient = (stone: StoneType): string => {
        const gradients: Record<string, string> = {
            [StoneType.AMETHYST]: 'from-violet-600 via-purple-700 to-purple-900',
            [StoneType.CITRINE]: 'from-amber-400 via-orange-500 to-orange-700',
            [StoneType.GARNET]: 'from-rose-600 via-red-700 to-red-900',
            [StoneType.IOLITE]: 'from-indigo-500 via-indigo-700 to-indigo-900',
            [StoneType.LAPIS]: 'from-blue-600 via-blue-800 to-blue-950',
            [StoneType.EMERALD]: 'from-emerald-400 via-emerald-600 to-emerald-800',
            [StoneType.TOURMALINE]: 'from-teal-400 via-teal-600 to-teal-800',
            [StoneType.TOPAZ]: 'from-sky-400 via-sky-600 to-sky-800',
            [StoneType.CZ]: 'from-slate-300 via-slate-400 to-slate-600',
            [StoneType.ROSE_QUARTZ]: 'from-pink-300 via-pink-400 to-pink-600',
            [StoneType.OTHER]: 'from-cyan-300 via-purple-400 to-pink-400',
            [StoneType.LABRADORITE]: 'from-slate-500 via-blue-600 to-slate-800',
            [StoneType.BLUE_TOPAZ]: 'from-cyan-400 via-blue-500 to-blue-700',
            [StoneType.LEMON_TOPAZ]: 'from-yellow-300 via-yellow-400 to-amber-500',
            [StoneType.SKY_BLUE_TOPAZ]: 'from-sky-300 via-sky-400 to-sky-600',
            [StoneType.PERIDOT]: 'from-lime-400 via-green-500 to-green-700',
            [StoneType.BLUE_SAPPHIRE]: 'from-blue-500 via-blue-700 to-blue-900',
            [StoneType.ROSE_AMETHYST]: 'from-pink-400 via-rose-500 to-purple-600',
        };
        return (stone && gradients[stone]) || 'from-gray-400 via-gray-500 to-gray-700';
    };

    if (!stoneType) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-center px-6 animate-in fade-in duration-500">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Gem className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-4xl font-serif mb-4 text-silvoraa-black">Collection Not Found</h1>
                    <p className="text-silvoraa-warmGray mb-8 max-w-md">This collection doesn't exist or has been moved to a new location.</p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-black text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        View All Collections
                    </Link>
                </div>
            </div>
        );
    }

    // Removed: const hasRelatedStones = stoneInfo?.relatedStones && stoneInfo.relatedStones.length > 1;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            
            {/* Dynamic Gradient Hero Based on Stone */}
            <div className={`relative bg-gradient-to-br ${getStoneGradient(stoneType as StoneType)} text-white overflow-hidden transition-colors duration-1000`}>
                {/* Animated Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiLz48L2c+PC9nPjwvc3ZnPg==')]" />

                <div className="relative container mx-auto px-6 pt-12 pb-10">
                    {/* Back Link - Absolute or inline? Inline is safer for flow, but let's keep it clean above */}
                    <Link
                        href="/collections"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors animate-in fade-in slide-in-from-left-4 duration-500"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">All Collections</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
                        {/* LEFT COLUMN: Context & Title */}
                        <div className="max-w-3xl flex-1">
                            {/* Removed: Benefit Badge */}

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 leading-tight">
                                {pageTitle} Collection
                            </h1>

                            {stoneInfo && (
                                <p className="text-white/85 text-sm leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                                    {stoneInfo.description}
                                </p>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Actions & Stats (Utilizing space) */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 lg:gap-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">

                            {/* Removed: Benefit Badge - Moved to Right Column */}

                            {/* Removed: SUB-CATEGORY TOGGLE */}

                            {/* Stats */}
                            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm">
                                <Gem className="w-5 h-5 text-white/80" />
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-serif leading-none">{filteredProducts.length}</span>
                                    <span className="text-xs text-white/60 uppercase tracking-wider font-bold leading-none">Pieces Found</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Smooth Curve Divider */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                    <svg
                        viewBox="0 0 1440 48"
                        fill="none"
                        className="w-full h-10 md:h-12 block"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 48H1440V0C1100 10 500 48 0 30Z"
                            fill="#FFFFFF"
                        />
                    </svg>
                </div>
            </div> {/* End of Hero */}

            <div className="container mx-auto px-6 pt-8 pb-16">
                {/* Breadcrumb */}
                <div className="flex items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-10 animate-in fade-in duration-500">
                    <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <Link href="/collections" className="hover:text-silvoraa-gold transition-colors">Collections</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <span className="text-silvoraa-black font-bold">{stoneType}</span>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="min-h-[40vh] flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-silvoraa-gold animate-spin" />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}
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
                            We couldn't find any {pageTitle} pieces at the moment. Please check back soon or enable sub-divisions to see more.
                        </p>
                    </div>
                )}

                {/* Related Collections */}
                <div className="mt-24 pt-16 border-t border-gray-200">
                    <h3 className="text-2xl font-serif text-silvoraa-black mb-8">You May Also Adore</h3>
                    <div className="flex flex-wrap gap-3">
                        {Object.values(StoneType)
                            .filter((st) => !activeStones.includes(st))
                            .slice(0, 6)
                            .map((st) => (
                                <Link
                                    key={st}
                                    href={`/collections/${st.toLowerCase().replace(/ /g, '-')}`}
                                    className="px-5 py-2.5 border-2 border-gray-200 rounded-full text-sm font-medium text-silvoraa-warmGray hover:border-silvoraa-gold hover:text-silvoraa-gold transition-all duration-200"
                                >
                                    {st}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CollectionDetailPage;
