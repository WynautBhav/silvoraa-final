export default function ShopLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            {/* Header skeleton */}
            <div className="mb-10">
                <div className="h-8 bg-gray-200 rounded w-40 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-64" />
            </div>

            {/* Filters + Grid layout */}
            <div className="flex gap-8">
                {/* Sidebar skeleton */}
                <div className="hidden lg:block w-64 flex-shrink-0 space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
                            <div className="space-y-2">
                                {Array.from({ length: 4 }).map((_, j) => (
                                    <div key={j} className="h-3 bg-gray-100 rounded w-full" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product grid skeleton */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i}>
                            <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-100 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
