'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HeroSection } from '@/components/Hero/HeroSection';
import { StoneBenefits } from '@/components/Stones/StoneBenefits';
import { CategoryCollections } from '@/components/Home/CategoryCollections';
import { ConsultationCTA } from '@/components/Home/ConsultationCTA';
import { ProductCard } from '@/components/Product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { FAQSection } from '@/components/Home/FAQSection';

import { Product } from '@/types';
import { ArrowRight, Gem, Shield, Heart } from 'lucide-react';

const HomePageClient: React.FC = () => {
    const router = useRouter();
    const onProductClick = (product: Product) => router.push(`/product/${product.handle}`);
    const { products: featuredProducts } = useProducts({ limit: 10 });

    return (
        <div className="min-h-screen">
            <HeroSection />
            <StoneBenefits />
            <CategoryCollections />

            <section className="pt-8 md:pt-12 pb-10 md:pb-12 px-4 md:px-6 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-gold mb-3 md:mb-4 block">
                            Curated Selection
                        </span>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-silvoraa-black mb-3 md:mb-4">
                            Featured Treasures
                        </h1>
                        <p className="text-silvoraa-warmGray max-w-xl mx-auto text-sm md:text-base">
                            Handpicked pieces that embody the essence of Silvoraa -
                            where ancient wisdom meets modern elegance.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12">
                        {featuredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => onProductClick(product)}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-10 md:mt-16">
                        <Link
                            href="/shop"
                            className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-silvoraa-black text-white uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-silvoraa-gold transition-all duration-300"
                        >
                            View All Collections
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-4 md:py-8 px-4 md:px-6 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto">
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-12 relative -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="sticky md:static top-24 md:top-auto z-10 bg-white md:bg-transparent rounded-3xl md:rounded-none p-8 md:p-4 shadow-sm md:shadow-none border border-gray-100 md:border-transparent flex flex-col items-center text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Gem className="w-6 h-6 md:w-7 md:h-7 text-silvoraa-gold" />
                            </div>
                            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3 text-silvoraa-black">Authentic Gemstones</h3>
                            <p className="text-silvoraa-warmGray text-sm leading-relaxed">
                                Every stone is carefully selected for its natural beauty and metaphysical properties.
                            </p>
                        </div>
                        <div className="sticky md:static top-32 md:top-auto z-20 bg-gray-100 md:bg-transparent rounded-3xl md:rounded-none p-8 md:p-4 shadow-sm md:shadow-none border border-gray-100 md:border-transparent flex flex-col items-center text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Shield className="w-6 h-6 md:w-7 md:h-7 text-silvoraa-gold" />
                            </div>
                            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3 text-silvoraa-black">925 Sterling Silver</h3>
                            <p className="text-silvoraa-warmGray text-sm leading-relaxed">
                                Premium quality silver that stands the test of time, crafted to last generations.
                            </p>
                        </div>
                        <div className="sticky md:static top-40 md:top-auto z-30 bg-white md:bg-transparent rounded-3xl md:rounded-none p-8 md:p-4 shadow-sm md:shadow-none border border-gray-100 md:border-transparent flex flex-col items-center text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Heart className="w-6 h-6 md:w-7 md:h-7 text-silvoraa-gold" />
                            </div>
                            <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3 text-silvoraa-black">Crafted with Meaning</h3>
                            <p className="text-silvoraa-warmGray text-sm leading-relaxed">
                                Made by skilled artisans, finished with care and purpose.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection />
            <ConsultationCTA />

            <section className="py-16 md:py-24 px-6 bg-silvoraa-black text-white">
                <div className="container mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Join the Silvoraa Circle</h2>
                    <p className="text-gray-400 mb-8">
                        Be the first to discover new collections, exclusive offers, and gemstone insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-none text-white placeholder-gray-500 focus:outline-none focus:border-silvoraa-gold transition-colors"
                        />
                        <button className="px-8 py-3 bg-silvoraa-gold text-silvoraa-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageClient;
