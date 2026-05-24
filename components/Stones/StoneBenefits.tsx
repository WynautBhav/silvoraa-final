"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { STONES } from '@/constants';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from '../UI/SmartImage';

export function StoneBenefits() {
  const [activeStoneIndex, setActiveStoneIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Refs for scroll blocking during programmatic clicks
  const isProgrammaticScroll = useRef(false);

  // Initialize screen size check
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // MANDATORY SNAP TOGGLE (Desktop)
  useEffect(() => {
    if (!isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.documentElement.style.scrollSnapType = 'y mandatory';
          } else {
            document.documentElement.style.scrollSnapType = 'none';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      document.documentElement.style.scrollSnapType = 'none';
      observer.disconnect();
    };
  }, [isDesktop]);

  // SCROLL TRACKING (Desktop)
  useEffect(() => {
    if (!isDesktop) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isProgrammaticScroll.current) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveStoneIndex(index);
            }
          }
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  // MOBILE SCROLL TRACKING
  useEffect(() => {
    if (isDesktop) return; // SKIP for desktop

    const handleMobileScroll = () => {
      if (isProgrammaticScroll.current) return;

      const stickyOffset = 150; // Approx px from top where cards "stick"
      let newActiveIndex = -1;

      itemRefs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= stickyOffset) {
            newActiveIndex = idx;
          }
        }
      });

      if (newActiveIndex !== -1) {
        setActiveStoneIndex(newActiveIndex);
      } else if (window.scrollY < 100) {
        setActiveStoneIndex(0);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleMobileScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleMobileScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  // Handle Card Click (Mobile: Scroll to item; Desktop: Select item)
  const handleCardClick = (index: number) => {
    isProgrammaticScroll.current = true;
    setActiveStoneIndex(index);

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);

    if (!isDesktop) {
      const el = itemRefs.current[index];
      if (el) {
        const offset = 120;
        const rect = el.getBoundingClientRect();
        const currentScroll = window.scrollY;
        const target = currentScroll + rect.top - offset;

        window.scrollTo({
          top: target,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-[#171612]"
      aria-label="Gemstone Benefits Explorer"
    >
      {/* Header Section */}
      <div className={`w-full py-16 md:py-20 text-center bg-white border-b border-gray-100 ${isDesktop ? 'snap-start' : ''}`}>
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-silvoraa-gold block mb-4 text-center"
          >
            Browse by stones
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-silvoraa-black leading-tight mb-4 md:whitespace-nowrap text-center"
          >
            Collections guided by energy. Chosen by intention.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-silvoraa-warmGray text-lg md:text-xl"
          >
            Choose how you want to feel, we'll show you the pieces that match.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row relative">

        {/* LEFT COLUMN: Benefits List */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white z-10 order-1 relative">
          <div className="w-full max-w-lg mx-auto px-6 py-16 pb-[40vh] lg:max-w-none lg:mx-0 lg:px-0 lg:py-0 lg:pb-0">
            <ul className="space-y-4 lg:space-y-0 relative" role="list">
              {STONES.map((stone, idx) => {
                const isActive = idx === activeStoneIndex;
                const handleBenefitClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const slug = stone.stone.toLowerCase().replace(/ /g, '-');
                  router.push(`/collections/${slug}`);
                };

                const handleShopClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const slug = stone.stone.toLowerCase().replace(/ /g, '-');
                  router.push(`/collections/${slug}`);
                };

                return (
                  <li
                    key={stone.id}
                    ref={el => { itemRefs.current[idx] = el; }}
                    data-index={idx}
                    className={`bg-white border-b lg:border-none border-gray-100 last:border-0 transition-all duration-500 
                      sticky top-24 pb-20 mb-20 min-h-[50vh] 
                      lg:static lg:h-screen lg:flex lg:items-center lg:px-6 lg:pl-16 lg:pr-8 xl:pl-32 xl:pr-16 lg:snap-start lg:pb-0 lg:mb-0 lg:min-h-0`}
                  >
                    <button
                      onClick={() => handleCardClick(idx)}
                      className="group flex flex-col w-full text-left outline-none lg:max-w-lg"
                      aria-label={`Select ${stone.stone} for ${stone.benefit}`}
                      aria-current={isActive}
                    >
                      <span
                        onClick={(e) => isActive && handleBenefitClick(e)}
                        className={`text-4xl lg:text-5xl xl:text-7xl font-serif transition-all duration-500 origin-left ${isActive
                          ? 'text-silvoraa-gold font-medium scale-105 cursor-pointer hover:text-silvoraa-deepGold'
                          : 'text-gray-200 hover:text-gray-300'
                          }`}
                        title={isActive ? `Shop ${stone.stone} jewelry` : undefined}
                      >
                        {stone.benefit}
                      </span>

                      {/* MOBILE INLINE IMAGE */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const slug = stone.stone.toLowerCase().replace(/ /g, '-');
                          router.push(`/collections/${slug}`);
                        }}
                        className="lg:hidden w-full h-48 sm:h-64 mt-6 sm:mt-8 mb-2 sm:mb-4 rounded-xl overflow-hidden relative shadow-sm active:scale-[0.98] transition-transform cursor-pointer group/mobile-img"
                      >
                        <SmartImage
                          src={stone.imageUrl}
                          alt={`${stone.stone} texture`}
                          promptSubject={`${stone.stone} gemstone texture, abstract macro photography, ${stone.benefit} mood, luxury editorial style`}
                          type="collection"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/mobile-img:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/mobile-img:bg-black/20 transition-colors" />
                        <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full">
                          <span className="text-[10px] text-white font-bold uppercase tracking-widest">Tap to Explore</span>
                        </div>
                      </div>

                      {/* DESCRIPTION */}
                      <div className={`transition-all duration-500 lg:duration-700 ease-out overflow-hidden ${isActive ? 'max-h-56 lg:max-h-96 opacity-100 mt-4 lg:mt-6' : 'max-h-0 opacity-0'}`}>
                        <p className="text-sm lg:text-lg text-silvoraa-warmGray leading-relaxed max-w-md border-l-2 border-silvoraa-gold pl-4 lg:pl-6 mb-0 lg:mb-8 animate-in fade-in slide-in-from-left-2 duration-500">
                          {stone.description}
                        </p>
                        
                        {/* Mobile Shop Link */}
                        <div
                          role="link"
                          onClick={handleShopClick}
                          className="lg:hidden mt-4 ml-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-silvoraa-black hover:text-silvoraa-gold transition-colors cursor-pointer animate-in fade-in duration-700 delay-100"
                        >
                          Shop {stone.stone} <ArrowRight className="w-3 h-3" />
                        </div>

                        {/* Desktop Shop Link */}
                        <motion.div
                          whileHover={{ x: 10 }}
                          onClick={handleShopClick}
                          className="hidden lg:inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-silvoraa-black cursor-pointer hover:text-silvoraa-gold transition-colors"
                        >
                          Shop {stone.stone} <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Image Carousel (Sticky on Desktop) - HIDDEN ON MOBILE */}
        <div className="hidden lg:flex lg:w-1/2 order-2 bg-gray-50 h-screen sticky top-0 overflow-hidden items-center justify-center">
          <motion.div
             className="w-[70%] absolute left-[15%] right-[15%] top-0"
             animate={{ y: activeStoneIndex === 0 ? "4vh" : `${15 - activeStoneIndex * 75}vh` }}
             transition={{ type: "spring", stiffness: 80, damping: 30 }}
             style={{ display: "flex", flexDirection: "column", gap: "5vh" }}
          >
            {STONES.map((stone, idx) => {
              const isActive = idx === activeStoneIndex;
              return (
                <div
                  key={stone.id}
                  onClick={() => {
                    const slug = stone.stone.toLowerCase().replace(/ /g, '-');
                    router.push(`/collections/${slug}`);
                  }}
                  className="w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-[2.5rem] relative shadow-lg"
                  style={{ height: "70vh" }}
                >
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <SmartImage
                      src={stone.imageUrl}
                      alt={stone.stone}
                      type="collection"
                      promptSubject={stone.stone}
                      className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0 }}>
                      <h2 className="text-3xl lg:text-4xl font-serif mb-3 tracking-wide">{stone.stone}</h2>
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] mb-4 text-silvoraa-gold">
                        <span className="w-1.5 h-1.5 rounded-full bg-silvoraa-gold" />
                        {stone.benefit}
                      </div>
                      <p className="text-base font-light leading-relaxed max-w-sm font-sans text-white/90">
                        {stone.imageOverlayDescription}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          {/* Fade edges to soften the peek */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[4vh] bg-gradient-to-b from-gray-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[4vh] bg-gradient-to-t from-gray-50 to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};
