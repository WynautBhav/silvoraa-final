'use client';

import React, { useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface LightboxProps {
    images: string[];
    selectedIndex: number;
    onClose: () => void;
    onSelect: (index: number) => void;
}

// Premium Lightbox Component
export const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, onSelect }) => {

    // Keyboard Navigation & Scroll Lock
    useEffect(() => {
        // Lock body scroll
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onSelect((selectedIndex - 1 + images.length) % images.length);
            if (e.key === 'ArrowRight') onSelect((selectedIndex + 1) % images.length);
        };
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: Unlock scroll and remove listener
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, images.length, onClose, onSelect]);

    return (
        <div
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-3xl flex items-center justify-center animate-in fade-in duration-500"
            onClick={onClose}
        >
            {/* Close Button - Floating & Elegant */}
            <button
                className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md shadow-lg border border-white rounded-full text-silvoraa-black hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 z-50 group"
                onClick={onClose}
                aria-label="Close Zoom"
            >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Main Image Container */}
            <div
                className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-12 flex items-center justify-center"
                onClick={e => e.stopPropagation()}
            >
                <img
                    key={selectedIndex}
                    src={images[selectedIndex]}
                    alt="Zoom view"
                    className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-3xl animate-in zoom-in-95 fade-in duration-500 select-none"
                    style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
                />

                {/* Navigation Arrows (Desktop) */}
                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-full text-silvoraa-black hover:bg-white hover:scale-110 hover:shadow-lg transition-all hidden md:flex group"
                            onClick={(e) => { e.stopPropagation(); onSelect((selectedIndex - 1 + images.length) % images.length); }}
                        >
                            <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-full text-silvoraa-black hover:bg-white hover:scale-110 hover:shadow-lg transition-all hidden md:flex group"
                            onClick={(e) => { e.stopPropagation(); onSelect((selectedIndex + 1) % images.length); }}
                        >
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails Strip - Glass Dock */}
            {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto p-3 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl max-w-[90vw]" onClick={e => e.stopPropagation()}>
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSelect(idx)}
                            className={`relative w-16 h-16 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${idx === selectedIndex ? 'ring-2 ring-silvoraa-gold scale-110 z-10 shadow-lg' : 'opacity-60 hover:opacity-100 hover:scale-105 filter grayscale hover:grayscale-0'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
