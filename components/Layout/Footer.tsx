"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useSiteConfig } from '@/components/Config/ConfigProvider';
import { NewsletterForm } from '@/components/Newsletter/NewsletterForm';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const contactEmail = useSiteConfig('contact_email', 'support@silvoraa.com');
    // const contactPhone = useSiteConfig('contact_phone', '+91 98765 43210');

    return (
        <footer className="bg-silvoraa-black text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="font-serif text-3xl mb-6 block">
                            Silvoraa
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Accessible luxury in gemstone jewelry. Crafted with intention, designed for the soul.
                        </p>
                        <address className="text-gray-400 text-sm not-italic mb-2">
                            Silvoraa Jewelry, Jaipur, Rajasthan, India
                        </address>
                        <a href="mailto:silvoraa.work@gmail.com" className="text-silvoraa-gold text-sm hover:underline mb-6 block">
                            silvoraa.work@gmail.com
                        </a>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-silvoraa-gold transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-silvoraa-gold transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-silvoraa-gold transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-silvoraa-gold transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-6">
                            Shop
                        </h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li>
                                <Link href="/shop" className="hover:text-silvoraa-gold transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections" className="hover:text-silvoraa-gold transition-colors">
                                    Shop by Stone
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?type=Ring" className="hover:text-silvoraa-gold transition-colors">
                                    Rings
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?type=Pendant" className="hover:text-silvoraa-gold transition-colors">
                                    Pendants
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?type=Earrings" className="hover:text-silvoraa-gold transition-colors">
                                    Earrings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About Links */}
                    <div>
                        <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-6">
                            About
                        </h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-silvoraa-gold transition-colors">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/authenticity" className="hover:text-silvoraa-gold transition-colors">
                                    Authenticity
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#sustainability" className="hover:text-silvoraa-gold transition-colors">
                                    Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections" className="hover:text-silvoraa-gold transition-colors">
                                    Gemstone Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-silvoraa-gold transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-silvoraa-gold transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-silvoraa-gold transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-silvoraa-gold transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-silvoraa-gold transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-silvoraa-gold transition-colors">
                                    Refunds & Returns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-sans font-bold uppercase tracking-widest text-sm mb-6">
                            Newsletter
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Join our list for exclusive drops and styling tips.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-xs">
                            &copy; {currentYear} Silvoraa Jewelry. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
