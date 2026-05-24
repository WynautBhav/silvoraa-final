"use client";
import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export function ConsultationCTA() {
    return (
        <section className="py-12 md:py-20 px-4 md:px-6 bg-silvoraa-softWhite border-t border-gray-100">
            <div className="container mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-silvoraa-black text-white p-6 md:p-12 lg:p-16">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-silvoraa-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-silvoraa-gold/5 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-silvoraa-gold mb-6 backdrop-blur-sm">
                                <Calendar className="w-3.5 h-3.5" />
                                Personal Styling
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 leading-tight">
                                Not sure what to wear?
                            </h2>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
                                Book a comprehensive consultation with our expert stylists to find the perfect stones and pieces for your energy.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <Link
                                href="/book-consultation"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-silvoraa-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-silvoraa-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Book Consultation
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
