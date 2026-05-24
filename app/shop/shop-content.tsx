"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { ProductCard } from '@/components/Product/ProductCard';
import { STONES } from '@/constants';
import { Product, ProductType, StoneType } from '@/types';
import { useProducts } from '@/hooks/useProducts';
import { ChevronRight, X, SlidersHorizontal, ChevronDown, Sparkles, Filter, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ShopContent = () => {
    const router = useRouter();
    const onProductClick = (product: Product) => router.push(`/product/${product.handle}`);
    const searchParams = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (isFilterOpen && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFilterOpen]);
    const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');
    const [gridCols, setGridCols] = useState<3 | 4 | 5>(4);

    const searchQuery = searchParams.get('q') || searchParams.get('search') || '';

    const { products, isLoading, error } = useProducts({
        search: searchQuery
    });

    const activeStoneFilters: StoneType[] = useMemo(() => {
        const param = searchParams.get('stone');
        if (!param) return [];
        return param.split(',').filter(s => s) as StoneType[];
    }, [searchParams]);

    const activeTypeFilters: ProductType[] = useMemo(() => {
        const param = searchParams.get('type');
        if (!param) return [];
        return param.split(',').filter(t => t) as ProductType[];
    }, [searchParams]);

    const stoneBenefitMap = useMemo(() => {
        const map: Record<string, string> = {};
        STONES.forEach(stone => {
            map[stone.stone] = stone.benefit;
        });
        return map;
    }, []);

    const stoneTypes = useMemo(() => {
        if (!products.length) return [];
        const types = new Set(products.map(p => {
            if (p.stone === StoneType.OTHER || (p.stone as string) === 'Other') return StoneType.OPAL;
            return p.stone;
        }));
        types.delete(StoneType.OTHER as any);
        types.delete('Other' as any);
        return Array.from(types).sort();
    }, [products]);

    const productTypes = useMemo(() => {
        if (!products.length) return [];
        const types = new Set(products.map(p => p.type));
        return Array.from(types).sort();
    }, [products]);

    const stoneAvailability = useMemo(() => {
        const map: Record<string, Set<ProductType>> = {};
        products.forEach(p => {
            if (!map[p.stone]) map[p.stone] = new Set();
            map[p.stone].add(p.type);
        });
        return map;
    }, [products]);

    const typeAvailability = useMemo(() => {
        const map: Record<string, Set<StoneType>> = {};
        products.forEach(p => {
            if (!map[p.type]) map[p.type] = new Set();
            map[p.type].add(p.stone);
        });
        return map;
    }, [products]);

    const selectedBenefits = useMemo(() => {
        const benefits = new Set<string>();
        activeStoneFilters.forEach(stone => {
            const benefit = stoneBenefitMap[stone];
            if (benefit) benefits.add(benefit);
        });
        return Array.from(benefits);
    }, [activeStoneFilters, stoneBenefitMap]);

    const displayedProducts = useMemo(() => {
        let filtered = [...products];

        if (activeStoneFilters.length > 0) {
            filtered = filtered.filter(p => {
                const stoneMatch = activeStoneFilters.includes(p.stone);
                const tagsMatch = p.tags?.some(t =>
                    activeStoneFilters.some(fs => fs.toLowerCase() === t.toLowerCase())
                );
                return stoneMatch || tagsMatch;
            });
        }
        if (activeTypeFilters.length > 0) {
            filtered = filtered.filter(p => activeTypeFilters.includes(p.type));
        }

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return filtered;
    }, [products, activeStoneFilters, activeTypeFilters, sortBy]);

    const toggleFilter = (key: 'stone' | 'type', value: string) => {
        const newParams = new URLSearchParams(searchParams);
        const current = newParams.get(key);
        const currentValues = current ? current.split(',').filter(v => v) : [];

        if (currentValues.includes(value)) {
            const updated = currentValues.filter(v => v !== value);
            if (updated.length === 0) {
                newParams.delete(key);
            } else {
                newParams.set(key, updated.join(','));
            }
        } else {
            currentValues.push(value);
            newParams.set(key, currentValues.join(','));
        }

        router.push('?' + newParams.toString(), { scroll: false });
    };

    const clearAllFilters = () => {
        router.push(window.location.pathname, { scroll: false });
    };

    const hasActiveFilters = activeStoneFilters.length > 0 || activeTypeFilters.length > 0;
    const totalActiveFilters = activeStoneFilters.length + activeTypeFilters.length;

    const isStoneAvailable = (stone: StoneType) => {
        if (activeTypeFilters.length === 0) return true;
        const stoneTypes = stoneAvailability[stone];
        if (!stoneTypes) return false;
        return activeTypeFilters.some(type => stoneTypes.has(type));
    };

    const isCategoryAvailable = (type: ProductType) => {
        if (activeStoneFilters.length === 0) return true;
        const categoryStones = typeAvailability[type];
        if (!categoryStones) return false;
        return activeStoneFilters.some(stone => categoryStones.has(stone));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-silvoraa-gold animate-spin mx-auto mb-4" />
                    <p className="text-silvoraa-warmGray text-sm tracking-widest uppercase">Loading collection...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md px-6">
                    <p className="text-red-500 mb-2">Unable to load products</p>
                    <p className="text-gray-500 text-sm mb-4">{error || 'Please try again later'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-silvoraa-black text-white rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            <div className="relative bg-silvoraa-black text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-silvoraa-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                </div>

                <div className="relative container mx-auto px-4 md:px-6 lg:px-8 pt-10 pb-6">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-3 md:mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 tracking-tight">
                            {searchQuery ? `Search Results` : 'Shop All'}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 font-light">
                            {searchQuery
                                ? `Found ${displayedProducts.length} results for "${searchQuery}"`
                                : "Discover our complete collection of gemstone jewelry. Each piece tells a story of elegance and intention."
                            }
                        </p>
                    </div>
                </div>

                <div className="absolute -bottom-1 left-0 right-0 overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto block">
                        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="#FFFFFF" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-6 py-4 md:py-6">
                <div className="flex items-center flex-wrap text-xs text-silvoraa-warmGray uppercase tracking-widest mb-8 animate-in fade-in duration-500">
                    <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <Link href="/shop" className={`hover:text-silvoraa-gold transition-colors ${!searchQuery && activeStoneFilters.length === 0 && activeTypeFilters.length === 0 ? 'text-silvoraa-black font-bold' : ''}`}>Shop</Link>

                    {searchQuery && (
                        <>
                            <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                            <span className="text-silvoraa-black font-bold">Search: &quot;{searchQuery}&quot;</span>
                        </>
                    )}

                    {activeStoneFilters.length > 0 && (
                        <>
                            <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                            <span className="text-silvoraa-gold font-bold">{activeStoneFilters.join(', ')}</span>
                        </>
                    )}
                    {activeTypeFilters.length > 0 && (
                        <>
                            <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                            <span className="text-silvoraa-gold font-bold">{activeTypeFilters.join(', ')}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-8 pb-4 md:pb-8 border-b border-gray-200 sticky top-20 z-30 bg-white/80 backdrop-blur-xl px-4 py-3 md:px-0 md:bg-transparent md:static rounded-xl md:rounded-none">
                    <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-4">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 border transition-all duration-300 rounded-full shadow-sm hover:shadow-md ${isFilterOpen || hasActiveFilters
                                ? 'border-silvoraa-gold bg-silvoraa-gold text-white shadow-silvoraa-gold/20'
                                : 'border-gray-200 bg-white text-silvoraa-black hover:border-silvoraa-gold hover:text-silvoraa-gold'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-wider">Filters</span>
                            {hasActiveFilters && (
                                <span className={`w-5 h-5 text-[10px] flex items-center justify-center rounded-full ${isFilterOpen || hasActiveFilters ? 'bg-white text-silvoraa-gold' : 'bg-silvoraa-gold text-white'}`}>
                                    {totalActiveFilters}
                                </span>
                            )}
                        </button>

                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="appearance-none px-4 py-2 pr-10 md:px-6 md:pr-12 border border-gray-200 text-sm font-medium uppercase tracking-wider bg-white focus:outline-none focus:border-silvoraa-gold transition-all cursor-pointer rounded-full hover:border-gray-300 hover:shadow-md"
                            >
                                <option value="default">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                            <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-silvoraa-gold transition-colors" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-sm font-medium text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors flex items-center gap-1 group"
                            >
                                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                Clear all
                            </button>
                        )}

                        <div className="hidden md:block h-6 w-px bg-gray-200" />

                        <span className="hidden md:block text-silvoraa-warmGray text-sm font-medium">
                            <span className="text-silvoraa-black font-bold">{displayedProducts.length}</span> {displayedProducts.length === 1 ? 'piece' : 'pieces'}
                        </span>

                        <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md border border-gray-100 rounded-full p-1 shadow-sm">
                            <button
                                onClick={() => setGridCols(3)}
                                className={`p-2 rounded-full transition-all duration-300 ${gridCols === 3
                                    ? 'bg-silvoraa-black text-white shadow-md scale-100 ring-1 ring-black/5'
                                    : 'text-gray-400 hover:text-silvoraa-black hover:bg-white/50'}`}
                                title="3 Columns"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 4C5 3.44772 5.44772 3 6 3C6.55228 3 7 3.44772 7 4V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V4Z" fill="currentColor" fillOpacity={gridCols === 3 ? "1" : "0.5"} />
                                    <path d="M11 4C11 3.44772 11.4477 3 12 3C12.55228 3 13 3.44772 13 4V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V4Z" fill="currentColor" fillOpacity={gridCols === 3 ? "1" : "0.5"} />
                                    <path d="M17 4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V4Z" fill="currentColor" fillOpacity={gridCols === 3 ? "1" : "0.5"} />
                                </svg>
                            </button>
                            <button
                                onClick={() => setGridCols(4)}
                                className={`p-2 rounded-full transition-all duration-300 ${gridCols === 4
                                    ? 'bg-silvoraa-black text-white shadow-md scale-100 ring-1 ring-black/5'
                                    : 'text-gray-400 hover:text-silvoraa-black hover:bg-white/50'}`}
                                title="4 Columns"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4C3 3.44772 3.44772 3 4 3C4.55228 3 5 3.44772 5 4V20C5 20.5523 4.55228 21 4 21C3.44772 21 3 20.5523 3 20V4Z" fill="currentColor" fillOpacity={gridCols === 4 ? "1" : "0.5"} />
                                    <path d="M8 4C8 3.44772 8.44772 3 9 3C9.55228 3 10 3.44772 10 4V20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20V4Z" fill="currentColor" fillOpacity={gridCols === 4 ? "1" : "0.5"} />
                                    <path d="M13 4C13 3.44772 13.4477 3 14 3C14.55228 3 15 3.44772 15 4V20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20V4Z" fill="currentColor" fillOpacity={gridCols === 4 ? "1" : "0.5"} />
                                    <path d="M18 4C18 3.44772 18.4477 3 19 3C19.55228 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20V4Z" fill="currentColor" fillOpacity={gridCols === 4 ? "1" : "0.5"} />
                                </svg>
                            </button>
                            <button
                                onClick={() => setGridCols(5)}
                                className={`p-2 rounded-full transition-all duration-300 ${gridCols === 5
                                    ? 'bg-silvoraa-black text-white shadow-md scale-100 ring-1 ring-black/5'
                                    : 'text-gray-400 hover:text-silvoraa-black hover:bg-white/50'}`}
                                title="5 Columns"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4C2 3.44772 2.44772 3 3 3C3.55228 3 4 3.44772 4 4V20C4 20.5523 3.55228 21 3 21C2.44772 21 2 20.5523 2 20V4Z" fill="currentColor" fillOpacity={gridCols === 5 ? "1" : "0.5"} />
                                    <path d="M6.25 4C6.25 3.44772 6.69772 3 7.25 3C7.80228 3 8.25 3.44772 8.25 4V20C8.25 20.5523 7.80228 21 7.25 21C6.69772 21 6.25 20.5523 6.25 20V4Z" fill="currentColor" fillOpacity={gridCols === 5 ? "1" : "0.5"} />
                                    <path d="M10.5 4C10.5 3.44772 10.9477 3 11.5 3C12.05228 3 12.5 3.44772 12.5 4V20C12.5 20.5523 12.0523 21 11.5 21C10.9477 21 10.5 20.5523 10.5 20V4Z" fill="currentColor" fillOpacity={gridCols === 5 ? "1" : "0.5"} />
                                    <path d="M14.75 4C14.75 3.44772 15.1977 3 15.75 3C16.30228 3 16.75 3.44772 16.75 4V20C16.75 20.5523 16.3023 21 15.75 21C15.1977 21 14.75 20.5523 14.75 20V4Z" fill="currentColor" fillOpacity={gridCols === 5 ? "1" : "0.5"} />
                                    <path d="M19 4C19 3.44772 19.4477 3 20 3C20.55228 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20V4Z" fill="currentColor" fillOpacity={gridCols === 5 ? "1" : "0.5"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`
                    fixed inset-0 z-[100] md:static md:z-auto transition-all duration-500 ease-out
                    ${isFilterOpen ? 'opacity-100 visible md:max-h-[800px] md:mb-8 md:overflow-hidden' : 'opacity-0 invisible md:max-h-0 md:opacity-0 md:visible md:overflow-hidden'}
                `}>
                    <div
                        className={`absolute inset-0 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-500 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setIsFilterOpen(false)}
                    />

                    <div className={`
                        absolute bottom-0 left-0 right-0 h-[85vh] flex flex-col
                        md:static md:h-auto md:block md:p-8 md:bg-white/50 md:backdrop-blur-xl md:rounded-2xl md:border md:border-white md:shadow-xl
                        bg-white rounded-t-3xl shadow-2xl
                        transform transition-transform duration-500 ease-out
                        ${isFilterOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
                    `}>
                        <div className="flex-none flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white rounded-t-3xl md:hidden">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-silvoraa-black">Filters</h3>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 -mr-2 bg-gray-50 rounded-full text-gray-500 hover:text-black transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-0 md:overflow-visible">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-silvoraa-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-silvoraa-gold" />
                                    Gemstone
                                    {activeStoneFilters.length > 0 && (
                                        <span className="text-silvoraa-gold">({activeStoneFilters.length})</span>
                                    )}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {stoneTypes.map(stone => {
                                        const isSelected = activeStoneFilters.includes(stone);
                                        const isAvailable = isStoneAvailable(stone);

                                        return (
                                            <button
                                                key={stone}
                                                onClick={() => toggleFilter('stone', stone)}
                                                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-300 flex items-center gap-2 ${isSelected
                                                    ? 'bg-silvoraa-gold text-white border-silvoraa-gold shadow-lg shadow-silvoraa-gold/30 scale-105'
                                                    : !isAvailable
                                                        ? 'border-gray-100 text-gray-300 line-through cursor-not-allowed opacity-50'
                                                        : 'bg-white border-gray-200 text-silvoraa-warmGray hover:border-silvoraa-gold hover:text-silvoraa-gold hover:shadow-md hover:-translate-y-0.5'
                                                    }`}
                                                title={!isAvailable ? `No ${stone} products in selected categories` : ''}
                                            >
                                                {isSelected && <Check className="w-3 h-3" />}
                                                {stone}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-silvoraa-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-silvoraa-gold" />
                                    Category
                                    {activeTypeFilters.length > 0 && (
                                        <span className="text-silvoraa-gold">({activeTypeFilters.length})</span>
                                    )}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {productTypes.map(type => {
                                        const isSelected = activeTypeFilters.includes(type);
                                        const isAvailable = isCategoryAvailable(type);
                                        return (
                                            <button
                                                key={type}
                                                onClick={() => toggleFilter('type', type)}
                                                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-300 flex items-center gap-2 ${isSelected
                                                    ? 'bg-silvoraa-black text-white border-silvoraa-black shadow-lg scale-105'
                                                    : !isAvailable
                                                        ? 'border-gray-100 text-gray-300 line-through cursor-not-allowed opacity-50'
                                                        : 'bg-white border-gray-200 text-silvoraa-warmGray hover:border-silvoraa-black hover:text-silvoraa-black hover:shadow-md hover:-translate-y-0.5'
                                                    }`}
                                                title={!isAvailable ? `No ${type} products with selected gemstones` : ''}
                                            >
                                                {isSelected && <Check className="w-3 h-3" />}
                                                {type}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {selectedBenefits.length > 0 && (
                            <div className="mt-8 p-6 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/80 rounded-2xl border border-white/50 shadow-inner">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-purple-700">
                                        Active Crystal Energy
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedBenefits.map(benefit => (
                                        <span
                                            key={benefit}
                                            className="px-4 py-2 bg-white/60 rounded-full text-sm font-medium text-purple-900 shadow-sm border border-white/50 backdrop-blur-sm"
                                        >
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-3 text-xs text-purple-600/70 italic">
                                    &quot;Stones speak to those who listen.&quot;
                                </p>
                            </div>
                        )}

                        {hasActiveFilters && (
                            <div className="mt-8 pt-6 border-t border-gray-100 hidden md:flex items-center justify-between">
                                <span className="text-sm text-silvoraa-warmGray font-medium">
                                    Found <span className="text-silvoraa-black font-bold">{displayedProducts.length}</span> matching pieces
                                </span>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm font-bold text-silvoraa-gold hover:text-silvoraa-black transition-colors flex items-center gap-2 group"
                                >
                                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                    Reset all filters
                                </button>
                            </div>
                        )}
                        </div>

                        <div className="flex-none p-4 bg-white border-t border-gray-100 md:hidden flex gap-3 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] pb-safe">
                            <button
                                onClick={clearAllFilters}
                                className="flex-1 py-3.5 text-xs font-bold uppercase tracking-widest border border-gray-200 rounded-full text-silvoraa-black hover:bg-gray-50 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="flex-[2] py-3.5 text-xs font-bold uppercase tracking-widest bg-silvoraa-black text-white rounded-full shadow-lg shadow-black/20 hover:bg-silvoraa-gold transition-colors"
                            >
                                Show {displayedProducts.length} items
                            </button>
                        </div>
                    </div>
                </div>

                {hasActiveFilters && !isFilterOpen && (
                    <div className="flex flex-wrap items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        {activeStoneFilters.map(stone => (
                            <div key={stone} className="flex items-center gap-2 bg-silvoraa-gold text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-silvoraa-gold/20">
                                {stone}
                                <button onClick={() => toggleFilter('stone', stone)} className="hover:opacity-70 transition-opacity">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                        {activeTypeFilters.map(type => (
                            <div key={type} className="flex items-center gap-2 bg-silvoraa-black text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                {type}
                                <button onClick={() => toggleFilter('type', type)} className="hover:opacity-70 transition-opacity">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}

                        {selectedBenefits.length > 0 && (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                <Sparkles className="w-3 h-3" />
                                {selectedBenefits.join(' • ')}
                            </div>
                        )}
                    </div>
                )}

                {displayedProducts.length > 0 ? (
                    <div className={`grid grid-cols-2 md:grid-cols-2 ${gridCols === 5 ? 'lg:grid-cols-5 gap-3 md:gap-4' :
                        gridCols === 4 ? 'lg:grid-cols-4 gap-3 md:gap-6' :
                            'lg:grid-cols-3 gap-3 md:gap-8'
                        } gap-y-8 md:gap-y-12`}>
                        {displayedProducts.map((product, index) => (
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
                    <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-200 animate-in fade-in duration-500">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <SlidersHorizontal className="w-8 h-8 text-silvoraa-warmGray" />
                        </div>
                        <h3 className="text-2xl font-serif text-silvoraa-black mb-3">
                            {searchQuery ? `No results for "${searchQuery}"` : "No Products Found"}
                        </h3>
                        <p className="text-silvoraa-warmGray max-w-md mb-8">
                            {searchQuery
                                ? "Try checking your spelling or use different keywords."
                                : "Try adjusting your filters or browse our full collection."
                            }
                        </p>
                        <button
                            onClick={clearAllFilters}
                            className="px-8 py-4 bg-silvoraa-black text-white uppercase tracking-widest text-xs font-bold hover:bg-silvoraa-gold transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
                        >
                            {searchQuery ? "Clear Search" : "View All Products"}
                        </button>
                    </div>
                )}

                {displayedProducts.length > 0 && (
                    <div className="mt-16 text-center">
                        <p className="text-sm text-silvoraa-warmGray">
                            Showing all <span className="font-bold text-silvoraa-black">{displayedProducts.length}</span> pieces
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopContent;
