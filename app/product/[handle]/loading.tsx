export default function ProductLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image gallery skeleton */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-200 rounded-2xl" />
                    <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Product info skeleton */}
                <div className="space-y-6">
                    <div>
                        <div className="h-3 bg-gray-100 rounded w-32 mb-3" />
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-8 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-24" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-full" />
                        <div className="h-4 bg-gray-100 rounded w-2/3" />
                    </div>
                    <div className="h-14 bg-gray-200 rounded-xl w-full" />
                    <div className="h-14 bg-gray-100 rounded-xl w-full" />
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <div className="h-4 bg-gray-100 rounded w-28" />
                                <div className="h-4 bg-gray-100 rounded w-40" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
