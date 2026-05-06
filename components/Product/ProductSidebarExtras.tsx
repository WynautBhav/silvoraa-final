"use client";
import React, { useMemo } from 'react';
import Link from 'next/link';
import { STONES, PRODUCTS } from '@/constants';
import { Product } from '@/types';
import { ShieldCheck, Gem, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface SidebarProps {
    product: Product;
}

export function ProductSidebarExtras({ product }: SidebarProps) {

    const stoneInfo = useMemo(() => {
        return STONES.find(s => s.stone === product.stone);
    }, [product.stone]);

    const match = useMemo(() => {
        return PRODUCTS.find(p =>
            p.stone === product.stone &&
            p.id !== product.id &&
            p.type !== product.type
        ) || PRODUCTS.find(p =>
            p.stone === product.stone &&
            p.id !== product.id
        );
    }, [product]);

    return (
        <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

            <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#E6E1D6]">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-gold mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Styling & Story
                </h3>

                {stoneInfo && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white rounded-full shadow-sm">
                                <Gem className="w-4 h-4 text-purple-900" />
                            </div>
                            <span className="text-sm font-serif italic text-silvoraa-black">The {stoneInfo.stone} Story</span>
                        </div>
                        <p className="text-xs leading-relaxed text-silvoraa-warmGray">
                            {stoneInfo.description}
                        </p>
                    </div>
                )}

                {match && <div className="h-px w-full bg-[#E6E1D6] mb-8" />}

                {match && (
                    <div>
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-silvoraa-black">Pair With</span>
                            <Link href={`/products/${match.handle}`} className="text-[10px] text-silvoraa-gold hover:underline">View</Link>
                        </div>

                        <Link href={`/products/${match.handle}`} className="group flex gap-4 bg-white p-3 rounded-xl border border-transparent hover:border-silvoraa-gold/30 transition-all shadow-sm hover:shadow-md">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                <img src={match.image} alt={match.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-xs font-bold text-silvoraa-black line-clamp-2 group-hover:text-silvoraa-gold transition-colors">{match.title}</h4>
                                <span className="text-[10px] text-silvoraa-warmGray mt-1">{match.type}</span>
                            </div>
                            <div className="ml-auto flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-gray-50 group-hover:bg-silvoraa-gold group-hover:text-white transition-colors flex items-center justify-center">
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );
};