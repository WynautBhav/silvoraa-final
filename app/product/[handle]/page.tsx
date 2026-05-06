"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { STONES } from '@/constants';
import { Product, StoneType } from '@/types';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/Product/ProductCard';
import { useCart } from '@/components/Cart/CartContext';
import { ProductDescriptionMain, ProductDescriptionExtras } from '@/components/Product/ProductDescription';
import { SilvoraaStylist } from '@/components/Product/SilvoraaStylist';
import { ProductSidebarExtras } from '@/components/Product/ProductSidebarExtras';
import { ProductPromiseBanner } from '@/components/Product/ProductPromiseBanner';
import { ImageUpscaler } from '@/components/UI/ImageUpscaler';
import { ChevronRight, ArrowLeft, Minus, Plus, ShoppingBag, Heart, Share2, Check, Sparkles, Gem, Loader2 } from 'lucide-react';



import { useRouter } from 'next/navigation';

const ProductPage : React.FC = () => {
    const router = useRouter();

    const onProductClick = (product: Product) => router.push(`/product/${product.handle}`);
    const { handle } = useParams<{ handle: string }>();

    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Fetch product data
    const { product, isLoading: isProductLoading, error: productError } = useProduct(handle || '');
    // Fetch all products for 'Related Products'
    const { products: allProducts } = useProducts();

    // Related products (Priority: Manual > Stone > Type > Any)
    const relatedProducts = useMemo(() => {
        if (!product || !allProducts.length) return [];

        // 1. Manual Selection (Pairs With) - use handle not id
        if (product.related_product_ids && product.related_product_ids.length > 0) {
            const manualPairs = allProducts.filter(p => product.related_product_ids?.includes(p.handle));
            if (manualPairs.length > 0) return manualPairs;
        }

        // 2. Fallback: Smart Auto-Suggest (Same stone, different type)
        let related = allProducts.filter(p => 
            p.stone === product.stone && 
            p.type !== product.type && 
            p.handle !== product.handle
        );

        if (related.length < 4) {
            // 3. Fallback: Different stone, different type
            const differentType = allProducts.filter(p => 
                p.type !== product.type && 
                p.handle !== product.handle &&
                !related.some(r => r.handle === p.handle)
            );
            related = [...related, ...differentType];
        }

        if (related.length < 4) {
            const others = allProducts.filter(p =>
                p.handle !== product.handle &&
                p.type !== product.type &&
                !related.some(r => r.handle === p.handle)
            );
            related = [...related, ...others];
        }

        return related.slice(0, 4);
    }, [product, allProducts]);

    // Dynamic Benefits Logic: Start with primary stone, then add any stones found in tags
    const derivedBenefits = useMemo(() => {
        if (!product) return [];

        const stonesFound = new Set<StoneType>();
        stonesFound.add(product.stone);

        // Check tags for other stones
        // Create a map of lowercase stone name -> StoneType for easy lookup
        const stoneMap = new Map<string, StoneType>();
        Object.values(StoneType).forEach(s => stoneMap.set(s.toLowerCase(), s));
        Object.keys(StoneType).forEach(k => {
            // also map enum keys if needed, but values are usually what's in tags
            const val = StoneType[k as keyof typeof StoneType];
            stoneMap.set(val.toLowerCase(), val);
        });

        product.tags.forEach(tag => {
            const lowerTag = tag.toLowerCase();
            // simple check: if tag includes the stone name
            for (const [name, type] of stoneMap.entries()) {
                if (lowerTag.includes(name)) {
                    stonesFound.add(type);
                }
            }
        });

        // Now collect benefits for all found stones
        const uniqueBenefits = new Set<string>();
        stonesFound.forEach(s => {
            const stoneData = STONES.find(db => db.stone === s);
            if (stoneData) {
                uniqueBenefits.add(stoneData.benefit);
            }
        });

        return Array.from(uniqueBenefits);
    }, [product]);

    if (isProductLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-silvoraa-gold animate-spin mx-auto mb-4" />
                    <p className="text-silvoraa-warmGray text-sm tracking-widest uppercase">Loading masterpiece...</p>
                </div>
            </div>
        );
    }

    if (!product || productError) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-center px-6 animate-in fade-in duration-500">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Gem className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-4xl font-serif mb-4 text-silvoraa-black">Product Not Found</h1>
                    <p className="text-silvoraa-warmGray mb-8 max-w-md">This product doesn't exist or has been removed from our collection.</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-black text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
    };

    // State for interactions moved to top
    // const [isWishlisted, setIsWishlisted] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.title,
                    text: `Check out this ${product?.title} on Silvoraa!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.warn('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            // Could add a toast here, but for now visual feedback on button is enough if we add it
            alert('Link copied to clipboard!');
        }
    };

    const productSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": String(product.title),
        "description": String(product.description).substring(0, 160),
        "sku": String(product.handle),
        "mpn": String(product.id),
        "image": images.filter((img: string) => typeof img === 'string'),
        "brand": {
            "@type": "Brand",
            "name": "Silvoraa"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Silvoraa",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jaipur",
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.8,
            "reviewCount": 47,
            "bestRating": 5,
            "worstRating": 1
        },
        "offers": {
            "@type": "Offer",
            ...(product.price > 0 && {
                "price": Number(product.price),
                "priceCurrency": "INR",
                "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }),
            "availability": product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": `https://www.silvoraa.com/products/${String(product.handle)}`,
            "seller": {
                "@type": "Organization",
                "name": "Silvoraa"
            }
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            
            <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-16">
                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-3 animate-in fade-in duration-500 gap-y-2">
                    <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40 flex-shrink-0" />
                    <Link href="/shop" className="hover:text-silvoraa-gold transition-colors">Shop</Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40 flex-shrink-0" />
                    <Link href={`/shop?stone=${encodeURIComponent(product.stone)}`} className="hover:text-silvoraa-gold transition-colors">
                        {product.stone}
                    </Link>
                    <ChevronRight className="w-3 h-3 mx-2 opacity-40 flex-shrink-0" />
                    <span className="text-silvoraa-black font-bold">{product.title}</span>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {/* Images Section */}
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                        {/* Main image wrapper - relative container for overlay thumbnails */}
                        <div className="relative flex gap-3">

                            {/* Vertical Thumbnail Strip - overlaid on left edge of main image */}
                            {images.length > 1 && (
                                <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-md flex-shrink-0 ${
                                                idx === selectedImageIndex
                                                    ? 'border-silvoraa-gold shadow-silvoraa-gold/30 scale-105'
                                                    : 'border-white/70 opacity-60 hover:opacity-100 hover:border-silvoraa-gold/50'
                                            }`}
                                        >
                                            <img
                                                src={img.includes('/optimized/opt_') ? img.replace(/(\.[^.]+)$/, '_mob$1') : img}
                                                alt={`${product.title} - image ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div
                                className="relative w-full bg-white rounded-3xl overflow-hidden shadow-xl cursor-zoom-in group"
                                style={{ paddingBottom: '75%', height: 0 }}
                                onClick={() => setIsZoomOpen(true)}
                            >
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    {images[selectedImageIndex].includes('/optimized/opt_') ? (
                                        <picture className="w-full h-full block">
                                            <source
                                                media="(max-width: 640px)"
                                                srcSet={images[selectedImageIndex].replace(/(\.[^.]+)$/, '_mob$1')}
                                            />
                                            <img
                                                src={images[selectedImageIndex]}
                                                alt={product.title}
                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                                loading="eager"
                                            />
                                        </picture>
                                    ) : (
                                        <img
                                            src={images[selectedImageIndex]}
                                            alt={product.title}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                {/* Zoom Hint */}
                                <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-silvoraa-warmGray shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to zoom
                                </div>

                                {/* Image count badge (bottom right, subtle) */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                        {selectedImageIndex + 1} / {images.length}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Extra Details Sections (Benefits, Care, Style) - Moved here under images */}
                        <div className="hidden lg:block" key={product.id}>
                            <ProductDescriptionExtras product={product} />
                        </div>

                        {/* Sidebar Extras (Encyclopedia, Upsell, Promise) */}
                        <div className="hidden lg:block">
                            <ProductSidebarExtras product={product} />
                        </div>
                    </div>

                    {/* Product Info - Sticky Desktop Stickiness */}
                    <div className="lg:col-span-1 lg:sticky lg:top-32 h-fit lg:py-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                        {/* Stone Badge */}

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-silvoraa-black mb-6 leading-tight tracking-tight">
                            {product.title}
                        </h1>

<p className="text-2xl font-display font-semibold text-silvoraa-gold mb-8">
                            ₹{product.price.toFixed(2)}
                          </p>

                        {/* Action Buttons: Add to Cart, Wishlist, Share - Grid on Mobile, Row on Desktop */}
                        <div className="grid grid-cols-2 gap-2 mb-10 pb-8 border-b border-gray-100">
                            {/* Quantity - Full width on mobile, auto on desktop */}
                            <div className="flex items-center justify-center md:justify-start bg-white border border-gray-200 rounded-full h-9 shadow-sm hover:border-silvoraa-gold transition-colors w-full md:w-auto">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-8 h-full flex items-center justify-center text-silvoraa-black hover:bg-gray-50 rounded-l-full"
                                >
                                    <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-silvoraa-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-8 h-full flex items-center justify-center text-silvoraa-black hover:bg-gray-50 rounded-r-full"
                                >
                                    <Plus className="w-2.5 h-2.5" />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddedToCart}
                                className={`flex items-center justify-center gap-1.5 px-2 md:px-4 h-9 rounded-full uppercase tracking-wider text-xs font-bold transition-all duration-300 shadow-md ${isAddedToCart
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                    : 'bg-silvoraa-black text-white hover:bg-silvoraa-gold hover:shadow-lg hover:-translate-y-0.5'
                                    }`}
                            >
                                {isAddedToCart ? (
                                    <>
                                        <Check className="w-3 h-3" />
                                        <span className="hidden sm:inline">Added</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-3 h-3" />
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>

                            {/* Wishlist Button */}
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`flex items-center justify-center gap-1.5 px-3 h-9 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isWishlisted
                                    ? 'bg-red-50 border-red-200 text-red-500'
                                    : 'bg-white border-gray-200 text-silvoraa-warmGray hover:border-silvoraa-black hover:text-silvoraa-black'
                                    }`}
                            >
                                <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-current' : ''}`} />
                                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                            </button>

                            {/* Share Button */}
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-1.5 px-3 h-9 rounded-full border border-gray-200 bg-white text-silvoraa-warmGray text-xs font-bold uppercase tracking-wider hover:border-silvoraa-black hover:text-silvoraa-black transition-all duration-300"
                            >
                                <Share2 className="w-3 h-3" />
                                Share
                            </button>
                        </div>

                        {/* Main Description (Intro + Specs) */}
                        <ProductDescriptionMain product={product} />

                        {/* AI Stylist Feature */}
                        <SilvoraaStylist
                            productTitle={product.title}
                            stone={product.stone}
                            type={product.type}
                        />

                        {/* Benefits (Dynamic) - Clickable to filter by energy */}
                        {derivedBenefits.length > 0 && (
                            <div className="mb-10 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-purple-100" />

                                <h3 className="relative text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-black mb-6 flex items-center gap-2">
                                    <Gem className="w-4 h-4 text-silvoraa-gold" />
                                    Gemstone Energy
                                </h3>
                                <div className="relative flex flex-wrap gap-3">
                                    {derivedBenefits.map(benefit => (
                                        <Link
                                            key={benefit}
                                            href={`/shop?benefit=${encodeURIComponent(benefit)}`}
                                            className="px-5 py-2.5 bg-gray-50 text-silvoraa-warmGray text-sm font-medium rounded-full border border-transparent hover:border-silvoraa-gold hover:text-silvoraa-gold hover:bg-white transition-all duration-300 cursor-pointer"
                                        >
                                            {benefit}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mobile Only: Styling Sidebar moved to bottom of product info */}
                        {/* Mobile Only: Stylist Note & Styling Sidebar moved to bottom of product info */}
                        <div className="block lg:hidden space-y-12 mt-12" key={product.id}>
                            <ProductDescriptionExtras product={product} />
                            <ProductSidebarExtras product={product} />
                        </div>
                    </div>
                </div>

                {/* Full Width Assurance Banner */}
                <ProductPromiseBanner />


                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-gray-100 animate-in fade-in duration-700">
                        <div className="flex justify-between items-end mb-8 md:mb-10">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-gold mb-2 block">Complete Your Look</span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-silvoraa-black">You May Also Like</h2>
                            </div>
                            <Link
                                href={`/shop?stone=${encodeURIComponent(product.stone)}`}
                                className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors"
                            >
                                View All
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {relatedProducts.map((p, index) => (
                                <div
                                    key={p.id}
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <ProductCard
                                        product={p}
                                        onClick={() => router.push(`/product/${p.handle}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Lightbox Zoom Modal - Premium 'Frosty Glass' Design */}
            {isZoomOpen && (
                <ImageUpscaler
                    images={images}
                    initialIndex={selectedImageIndex}
                    isOpen={isZoomOpen}
                    onClose={() => setIsZoomOpen(false)}
                />
            )}
        </div>
    );
};



export default ProductPage;
