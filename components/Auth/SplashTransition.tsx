'use client';
import React, { useEffect, useState } from 'react';
import { Gem } from 'lucide-react';

interface SplashProps {
    userName: string;
    onComplete: () => void;
}

export const SplashTransition: React.FC<SplashProps> = ({ userName, onComplete }) => {
    const [phase, setPhase] = useState(0); // 0: Enter, 1: Hold, 2: Exit

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 500);
        const t2 = setTimeout(() => setPhase(2), 2500);
        const t3 = setTimeout(() => onComplete(), 3200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${phase === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            <div className={`scale-100 transition-all duration-1000 ease-out ${phase === 0 ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-xl shadow-silvoraa-gold/10 relative">
                    <div className="absolute inset-0 border border-silvoraa-gold/20 rounded-full animate-ping opacity-20" />
                    <Gem className="w-8 h-8 text-silvoraa-gold" />
                </div>

                <h1 className="text-3xl md:text-4xl font-serif text-silvoraa-black mb-3 text-center">
                    Silvoraa
                </h1>

                <div className="flex items-center justify-center gap-2 text-silvoraa-warmGray text-sm tracking-widest uppercase mb-8">
                    <span className="w-8 h-px bg-silvoraa-gold/30" />
                    <span>Premium Jewelry</span>
                    <span className="w-8 h-px bg-silvoraa-gold/30" />
                </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${phase === 0 ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <p className="font-serif text-xl italic text-silvoraa-black/60">
                    Welcome back, <span className="text-silvoraa-gold not-italic font-bold">{userName}</span>
                </p>
            </div>

            <div className="absolute bottom-12 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-silvoraa-gold w-full origin-left animate-[progress_2.5s_ease-in-out_forwards]" />
            </div>

            <style>{`
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    100% { transform: scaleX(1); }
                }
            `}</style>
        </div>
    );
};
