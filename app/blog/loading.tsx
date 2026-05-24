export default function BlogLoading() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            <div className="text-center mb-12">
                <div className="h-8 bg-gray-200 rounded w-40 mx-auto mb-3" />
                <div className="h-4 bg-gray-100 rounded w-80 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                        <div className="aspect-video bg-gray-200" />
                        <div className="p-6 space-y-3">
                            <div className="h-3 bg-gray-100 rounded w-24" />
                            <div className="h-5 bg-gray-200 rounded w-full" />
                            <div className="h-5 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-100 rounded w-full" />
                            <div className="h-4 bg-gray-100 rounded w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
