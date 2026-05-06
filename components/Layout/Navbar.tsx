"use client";
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Sparkles, ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/Cart/CartContext';
import { useAuth } from '@/components/Auth/AuthContext';
import { NAV_CONFIG, MOTION, STONES } from '@/constants';
import { StoneType } from '@/types';

import { SmartSearch } from './SmartSearch';

interface NavbarProps {
  onOpenStylist: () => void;
}

export function Navbar({ onOpenStylist }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'type' | 'stone' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isHomepage = pathname === '/' || pathname === '';

  // Always show solid navbar — keeps brand visible while hero fills 100dvh behind it
  const showSolidNav = true;

  // Optimized Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > NAV_CONFIG.scrollThreshold;
          setIsScrolled((prev) => prev !== scrolled ? scrolled : prev);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const config = NAV_CONFIG;
  const { pill, mobile, padding } = config;

  // Check if a link is active
  const isActiveLink = (path: string, exact = false) => {
    if (path === '/') return pathname === '/';
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  // Popular stone collections for dropdown
  const popularStones = [
    StoneType.AMETHYST,
    StoneType.CITRINE,
    StoneType.TOPAZ,
    StoneType.LAPIS,
    StoneType.GARNET,
    StoneType.TOURMALINE,
    StoneType.OPAL
  ];

  // Navbar styles - sticky on load (in document flow), fixed pill on scroll
  const containerStyle: React.CSSProperties = {
    // sticky keeps it in document flow → content naturally starts below it
    // fixed (pill) only kicks in after user scrolls
    position: isScrolled ? 'fixed' : 'sticky',
    zIndex: 50,

    // Pill mode: float at top with spacing
    top: isScrolled ? '16px' : '0px',
    left: isScrolled ? '50%' : '0',
    width: isScrolled ? 'var(--nav-width)' : '100%',
    maxWidth: isScrolled ? pill.maxWidth : '100%',
    padding: isScrolled ? 'var(--nav-padding-scrolled)' : `${padding.top.y}px ${padding.top.x}px`,
    borderRadius: isScrolled ? 'var(--nav-radius)' : '0px',
    transform: isScrolled ? 'translateX(-50%)' : 'none',

    // Glass effect — always white/frosted
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: isScrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
    borderBottom: isScrolled ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',

    // Shadow
    boxShadow: isScrolled
      ? '0 4px 30px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.05)'
      : '0 1px 4px rgba(0, 0, 0, 0.04)',

    // Smooth transitions
    transition: `
      top ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      left ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      width ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      max-width ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      padding ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      border-radius ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      background-color ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      border ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      box-shadow ${MOTION.duration.normal}ms ${MOTION.easing.premium},
      transform ${MOTION.duration.normal}ms ${MOTION.easing.premium}
    `,
  };

  // Always dark text since background is always white now
  const textColorClass = 'text-silvoraa-black';
  const hoverColorClass = 'hover:text-silvoraa-gold';

  return (
    <>
      <style>{`
        :root {
          --nav-width: ${pill.maxWidth};
          --nav-radius: ${pill.borderRadius}px;
          --nav-padding-scrolled: ${padding.scrolled.y}px ${padding.scrolled.x}px;
        }
        @media (max-width: 768px) {
          :root {
            --nav-width: ${mobile.width};
            --nav-radius: ${mobile.borderRadius}px;
            --nav-padding-scrolled: ${mobile.padding.y}px ${mobile.padding.x}px;
          }
        }
        
        /* Premium dropdown animation */
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .dropdown-enter {
          animation: dropdownFadeIn 200ms ease-out forwards;
        }
        
        /* Premium logo text shimmer animation */
        @keyframes logoShimmer {
          0% { 
            background-position: -200% center;
          }
          100% { 
            background-position: 200% center;
          }
        }
        
        .logo-animated {
          background: linear-gradient(
            90deg,
            currentColor 0%,
            currentColor 40%,
            #D4AF37 50%,
            currentColor 60%,
            currentColor 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logoShimmer 4s ease-in-out infinite;
        }
      `}</style>

      <nav style={containerStyle} className="flex items-center justify-between">

        {/* Left: Mobile Hamburger */}
        <button
          className={`lg:hidden transition-colors duration-300 ${textColorClass} ${hoverColorClass} p-1`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Left: Desktop Logo */}
        <Link
          href="/"
          className={`hidden lg:block font-serif text-2xl lg:text-3xl font-semibold tracking-tight transition-all duration-300 ${textColorClass} hover:opacity-80 logo-animated`}
        >
          Silvoraa.
        </Link>

        {/* Center: Mobile Logo */}
        <Link
          href="/"
          className={`lg:hidden font-serif text-2xl font-semibold tracking-tight transition-colors duration-300 ${textColorClass} logo-animated`}
        >
          Silvoraa.
        </Link>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          <Link
            href="/shop"
            className={`font-sans text-sm font-medium uppercase tracking-wider relative group transition-colors duration-300 ${textColorClass} ${hoverColorClass} ${isActiveLink('/shop', true) ? 'text-silvoraa-gold' : ''}`}
          >
            Shop All
            <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-silvoraa-gold transition-all duration-300 ${isActiveLink('/shop', true) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>

          {/* Shop by Type Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'type' ? null : 'type');
              }}
              className={`font-sans text-sm font-medium uppercase tracking-wider relative group flex items-center gap-1.5 transition-colors duration-300 ${textColorClass} ${hoverColorClass} ${pathname.startsWith('/shop/') ? 'text-silvoraa-gold' : ''}`}
            >
              Shop by Type
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-silvoraa-gold transition-all duration-300 ${pathname.startsWith('/shop/') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === 'type' && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden dropdown-enter"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Categories
                  </p>
                  {[
                    { label: 'Rings', value: 'Ring' },
                    { label: 'Pendants', value: 'Pendant' },
                    { label: 'Bracelets', value: 'Bracelet' },
                    { label: 'Earrings', value: 'Earrings' },
                    { label: 'Nose Rings', value: 'Nose Ring' }
                  ].map(cat => (
                    <Link
                      key={cat.value}
                      href={`/shop/${cat.value.toLowerCase().replace(/ /g, '-')}`}
                      className="block px-4 py-2.5 text-sm text-silvoraa-warmGray hover:bg-silvoraa-gold/10 hover:text-silvoraa-gold transition-colors rounded-md font-medium"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop by Stone Dropdown (formerly Collections) */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'stone' ? null : 'stone');
              }}
              className={`font-sans text-sm font-medium uppercase tracking-wider relative group flex items-center gap-1.5 transition-colors duration-300 ${textColorClass} ${hoverColorClass} ${isActiveLink('/collections') ? 'text-silvoraa-gold' : ''}`}
            >
              Shop by Stone
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'stone' ? 'rotate-180' : ''}`} />
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-silvoraa-gold transition-all duration-300 ${isActiveLink('/collections') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === 'stone' && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden dropdown-enter"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  <Link
                    href="/collections"
                    className="block px-4 py-3 text-sm font-bold text-silvoraa-black hover:bg-silvoraa-gold/10 hover:text-silvoraa-gold transition-colors rounded-md"
                  >
                    View All Stones
                  </Link>
                </div>
                <div className="border-t border-gray-100 p-2">
                  <div className="grid grid-cols-2 gap-1 pt-2">
                        {popularStones.map(stone => (
                          <Link
                            key={stone}
                            href={`/collections/${stone === StoneType.OPAL ? 'opal' : stone.toLowerCase().replace(/ /g, '-')}`}
                            className="block text-sm text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors font-medium whitespace-nowrap"
                          >
                            {stone}
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`font-sans text-sm font-medium uppercase tracking-wider relative group transition-colors duration-300 ${textColorClass} ${hoverColorClass} ${isActiveLink('/about') ? 'text-silvoraa-gold' : ''}`}
          >
            Our Story
            <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-silvoraa-gold transition-all duration-300 ${isActiveLink('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
        </div>

        {/* Right: Icons */}
        <div className={`flex items-center space-x-3 lg:space-x-5 transition-colors duration-300 ${textColorClass}`}>
          <button
            onClick={onOpenStylist}
            className={`transition-all flex items-center gap-2 group ${hoverColorClass} p-1.5 rounded-full hover:bg-silvoraa-gold/10`}
            title="Ask AI Stylist"
            aria-label="Ask AI Stylist"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className={`transition-all ${hoverColorClass} p-1.5 rounded-full hover:bg-silvoraa-gold/10`}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleCart}
            className={`transition-all relative ${hoverColorClass} p-1.5 rounded-full hover:bg-silvoraa-gold/10`}
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-silvoraa-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-200">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative group">
              <button
                className={`hidden md:flex transition-all ${hoverColorClass} p-1.5 rounded-full hover:bg-silvoraa-gold/10 items-center gap-2`}
                aria-label="Account"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-gray-200" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {/* Account Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                <div className="p-4 border-b border-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                  <p className="font-medium text-silvoraa-black truncate">{user.name}</p>
                </div>

                {/* Admin Link */}
                {['vaibhav.silvoraa@gmail.com', 'sid.silvoraa@gmail.com'].includes(user.email || '') && (
                  <div className="p-2 border-b border-gray-50">
                    <Link href="/admin" className="block px-3 py-2 text-sm text-silvoraa-black hover:bg-gray-50 rounded-lg transition-colors font-medium">
                      Admin Console
                    </Link>
                  </div>
                )}
                <div className="p-2 border-b border-gray-50">
                  <Link href="/account" className="block px-3 py-2 text-sm text-silvoraa-black hover:bg-gray-50 rounded-lg transition-colors font-medium">
                    My Collection
                  </Link>
                </div>
                <div className="p-2">
                  <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/auth"
              className={`hidden md:flex transition-all ${hoverColorClass} p-1.5 rounded-full hover:bg-silvoraa-gold/10 items-center gap-2 font-medium text-sm`}
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav >

      {/* Mobile Menu Overlay - Premium Design */}
      < div className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`
      }>
        <div className={`flex flex-col h-full pt-24 pb-8 px-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-8'}`}>


          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-start space-y-6 overflow-y-auto pb-4 custom-scrollbar">
            <Link
              href="/shop"
              className={`font-serif text-4xl transition-colors ${isActiveLink('/shop', true) ? 'text-silvoraa-gold' : 'text-silvoraa-black hover:text-silvoraa-gold'}`}
            >
              Shop All
            </Link>

            {/* Mobile Shop by Type */}
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'type' ? null : 'type');
                }}
                className={`font-serif text-4xl text-left transition-colors flex items-center justify-between ${pathname.startsWith('/shop/') || activeDropdown === 'type' ? 'text-silvoraa-gold' : 'text-silvoraa-black hover:text-silvoraa-gold'}`}
              >
                Shop by Type
                <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'type' && (
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-silvoraa-gold/30 animate-in slide-in-from-top-2 fade-in duration-300">
                  {[
                    { label: 'Rings', value: 'Ring' },
                    { label: 'Pendants', value: 'Pendant' },
                    { label: 'Bracelets', value: 'Bracelet' },
                    { label: 'Earrings', value: 'Earrings' },
                    { label: 'Nose Rings', value: 'Nose Ring' }
                  ].map(cat => (
                    <Link
                      key={cat.value}
                      href={`/shop/${cat.value.toLowerCase().replace(/ /g, '-')}`}
                      className="font-serif text-2xl text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Shop by Stone */}
            <div className="flex flex-col gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'stone' ? null : 'stone');
                }}
                className={`font-serif text-4xl text-left transition-colors flex items-center justify-between ${isActiveLink('/collections') || activeDropdown === 'stone' ? 'text-silvoraa-gold' : 'text-silvoraa-black hover:text-silvoraa-gold'}`}
              >
                Shop by Stone
                <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'stone' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'stone' && (
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-silvoraa-gold/30 animate-in slide-in-from-top-2 fade-in duration-300">
                  <Link
                    href="/collections"
                    className="font-serif text-2xl text-silvoraa-black font-bold hover:text-silvoraa-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View All Stones
                  </Link>
                  <div className="grid grid-cols-1 gap-4">
                    {popularStones.map(stone => (
                      <Link
                        key={stone}
                        href={`/collections/${stone === StoneType.OPAL ? 'opal' : stone.toLowerCase().replace(/ /g, '-')}`}
                        className="font-serif text-2xl text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {stone}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className={`font-serif text-4xl transition-colors ${isActiveLink('/about') ? 'text-silvoraa-gold' : 'text-silvoraa-black hover:text-silvoraa-gold'}`}
            >
              Our Story
            </Link>
          </div>

          {/* AI Stylist CTA */}
          <div className="pt-8 border-t border-gray-100 flex flex-col gap-6">
            <button
              onClick={() => { setIsMobileMenuOpen(false); onOpenStylist(); }}
              className="flex items-center gap-3 text-silvoraa-gold font-bold uppercase tracking-widest text-lg hover:opacity-80 transition-opacity"
            >
              <Sparkles className="w-6 h-6" />
              AI Personal Stylist
            </button>
            
            {/* Mobile Auth Button */}
            {user ? (
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-silvoraa-black" />
                    </div>
                  )}
                  <span className="font-bold text-silvoraa-black">{user.name}</span>
                </div>
                
                {['vaibhav.silvoraa@gmail.com', 'sid.silvoraa@gmail.com'].includes(user.email || '') && (
                  <Link 
                    href="/admin" 
                    className="text-silvoraa-warmGray font-medium text-lg hover:text-silvoraa-black transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Console
                  </Link>
                )}
                
                <Link 
                  href="/account" 
                  className="text-silvoraa-warmGray font-medium text-lg hover:text-silvoraa-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Collection
                </Link>
                
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-red-500 font-medium text-lg mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-silvoraa-black font-bold uppercase tracking-widest text-lg hover:text-silvoraa-gold transition-colors pt-4 border-t border-gray-50"
              >
                <User className="w-6 h-6" />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div >
      {/* Smart Search Overlay */}
      < SmartSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};