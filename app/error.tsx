'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-serif text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-md">
                {error.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <div className="flex gap-3">
                <button
                    onClick={reset}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-silvoraa-black hover:bg-gray-800 rounded-lg transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
}
