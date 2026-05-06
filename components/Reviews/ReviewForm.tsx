'use client';
import React, { useState } from 'react';
import { Star, Upload, X } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthContext';
import { supabase } from '@/lib/appwrite';

interface ReviewFormProps {
    productId?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess, onCancel }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!user) return null;

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        setError(null);
        const files = Array.from(e.target.files);

        try {
            const uploadPromises = files.map(async (file: File) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `reviews/${user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath);

                return data.publicUrl;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            setImages(prev => [...prev, ...uploadedUrls]);
        } catch (err: any) {
            setError('Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) { setError('Please select a rating'); return; }

        setSubmitting(true);
        setError(null);

        try {
            const { error: insertError } = await supabase
                .from('reviews')
                .insert({ product_id: productId || null, user_id: user.id, rating, title, comment, images });

            if (insertError) throw insertError;

            setTitle(''); setComment(''); setRating(0); setImages([]);
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError('Failed to submit review. ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-gray-900">Write a Review</h3>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                )}
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                size={24}
                                className={`${star <= (hoverRating || rating) ? 'fill-silvoraa-gold text-silvoraa-gold' : 'text-gray-300'} transition-colors`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-silvoraa-gold focus:border-silvoraa-gold outline-none"
                    placeholder="Summarize your experience"
                    maxLength={100}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-silvoraa-gold focus:border-silvoraa-gold outline-none resize-none"
                    placeholder="What did you like or dislike?"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Photos</label>
                <div className="flex flex-wrap gap-3 mb-3">
                    {images.map((url, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                            <img src={url} alt={`Review ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                                className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl hover:bg-red-600"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-silvoraa-gold hover:bg-gray-50 transition-colors">
                        <Upload size={20} className="text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Upload</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                </div>
                {uploading && <p className="text-xs text-gray-500 animate-pulse">Uploading...</p>}
            </div>

            <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full bg-silvoraa-gold text-white py-3 rounded hover:bg-yellow-600 transition-colors disabled:opacity-50 font-medium tracking-wide"
            >
                {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};
