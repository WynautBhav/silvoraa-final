'use client';
import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, User } from 'lucide-react';
import { supabase } from '@/lib/appwrite';

interface ReviewListProps {
    productId?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [avgRating, setAvgRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                let query = supabase
                    .from('reviews')
                    .select('*, profiles:user_id ( full_name )');

                if (productId) query = query.eq('product_id', productId);

                const { data, error } = await query.order('created_at', { ascending: false }).limit(20);
                if (error) throw error;

                setReviews(data || []);
                if (data && data.length > 0) {
                    setTotalReviews(data.length);
                    setAvgRating(data.reduce((acc, r) => acc + r.rating, 0) / data.length);
                }
            } catch (err) {
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    if (loading) return <div className="text-center py-8 text-gray-500">Loading reviews...</div>;

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No Reviews Yet</h3>
                <p className="text-gray-500 mb-6">Be the first to review this product!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                    <div className="text-4xl font-serif text-gray-900">{avgRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center gap-0.5 my-1">
                        {[1, 2, 3, 4, 5].map(st => (
                            <Star key={st} size={14} className={`${st <= Math.round(avgRating) ? 'fill-silvoraa-gold text-silvoraa-gold' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500">{totalReviews} Reviews</p>
                </div>
                <div className="flex-1 border-l border-gray-200 pl-6 hidden md:block">
                    <h4 className="font-medium text-sm mb-2 text-gray-700">Rating Breakdown</h4>
                    {[5, 4, 3, 2, 1].map(r => {
                        const count = reviews.filter(rv => rv.rating === r).length;
                        const pct = (count / totalReviews) * 100;
                        return (
                            <div key={r} className="flex items-center gap-2 mb-1">
                                <span className="text-xs w-3 text-gray-500">{r}</span>
                                <Star size={10} className="text-gray-400" />
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-silvoraa-gold" style={{ width: `${pct}%` }}></div>
                                </div>
                                <span className="text-xs w-6 text-right text-gray-400">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <User size={14} />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-900 block leading-tight">
                                        {review.profiles?.full_name || 'Anonymous User'}
                                    </span>
                                    {review.is_verified_purchase && (
                                        <span className="text-xs text-green-600 flex items-center gap-0.5">
                                            <CheckCircle size={10} /> Verified Purchase
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">
                                {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={`${i < review.rating ? 'fill-silvoraa-gold text-silvoraa-gold' : 'text-gray-300'}`} />
                            ))}
                            {review.title && <span className="text-sm font-medium text-gray-800 ml-2">{review.title}</span>}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {review.images.map((img: string, idx: number) => (
                                    <img key={idx} src={img} alt={`Review attachment ${idx}`} className="w-20 h-20 object-cover rounded border border-gray-100 cursor-pointer hover:opacity-90" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
