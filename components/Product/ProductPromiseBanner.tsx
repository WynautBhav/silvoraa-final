import React from 'react';
import { ShieldCheck, Gem, Truck, RotateCcw, Award, CheckCircle2, Heart } from 'lucide-react';

export const ProductPromiseBanner: React.FC = () => {
    return (
        <div className="w-full mt-10 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="relative bg-[#FAF9F6] rounded-3xl p-5 md:p-8 overflow-hidden border border-[#E6E1D6]">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-silvoraa-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                    {/* Item 1 */}
                    <div className="flex flex-col items-center text-center space-y-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-silvoraa-gold group-hover:scale-110 group-hover:bg-silvoraa-gold group-hover:text-white transition-all duration-500">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-silvoraa-black mb-1">Authentic 925 Sterling Silver</h3>
                            <p className="text-xs text-silvoraa-warmGray leading-relaxed max-w-xs mx-auto">
                                Every piece is stamped and certified pure. We verify every shipment for quality assurance.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center text-center space-y-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-700 group-hover:scale-110 group-hover:bg-purple-700 group-hover:text-white transition-all duration-500">
                            <Gem className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-silvoraa-black mb-1">Natural & Ethically Sourced</h3>
                            <p className="text-xs text-silvoraa-warmGray leading-relaxed max-w-xs mx-auto">
                                Real gemstones, mined responsibly. No synthetics, just earth's natural beauty.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center text-center space-y-3 group">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-silvoraa-gold group-hover:scale-110 group-hover:bg-silvoraa-gold group-hover:text-white transition-all duration-500">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-silvoraa-black mb-1">Crafted with Meaning</h3>
                            <p className="text-xs text-silvoraa-warmGray leading-relaxed max-w-xs mx-auto">
                                Made by skilled artisans, finished with care and purpose.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
