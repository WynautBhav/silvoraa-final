"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_CONFIG } from '@/constants';

const SLIDES = HERO_CONFIG.slides;

export function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [key, setKey] = useState(0);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
    const DURATION = 5000;

    useEffect(() => {
        const check = () => setViewMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const goToSlide = useCallback((index: number) => {
        setCurrent(index);
        setKey(prev => prev + 1);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
    }, []);

    const nextSlide = useCallback(() => {
        goToSlide((current + 1) % SLIDES.length);
    }, [current, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide((current - 1 + SLIDES.length) % SLIDES.length);
    }, [current, goToSlide]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % SLIDES.length);
            setKey(prev => prev + 1);
        }, DURATION);
        return () => clearInterval(timer);
    }, [isPaused]);

    // const nextSlideIndex = (current + 1) % SLIDES.length;

    return (
        <section 
            className="relative w-full overflow-hidden text-white group bg-silvoraa-black"
            style={{ 
                height: viewMode === 'mobile' ? 'calc(100dvh - 64px)' : 'calc(100dvh - 84px)'
            }}
        >
            {/* Slides */}
            {SLIDES.map((slide, index) => {
                const isActive = index === current;
                const overlay = slide.overlay;

                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'} overflow-hidden`}
                        style={{ backgroundColor: slide.bgColor }}
                    >
                        {/* Aspect ratio container simulating object-cover to preserve coordinate mapping */}
                        <div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
                            style={{ aspectRatio: viewMode === 'mobile' ? '1536/2752' : '1920/1000' }}
                        >
                            {/* Shimmer overlay while image loads */}
                            {!imagesLoaded[slide.id] && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%] z-10" />
                            )}
                            <img
                                src={viewMode === 'mobile' ? (slide.mobileSrc || slide.src) : slide.src}
                                alt={overlay.heading || "Hero Banner"}
                                className="absolute inset-0 w-full h-full object-cover"
                                onLoad={() => setImagesLoaded(prev => ({ ...prev, [slide.id]: true }))}
                            />

                            {/* Button Layer - Exactly matching 1920x1000 pixels coordinates */}
                            {overlay.ctaText && (
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <Link
                                        href={overlay.link || '/shop'}
                                        className="absolute pointer-events-auto hover:opacity-90 transition-all shadow-md"
                                        style={{
                                            left: viewMode === 'mobile' ? `${overlay.ctaPos?.mLeft || '50'}%` : `${overlay.ctaPos?.left || '82'}%`,
                                            top: viewMode === 'mobile' ? `${overlay.ctaPos?.mTop || '88'}%` : `${overlay.ctaPos?.top || '68'}%`,
                                            transform: `translate(${viewMode === 'mobile' ? (overlay.ctaPos?.mTranslateX || '-50') : (overlay.ctaPos?.translateX || '-50')}%, ${viewMode === 'mobile' ? (overlay.ctaPos?.mTranslateY || '-50') : (overlay.ctaPos?.translateY || '-50')}%)`,
                                            backgroundColor: '#000000',
                                            color: '#ffffff',
                                            padding: viewMode === 'mobile' ? '14px 45px' : (index === 0 ? '20px 55px' : (index === 1 ? '18px 50px' : '16px 40px')),
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            letterSpacing: '1.5px',
                                            textTransform: 'uppercase',
                                            whiteSpace: 'nowrap',
                                            fontSize: viewMode === 'mobile' ? '12px' : '14px'
                                        }}
                                    >
                                        SHOP ALL
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Navigation Arrows */}
            <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <button onClick={prevSlide} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-silvoraa-black border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-silvoraa-black transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-auto">
                    <ChevronLeft size={20} />
                </button>
            </div>
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <button onClick={nextSlide} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-silvoraa-black border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-silvoraa-black transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-auto">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Bottom Bar — desktop: dots only, mobile: action chip + dots */}
            <div className="absolute bottom-8 left-0 right-0 z-30 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">

                    {/* Slide dots */}
                    <div className="flex items-center gap-3">
                        {SLIDES.map((_, index) => (
                            <button key={index} onClick={() => goToSlide(index)} className={`relative transition-all duration-300 group/dot ${index === current ? 'w-12 h-3' : 'w-3 h-3'}`}>
                                <span className={`absolute inset-0 rounded-full transition-all duration-300 ${index === current ? 'bg-silvoraa-gold' : 'bg-white/30'}`} />
                                {index === current && !isPaused && (
                                    <span key={`progress-${key}`} className="absolute inset-0 rounded-full bg-white origin-left" style={{ animation: `slideProgress ${DURATION}ms linear forwards` }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fillUp { from { stroke-dashoffset: 88; } to { stroke-dashoffset: 0; } }
                @keyframes slideProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
            `}</style>
        </section>
    );
};
