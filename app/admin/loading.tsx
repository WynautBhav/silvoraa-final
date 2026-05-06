export default function AdminLoading() {
    return (
        <div className="animate-pulse space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-7 bg-gray-200 rounded w-48 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-72" />
                </div>
                <div className="h-10 bg-gray-200 rounded-lg w-36" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
                        <div className="h-4 bg-gray-100 rounded w-24 mb-4" />
                        <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-32" />
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                    <div className="h-5 bg-gray-200 rounded w-36" />
                </div>
                <div className="divide-y divide-gray-50">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="px-5 py-4 flex items-center gap-4">
                            <div className="h-4 bg-gray-100 rounded w-32" />
                            <div className="h-4 bg-gray-100 rounded flex-1" />
                            <div className="h-6 bg-gray-100 rounded w-20" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
