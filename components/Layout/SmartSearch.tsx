"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ChevronRight, Gem, History, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/constants';
import { Product } from '@/types';
import { trackSearch } from '@/hooks/useAnalytics';

interface SmartSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLUListElement>(null);
    const navigate = useRouter();

    // Load recent searches on mount
    useEffect(() => {
        const saved = window?.localStorage?.getItem('silvoraa_recent_searches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    // Focus & Reset
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setSelectedIndex(-1);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Smart Filtering Logic
    const results = useMemo(() => {
        if (!query.trim()) return [];

        const q = query.toLowerCase();
        return PRODUCTS.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.stone.toLowerCase().includes(q) ||
            p.type.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
        );
    }, [query]);

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0 && resultsRef.current) {
            const el = resultsRef.current.children[selectedIndex] as HTMLElement;
            el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedIndex]);

    // Witty & Smart Feedback Logic
    const wittyMessage = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return null;

        const responses: Record<string, string> = {
            'gift': "Excellent choice. Silver is timeless, just like your bond. 🎁",
            'love': "We can't sell love, but Rose Quartz is the next best thing. ❤️",
            'wife': "Pro tip: You can never go wrong with her birthstone set in Silver. 💍",
            'sorry': "In the doghouse? A natural gemstone is the universal language of forgiveness. 😅",
            'money': "Invest in yourself. Citrine is known to attract abundance! 💰",
            'blue': "Feeling blue? Or just looking for some calming Topaz? 💧",
            'magic': "Our Labradorite is as close to real magic as you can get. ✨",
            'engagement': "Big step! Let's find a unique natural stone for a unique love. 💍",
            'gold': "We specialize in the purity of Sterling Silver here. It shines brighter! ✨",
            'diamond': "We prefer the colorful personality of natural gemstones over diamonds. 💎"
        };

        for (const [key, msg] of Object.entries(responses)) {
            if (q.includes(key)) return msg;
        }
        return null;
    }, [query]);

    // Smart Empty State Logic
    const emptyStateMessage = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (q.length < 3) return "No treasures found.";

        if (q.includes('unicorn')) return "We haven't caught any unicorns... yet. Try 'Opal' for similar magic. 🦄";
        if (q.includes('pizza')) return "We love pizza too, but we only serve natural gems here. 🍕";
        if (q.includes('phone')) return "Wrong store! But our natural stones outlast any battery. 📱";
        if (q.includes('dog')) return "Aww! Maybe a collar charm? (We don't have those yet though). 🐶";

        return "That looks like an ancient spell, not a gemstone. Try 'Ruby' or 'Amethyst'?";
    }, [query]);


    const saveRecentSearch = (term: string) => {
        const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
        setRecentSearches(newRecent);
        window?.localStorage?.setItem('silvoraa_recent_searches', JSON.stringify(newRecent));
    };

    const handleResultClick = (handle: string, term?: string) => {
        if (term) saveRecentSearch(term);
        else saveRecentSearch(query);

        navigate.push(`/products/${handle}`);
        onClose();
    };

    const handleViewAll = () => {
        if (query.trim()) {
            trackSearch(query.trim());
        }
        saveRecentSearch(query);
        navigate.push(`/shop?q=${encodeURIComponent(query)}`);
        onClose();
    };

    // Corrected Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();

            if (results.length > 0) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % results.length);
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
                }
                if (e.key === 'Enter') {
                    if (selectedIndex >= 0) {
                        handleResultClick(results[selectedIndex].handle);
                    } else {
                        handleViewAll();
                    }
                }
            } else if (e.key === 'Enter' && query.trim()) {
                handleViewAll();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, results, query]);

    const suggestions = ['Amethyst', 'Blue Topaz', 'Ring', 'Silver', 'Gift'];

    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
        if (!highlight.trim()) return <>{text}</>;
        const parts = text.split(new RegExp(`(${escapeRegex(highlight)})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase()
                        ? <span key={i} className="text-silvoraa-gold font-bold bg-silvoraa-gold/10 px-0.5 rounded">{part}</span>
                        : part
                )}
            </>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex flex-col items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-white/95 backdrop-blur-xl animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Search Container */}
            <div className="relative w-full max-w-2xl mt-4 md:mt-24 px-4 md:px-6 animate-in slide-in-from-top-4 duration-500 h-full md:h-auto flex flex-col">
                {/* Search Bar */}
                <div className="relative flex flex-col mb-6 flex-shrink-0">
                    <div className="relative flex items-center">
                        <Search className={`absolute left-6 w-5 h-5 transition-colors ${query ? 'text-silvoraa-gold' : 'text-gray-400'}`} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
                            placeholder="Search for jewelry, gemstones, or collections..."
                            className="w-full py-5 pl-14 pr-14 bg-gray-50/50 hover:bg-white focus:bg-white rounded-2xl md:rounded-full shadow-sm border border-transparent focus:border-silvoraa-gold/30 text-lg font-medium text-silvoraa-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-silvoraa-gold/5 transition-all duration-300"
                        />
                        {query ? (
                            <button
                                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                                className="absolute right-4 p-2 text-gray-400 hover:text-silvoraa-black transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="absolute right-4 p-2 px-4 bg-gray-100 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-200 transition-colors md:hidden"
                            >
                                CANCEL
                            </button>
                        )}
                    </div>

                    {/* Witty Message Banner - Only show if we have a message and results OR checking specifically for these terms */}
                    {wittyMessage && (
                        <div className="mt-3 mx-4">
                            <p className="text-sm font-medium text-silvoraa-gold animate-in slide-in-from-top-2 fade-in flex items-center gap-2">
                                <Gem className="w-4 h-4" />
                                {wittyMessage}
                            </p>
                        </div>
                    )}
                </div>

                {/* Results Area */}
                <div className="bg-white md:rounded-3xl shadow-2xl md:ring-1 md:ring-black/5 overflow-hidden flex-1 md:flex-none md:max-h-[60vh] overflow-y-auto w-full relative">

                    {query.trim().length === 0 ? (
                        /* Empty State: Recent & Suggestions */
                        <div className="p-6 md:p-8 animate-in fade-in duration-500">

                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-silvoraa-warmGray">Recent</p>
                                        <button
                                            onClick={() => { setRecentSearches([]); window?.localStorage?.removeItem('silvoraa_recent_searches'); }}
                                            className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            CLEAR
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        {recentSearches.map((term, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setQuery(term)}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-left group transition-colors"
                                            >
                                                <History className="w-4 h-4 text-gray-300 group-hover:text-silvoraa-gold" />
                                                <span className="text-sm text-gray-600 group-hover:text-silvoraa-black">{term}</span>
                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                                    <ArrowRight className="w-3 h-3 text-gray-400" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="text-xs font-bold uppercase tracking-widest text-silvoraa-warmGray mb-4">Trending Now</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={s}
                                        onClick={() => setQuery(s)}
                                        className="px-4 py-2 bg-white border border-gray-100 hover:border-silvoraa-gold hover:text-silvoraa-gold rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md animate-in slide-in-from-bottom-2 fade-in"
                                        style={{ animationDelay: `${i * 50}ms` }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : results.length > 0 ? (
                        /* Results List */
                        <ul ref={resultsRef} className="py-2">
                            {results.map((product, idx) => (
                                <li key={product.id} className="animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <button
                                        onClick={() => handleResultClick(product.handle)}
                                        className={`w-full flex items-center gap-5 px-6 py-4 transition-all duration-200 group text-left border-l-4 ${idx === selectedIndex ? 'bg-silvoraa-gold/5 border-silvoraa-gold' : 'border-transparent hover:bg-gray-50'}`}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                    >
                                        <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm md:text-base font-bold text-silvoraa-black mb-1 truncate">
                                                <HighlightText text={product.title} highlight={query} />
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-silvoraa-warmGray">
                                                <span className="capitalize">{product.stone}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span className="capitalize">{product.type}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-all ${idx === selectedIndex ? 'text-silvoraa-gold translate-x-0' : 'text-gray-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                    </button>
                                </li>
                            ))}

                            {/* View All Button */}
                            <li className="p-4 border-t border-gray-100 sticky bottom-0 bg-white/95 backdrop-blur-sm">
                                <button
                                    onClick={handleViewAll}
                                    className="w-full py-3 bg-silvoraa-black text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-silvoraa-gold transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>View All {results.length} Results</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </li>
                        </ul>
                    ) : (
                        /* No Results - Smart Empty State */
                        <div className="flex flex-col items-center justify-center p-12 text-center text-silvoraa-warmGray min-h-[300px]">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                <Gem className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-lg font-serif text-silvoraa-black mb-1 px-8">
                                "{emptyStateMessage}"
                            </p>

                            <button
                                onClick={() => setQuery('')}
                                className="mt-6 text-xs font-bold text-silvoraa-gold hover:underline uppercase tracking-widest"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Hint (Desktop) */}
                <div className="hidden md:flex justify-center items-center gap-6 mt-4 opacity-50 text-[10px] uppercase tracking-widest font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 border border-current rounded flex items-center justify-center">↵</span>
                        <span>View All</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 border border-current rounded flex items-center justify-center">↑↓</span>
                        <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 border border-current rounded flex items-center justify-center">ESC</span>
                        <span>Close</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
