"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/constants';
import { useCart } from '@/components/Cart/CartContext';
import { ProductDescriptionMain, ProductDescriptionExtras } from '@/components/Product/ProductDescription';
import { SilvoraaStylist } from '@/components/Product/SilvoraaStylist';
import { ProductSidebarExtras } from '@/components/Product/ProductSidebarExtras';
import { ProductPromiseBanner } from '@/components/Product/ProductPromiseBanner';
import { Lightbox } from '@/components/Product/Lightbox';
import { ChevronRight, Heart, Share2, Minus, Plus, ShoppingBag, ShieldCheck, Truck, RotateCcw, Gem, Check } from 'lucide-react';

export default function ProductPageClient() {
  const router = useRouter();
  const { handle } = useParams<{ handle: string }>();
  const { addToCart, toggleCart } = useCart();

  const product = useMemo(() => {
    if (!handle) return null;
    return PRODUCTS.find(p => p.handle === handle) || null;
  }, [handle]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedVariant(null);
    setAddedToCart(false);
  }, [handle]);

  useEffect(() => {
    if (product?.variants?.length && !selectedVariant) {
      setSelectedVariant(product.variants[0].id);
    }
  }, [product, selectedVariant]);

  const currentVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants.find(v => v.id === selectedVariant) || product.variants[0];
  }, [product, selectedVariant]);

  const images = useMemo(() => {
    if (!product) return [];
    const all = [product.image, ...(product.images || [])].filter(Boolean);
    return all.length > 0 ? all : ['/images/placeholder.png'];
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, selectedVariant, quantity, addToCart]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <Gem className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h1 className="text-4xl font-serif mb-4 text-silvoraa-black">Product Not Found</h1>
          <p className="text-silvoraa-warmGray mb-8 max-w-md">
            This piece seems to have wandered off. It may no longer be available or the link may be incorrect.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-black text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
          <Link href="/shop" className="hover:text-silvoraa-gold transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
          <span className="text-silvoraa-black font-bold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 group cursor-zoom-in"
            >
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </button>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden bg-gray-50 transition-all duration-300 ${
                      idx === selectedImage
                        ? 'ring-2 ring-silvoraa-gold ring-offset-2 scale-105'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-silvoraa-gold mb-2">{product.type}</p>
                <h1 className="text-3xl md:text-4xl font-serif text-silvoraa-black leading-tight">{product.title}</h1>
                <p className="text-sm text-silvoraa-warmGray mt-2">{product.stone}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 rounded-full border border-gray-200 text-silvoraa-warmGray hover:text-silvoraa-gold hover:border-silvoraa-gold transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-full border border-gray-200 text-silvoraa-warmGray hover:text-silvoraa-gold hover:border-silvoraa-gold transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-silvoraa-black">
                  ${(currentVariant?.price ?? product.price).toFixed(2)}
                </span>
                {product.variants?.length > 0 && (
                  <span className="text-sm text-silvoraa-warmGray line-through">
                    ${((currentVariant?.price ?? product.price) * 1.2).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {product.variants?.length > 1 && (
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-silvoraa-black mb-3">Size / Option</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                        selectedVariant === v.id
                          ? 'border-silvoraa-gold bg-silvoraa-gold/5 text-silvoraa-gold'
                          : 'border-gray-200 text-silvoraa-warmGray hover:border-silvoraa-black/30'
                      } ${v.inventory === 0 ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                    >
                      {v.name}
                      {v.inventory > 0 && v.inventory <= 5 && (
                        <span className="ml-2 text-[10px] text-amber-500">Only {v.inventory} left</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:text-silvoraa-gold transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-silvoraa-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(99, q + 1))}
                  className="p-3 hover:text-silvoraa-gold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={currentVariant?.inventory === 0}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : currentVariant?.inventory === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-silvoraa-black text-white hover:bg-silvoraa-gold active:scale-[0.98]'
                }`}
              >
                {addedToCart ? (
                  <><Check className="w-5 h-5" /> Added</>
                ) : currentVariant?.inventory === 0 ? (
                  'Sold Out'
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Add to Cart</>
                )}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Truck className="w-4 h-4 text-silvoraa-gold" />
                <span className="text-[10px] font-medium text-silvoraa-warmGray leading-tight">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <RotateCcw className="w-4 h-4 text-silvoraa-gold" />
                <span className="text-[10px] font-medium text-silvoraa-warmGray leading-tight">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-silvoraa-gold" />
                <span className="text-[10px] font-medium text-silvoraa-warmGray leading-tight">Authentic 925</span>
              </div>
            </div>

            <ProductDescriptionMain product={product} />

            <SilvoraaStylist productTitle={product.title} stone={product.stone} type={product.type} />

            <ProductDescriptionExtras product={product} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ProductPromiseBanner />
          </div>
          <div>
            <ProductSidebarExtras product={product} />
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={images}
          selectedIndex={selectedImage}
          onClose={() => setIsLightboxOpen(false)}
          onSelect={setSelectedImage}
        />
      )}
    </div>
  );
}
