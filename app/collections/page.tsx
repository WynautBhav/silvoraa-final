import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

import { PRODUCTS, STONES } from '@/constants';
import { StoneType } from '@/types';
import { ChevronRight, ArrowRight, Gem, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gemstone Collections',
  description: 'Explore our curated gemstone collections with Amethyst for calm, Citrine for abundance, Blue Topaz for clarity. Handcrafted 925 sterling silver jewelry for every intention.',
  alternates: { canonical: 'https://www.silvoraa.com/collections' },
  openGraph: {
    title: 'Gemstone Collections | Silvoraa',
    description: 'Explore our curated gemstone collections.',
    url: 'https://www.silvoraa.com/collections',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Gemstone Collections | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemstone Collections | Silvoraa',
    description: 'Explore our curated gemstone collections.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const CollectionsPage : React.FC = () => {
    // Group products by stone type and get counts
    const stoneGroups: Record<string, { count: number; stone: typeof STONES[0] | undefined }> = {};

    PRODUCTS.forEach(product => {
        let effectiveStone = product.stone;

        // Club all Topaz variations under generic Topaz
        if ([StoneType.BLUE_TOPAZ, StoneType.SKY_BLUE_TOPAZ, StoneType.LEMON_TOPAZ].includes(product.stone as StoneType)) {
            effectiveStone = StoneType.TOPAZ;
        }

        if (!stoneGroups[effectiveStone]) {
            stoneGroups[effectiveStone] = {
                count: 0,
                stone: STONES.find(s => s.stone === effectiveStone)
            };
        }
        stoneGroups[effectiveStone].count++;
    });

    const collections = Object.entries(stoneGroups)
        .map(([stoneType, data]) => ({
            stoneType: stoneType as StoneType,
            count: data.count,
            stone: data.stone,
            slug: stoneType.toLowerCase().replace(/ /g, '-')
        }))
        .sort((a, b) => b.count - a.count);

    // Premium gradient mapping for stones
    const getStoneGradient = (stoneType: StoneType): string => {
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
        return gradients[stoneType] || 'from-gray-400 via-gray-500 to-gray-700';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            

            {/* Premium Hero Banner */}
            <div className="relative bg-silvoraa-black text-white overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full">
                        {/* Grid of colored orbs representing different stones */}
                        <div className="absolute top-10 left-[10%] w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                        <div className="absolute top-20 right-[20%] w-40 h-40 bg-amber-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                        <div className="absolute bottom-20 left-[30%] w-36 h-36 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
                        <div className="absolute bottom-10 right-[10%] w-28 h-28 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.3s' }} />
                    </div>
                </div>

                <div className="relative container mx-auto px-6 pt-24 pb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 animate-in fade-in zoom-in duration-700">
                            <Gem className="w-4 h-4 text-silvoraa-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest text-silvoraa-gold">Curated By Stone</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            Collections
                        </h1>

                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Explore our jewelry organized by gemstone. Each stone carries
                            unique properties and a story waiting to be discovered.
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

            <div className="container mx-auto px-6 py-16">
                {/* Breadcrumb */}
                <div className="flex items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-12 animate-in fade-in duration-500">
                    <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <span className="text-silvoraa-black font-bold">Collections</span>
                </div>

                {/* Collections Grid - Premium Cards */}
                {/* Section 1: Featured Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
                    {(() => {
                        const FEATURED_ORDER = [
                            StoneType.CITRINE,
                            StoneType.AMETHYST,
                            StoneType.GARNET,
                            StoneType.TOPAZ,
                            StoneType.TOURMALINE,
                            StoneType.LAPIS,
                            StoneType.CZ
                        ];

                        const featuredCollections = FEATURED_ORDER
                            .map(stone => collections.find(c => c.stoneType === stone))
                            .filter((c): c is typeof collections[0] => !!c);

                        // Calculate Other Stones
                        const otherCollectionsList = collections.filter(c => !FEATURED_ORDER.includes(c.stoneType));
                        const otherCount = otherCollectionsList.reduce((sum, c) => sum + c.count, 0);

                        const displayList = [...featuredCollections];

                        if (otherCount > 0) {
                            displayList.push({
                                stoneType: 'Other Stones' as any,
                                count: otherCount,
                                slug: 'other-stones',
                                stone: {
                                    id: 'other',
                                    benefit: 'Discover More',
                                    description: 'Unique gems including Labradorite, Iolite, Emerald, and more.',
                                    stone: 'Other Stones' as any,
                                    imageUrl: '',
                                    filterParam: 'other',
imageOverlayDescription: 'Unique gems'
                                }
                            });
                        }

                        return (
                            <>
                                {displayList.map(({ stoneType, count, stone, slug }, index) => (
                                    <Link
                                        key={stoneType}
                                        href={`/collections/${slug}`}
                                        className="group relative overflow-hidden rounded-2xl aspect-[4/5] animate-in fade-in slide-in-from-bottom-4 duration-500"
                                        style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}
                                    >
                                        {/* Background Image for Featured Stones, Gradient for Others */}
                                        {(stoneType as string) !== 'Other Stones' && stone?.imageUrl ? (
                                            <>
                                                <img
                                                    src={stone.imageUrl}
                                                    alt={`${stoneType} texture`}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                                            </>
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${(stoneType as string) === 'Other Stones' ? 'from-slate-700 via-gray-800 to-black' : getStoneGradient(stoneType)}`} />
                                        )}

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>
                                        <div className="absolute inset-0 opacity-30">
                                            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                                        </div>
                                        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Im0wIDBoNDB2NDBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
                                        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                                            <div className="flex justify-between items-start">
                                                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                                                    <span className="text-xs font-bold uppercase tracking-widest">
                                                        {count} {count === 1 ? 'piece' : 'pieces'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-serif mb-3 group-hover:translate-x-2 transition-transform duration-300">
                                                    {stoneType}
                                                </h3>
                                                {stone && (
                                                    <div className="mb-4">
                                                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                                            {stone.benefit}
                                                        </span>
                                                        <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                                                            {stone.description}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    Explore Collection
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/40 transition-all duration-300 pointer-events-none" />
                                    </Link>
                                ))}
                            </>
                        );
                    })()}
                </div>



                {/* Bottom CTA */}
                <div className="text-center mt-20">

                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-silvoraa-black text-white uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-all duration-300 rounded-full shadow-xl"
                    >
                        Browse All Products
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
