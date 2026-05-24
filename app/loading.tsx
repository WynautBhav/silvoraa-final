import { Gem } from 'lucide-react';

export default function RootLoading() {
    return (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-gray-100 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                    <Gem className="w-6 h-6 text-silvoraa-gold" />
                </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-warmGray animate-pulse">
                Loading Silvoraa
            </p>
        </div>
    );
}
