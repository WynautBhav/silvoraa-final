'use client';
import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`${sizeClasses[size]} border-2 border-gray-200 border-t-silvoraa-gold rounded-full animate-spin`}
            />
        </div>
    );
};

// Product skeleton for loading states
export const ProductSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
);

// Grid of product skeletons
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <ProductSkeleton key={i} />
        ))}
    </div>
);

// Full page loading state
export const PageLoader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 text-sm">{message}</p>
    </div>
);
