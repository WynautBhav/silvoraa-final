"use client";
import React, { useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/constants';
import { ProductType } from '@/types';
import { ArrowRight } from 'lucide-react';

// Category configuration with descriptions
const CATEGORY_CONFIG: Record<ProductType, {
    description: string;
}> = {
    [ProductType.RING]: {
        description: 'Elegant statement pieces'
    },
    [ProductType.EARRINGS]: {
        description: 'Dangling treasures of light'
    },
    [ProductType.BRACELET]: {
        description: 'Wrist-adorning elegance'
    },
    [ProductType.PENDANT]: {
        description: 'Close to your heart'
    },
    [ProductType.NOSE_RING]: {
        description: 'Delicate facial accents'
    },
    [ProductType.NECKLACE]: {
        description: 'Graceful neck adornments'
    }
};

// Categories to display on homepage (excluding Necklace to keep it at 5)
const HOMEPAGE_CATEGORIES: ProductType[] = [
    ProductType.RING,
    ProductType.EARRINGS,
    ProductType.BRACELET,
    ProductType.PENDANT,
    ProductType.NOSE_RING
];

export function CategoryCollections() {
    // Count products per category and get featured product image for each
    const categoryData = useMemo(() => {
        const data: Record<string, { count: number; image: string }> = {};

        // Featured products for specific categories
        const featuredProducts: Record<string, string> = {
            [ProductType.EARRINGS]: 'Lunara Amethyst Cascade Earrings',
            [ProductType.PENDANT]: 'Liora Labradorite Bloom Pendant'
        };

        PRODUCTS.forEach(product => {
            if (!data[product.type]) {
                // Check if this category has a featured product
                const featuredTitle = featuredProducts[product.type];
                const featuredProduct = featuredTitle
                    ? PRODUCTS.find(p => p.title === featuredTitle)
                    : null;

                data[product.type] = {
                    count: 1,
                    image: featuredProduct ? featuredProduct.image : product.image
                };
            } else {
                data[product.type].count += 1;
            }
        });

        return data;
    }, []);

    return (
        <section className="pt-10 md:pt-16 pb-12 md:pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-gold mb-4 block">
                        Browse by style
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-silvoraa-black mb-4">
                        Collections shaped by design. Worn with intention.
                    </h2>
                    <p className="text-silvoraa-warmGray max-w-xl mx-auto">
                        Find the perfect piece for every occasion, curated by jewelry type.
                    </p>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {HOMEPAGE_CATEGORIES.map((category, index) => {
                        const config = CATEGORY_CONFIG[category];
                        const data = categoryData[category] || { count: 0, image: '' };

                        return (
                            <Link
                                key={category}
                                href={`/shop?type=${encodeURIComponent(category)}`}
                                className="group relative overflow-hidden rounded-2xl aspect-[3/4] animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Product Image Background - No color overlay */}
                                {data.image && (
                                    <div className="absolute inset-0">
                                        {/* Responsive Image Logic */}
                                        {data.image.includes('/optimized/opt_') ? (
                                            <picture className="w-full h-full block">
                                                <source
                                                    media="(max-width: 640px)"
                                                    srcSet={data.image.replace(/(\.[^.]+)$/, '_mob$1')}
                                                />
                                                <img
                                                    src={data.image}
                                                    alt={category}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </picture>
                                        ) : (
                                            <img
                                                src={data.image}
                                                alt={category}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Subtle bottom gradient for text readability only */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Animated Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-between p-5">
                                    {/* Top: Count Badge */}
                                    <div className="flex justify-end items-start">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-silvoraa-black shadow-sm">
                                            {data.count}
                                        </span>
                                    </div>

                                    {/* Bottom: Category Name */}
                                    <div className="text-white">
                                        <h3 className="text-lg md:text-xl font-serif mb-1 group-hover:translate-x-1 transition-transform duration-300">
                                            {category === ProductType.NOSE_RING ? 'Nose Rings' : `${category}s`}
                                        </h3>
                                        <p className="text-xs text-white/80 mb-3 hidden md:block">
                                            {config.description}
                                        </p>
                                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            Shop Now
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-silvoraa-gold/40 transition-all duration-300 pointer-events-none" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
