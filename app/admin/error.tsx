'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[Admin Error]', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin panel error</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">
                {error.message || 'An error occurred in the admin panel.'}
            </p>
            <div className="flex gap-3">
                <button
                    onClick={reset}
                    className="px-5 py-2 text-sm font-medium text-white bg-silvoraa-black hover:bg-gray-800 rounded-lg transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/admin/dashboard"
                    className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Dashboard
                </Link>
            </div>
        </div>
    );
}
