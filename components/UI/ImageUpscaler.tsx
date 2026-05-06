'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Scan, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImageUpscalerProps {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export const ImageUpscaler: React.FC<ImageUpscalerProps> = ({ images, initialIndex, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isEnhancing, setIsEnhancing] = useState(true);

    // Derived current image
    const src = images[currentIndex];

    // Reset animation when slide changes
    useEffect(() => {
        if (isOpen) {
            setIsEnhancing(true);

            // Simulation of AI Upscaling process
            const timer = setTimeout(() => {
                setIsEnhancing(false);
            }, 800); // Faster 0.8s for navigation flow

            return () => clearTimeout(timer);
        }
    }, [isOpen, currentIndex]);

    // Navigation Handlers
    const nextImage = React.useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = React.useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Handle Keyboard
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, nextImage, prevImage]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                >
                    {/* Controls */}
                    <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={onClose}
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </div>



                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-all z-50"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-all z-50"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full max-w-[95vw] max-h-[90vh] flex items-center justify-center p-4 content-box"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            key={currentIndex} // Key change triggers generic re-animation
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative overflow-hidden rounded-lg shadow-2xl"
                        >
                            {/* The Image */}
                            <img
                                src={src}
                                alt="Zoomed view"
                                className="max-w-full max-h-[85vh] object-contain"
                            />

                            {/* Scanning Effect Overlay */}
                            <AnimatePresence>
                                {isEnhancing && (
                                    <>
                                        {/* Scan Line */}
                                        <motion.div
                                            initial={{ top: "0%" }}
                                            animate={{ top: "100%" }}
                                            transition={{
                                                duration: 0.8,
                                                ease: "linear",
                                                repeat: 0
                                            }}
                                            className="absolute left-0 right-0 h-1 bg-silvoraa-gold/80 shadow-[0_0_20px_rgba(212,175,55,0.8)] z-20"
                                        />

                                        {/* Digital Noise / Grid Overlay */}
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none mix-blend-overlay" />

                                        {/* Blue Tint Tint */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-blue-500/10 mix-blend-color-dodge z-10"
                                        />
                                    </>
                                )}
                            </AnimatePresence>

                            {/* Shine Flash on Completion */}
                            <AnimatePresence>
                                {!isEnhancing && (
                                    <motion.div
                                        initial={{ opacity: 0.8, x: '-100%' }}
                                        animate={{ opacity: 0, x: '200%' }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent z-30 pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </div>



                    {/* Pagination Dots */}
                    <div className="absolute bottom-8 w-full flex justify-center">
                        {images.length > 1 && (
                            <div className="flex gap-2">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-silvoraa-gold w-4' : 'bg-white/20 hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
