"use client";
import React from 'react';

import Link from 'next/link';
import { ProductCard } from '@/components/Product/ProductCard';
import { PRODUCTS } from '@/constants';
import { Product } from '@/types';
import { ChevronRight, Sparkles, Star, TrendingUp } from 'lucide-react';



import { useRouter } from 'next/navigation';

const NewArrivalsPage : React.FC = () => {
    const router = useRouter();
    const onProductClick = (product: Product) => router.push(`/product/${product.handle}`);
    // Show last 12 products as "new arrivals"
    const newProducts = [...PRODUCTS].reverse().slice(0, 12);

    return (
        <>
        
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Premium Hero Banner */}
            <div className="relative overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-silvoraa-black via-gray-900 to-silvoraa-black">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-silvoraa-gold/30 via-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative container mx-auto px-6 pt-32 pb-24 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Animated Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 animate-in fade-in zoom-in duration-700">
                            <div className="relative">
                                <Sparkles className="w-5 h-5 text-silvoraa-gold animate-pulse" />
                                <div className="absolute inset-0 bg-silvoraa-gold/50 blur-md animate-ping" style={{ animationDuration: '2s' }} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-silvoraa-gold">Just Dropped</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            New Arrivals
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Fresh designs, newly added to our collection.
                            Be among the first to discover these exquisite pieces.
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Star className="w-5 h-5 text-silvoraa-gold" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-serif">{newProducts.length}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">New Pieces</p>
                                </div>
                            </div>
                            <div className="w-px h-12 bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-serif">24h</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Fresh Stock</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                    <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto block">
                        <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 69.3C960 69 1056 59 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V80Z" fill="#FFFFFF" />
                    </svg>
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>

            <div className="container mx-auto px-6 py-16">
                {/* Breadcrumb */}
                <div className="flex items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-12 animate-in fade-in duration-500">
                    <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
                    <span className="text-silvoraa-black font-bold">New Arrivals</span>
                </div>

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 pb-8 border-b border-gray-200 animate-in fade-in duration-500">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-gold mb-2 block">Latest Collection</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-silvoraa-black">Latest Additions</h2>
                    </div>
                    <p className="text-silvoraa-warmGray">
                        <span className="font-bold text-silvoraa-black">{newProducts.length}</span> new pieces to explore
                    </p>
                </div>

                {/* Product Grid with Premium Styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                    {newProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}
                        >
                            {/* "New" Badge with Glow */}
                            {index < 6 && (
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-silvoraa-gold blur-md opacity-50" />
                                        <span className="relative bg-silvoraa-gold text-silvoraa-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                            New
                                        </span>
                                    </div>
                                </div>
                            )}
                            <ProductCard
                                product={product}
                                onClick={() => onProductClick(product)}
                            />
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-20">
                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-silvoraa-black text-white uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:shadow-silvoraa-gold/20"
                    >
                        Explore Full Collection
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default NewArrivalsPage;
