'use client';

import React, { memo } from 'react';
import { Product } from '@/types';
import { useCart } from '@/components/Cart/CartContext';
import { Plus } from 'lucide-react';
import { SmartImage } from '@/components/UI/SmartImage';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const getStoneColor = (stone: string): string => {
  const colors: Record<string, string> = {
    'Amethyst': '#9B59B6',
    'Rose Amethyst': '#C2709D',
    'Citrine': '#E2A820',
    'Garnet': '#C0392B',
    'Iolite': '#4A6FA5',
    'Lapis Lazuli': '#1F3D7A',
    'Blue Topaz': '#2980B9',
    'Sky Blue Topaz': '#5DADE2',
    'Lemon Topaz': '#F4D03F',
    'Topaz': '#D4AC0D',
    'Tourmaline': '#1ABC9C',
    'Cubic Zirconia': '#85929E',
    'Rose Quartz': '#F1948A',
    'Labradorite': '#5D6D7E',
    'Opal': '#A9CCE3',
    'Emerald': '#27AE60',
  };
  return colors[stone] || '#8E8E8E';
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article
      className="group cursor-pointer flex flex-col h-full bg-white rounded-t-sm"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden mb-4 bg-gray-50 rounded-sm">
        <SmartImage
          src={product.image}
          alt={product.title}
          promptSubject={`${product.title}, featuring ${product.stone} gemstone. Benefits: ${product.benefits.join(', ')}`}
          type="product"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
        />
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-4 right-4 bg-white text-silvoraa-black p-3 rounded-full shadow-lg opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 hover:bg-silvoraa-gold hover:text-white z-20 focus:opacity-100 focus:translate-y-0"
          title="Quick Add"
          aria-label={`Quick add ${product.title} to cart`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col flex-grow text-center group-hover:opacity-75 transition-opacity duration-300">
        <h3 className="font-serif text-xl text-silvoraa-black mb-1 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm font-sans uppercase tracking-widest mb-2" style={{ color: getStoneColor(product.stone) }}>
          {product.stone}
        </p>
        <span className="font-display font-semibold text-silvoraa-black">
          {product.price > 0 ? `₹${product.price.toFixed(2)}` : 'Price on request'}
        </span>
      </div>
    </article>
  );
}

export default memo(ProductCard);

