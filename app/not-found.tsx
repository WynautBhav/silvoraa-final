"use client";
import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen pt-24 bg-white flex items-center justify-center">
            <div className="text-center px-6 max-w-lg">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <span className="text-[200px] font-serif text-gray-100 select-none leading-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-silvoraa-gold/10 rounded-full flex items-center justify-center">
                            <Search className="w-12 h-12 text-silvoraa-gold" />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif text-silvoraa-black mb-4">
                    Page Not Found
                </h1>

                <p className="text-silvoraa-warmGray mb-8 leading-relaxed">
                    The page you're looking for seems to have wandered off like a lost gemstone.
                    Let's help you find your way back to our collection.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 bg-silvoraa-black text-white uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>

                    <Link
                        href="/shop"
                        className="flex items-center gap-2 px-8 py-4 border border-silvoraa-black text-silvoraa-black uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-black hover:text-white transition-colors"
                    >
                        Browse Shop
                    </Link>
                </div>

                <button
                    onClick={() => window.history.back()}
                    className="mt-8 inline-flex items-center gap-2 text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Go Back</span>
                </button>
            </div>
        </div>
    );
};

