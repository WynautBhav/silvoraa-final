'use client';
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/appwrite';
import { processImage, generateFilename } from '@/utils/imageProcessor';
import { X, Upload, Image as ImageIcon, Check, Loader2, Trash2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    bucketName?: string;
}

interface StorageFile {
    name: string;
    id: string;
    url: string;
    created_at?: string;
}

export const MediaManager: React.FC<MediaManagerProps> = ({
    isOpen,
    onClose,
    onSelect,
    bucketName = 'site-assets'
}) => {
    const [files, setFiles] = useState<StorageFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            fetchFiles();
        }
    }, [isOpen]);

    const fetchFiles = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .list('', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            if (error) throw error;

            if (data) {
                const formattedFiles: StorageFile[] = data.map(file => {
                    const { data: { publicUrl } } = supabase.storage
                        .from(bucketName)
                        .getPublicUrl(file.name);

                    return {
                        name: file.name,
                        id: file.name,
                        url: publicUrl,
                        created_at: file.created_at
                    };
                });
                setFiles(formattedFiles);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList || fileList.length === 0) return;

        setIsUploading(true);
        try {
            const originalFile = fileList[0];
            const processedBlob = await processImage(originalFile);
            const newFilename = generateFilename(originalFile.name);

            const { error } = await supabase.storage
                .from(bucketName)
                .upload(newFilename, processedBlob, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'image/webp'
                });

            if (error) throw error;
            await fetchFiles();
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (filename: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const { error } = await supabase.storage
                .from(bucketName)
                .remove([filename]);

            if (error) throw error;
            setFiles(prev => prev.filter(f => f.name !== filename));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                            <h2 className="text-xl font-serif text-gray-900">Media Library</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-4 items-center">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search images..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-silvoraa-gold outline-none"
                                />
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="flex items-center gap-2 px-4 py-2 bg-silvoraa-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Upload New
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-silvoraa-gold animate-spin" />
                                </div>
                            ) : filteredFiles.length === 0 ? (
                                <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                    <p>No images found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {filteredFiles.map((file) => (
                                        <div
                                            key={file.id}
                                            className="group relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-silvoraa-gold transition-colors shadow-sm hover:shadow"
                                            onClick={() => onSelect(file.url)}
                                        >
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />

                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    className="p-2 bg-white text-green-600 rounded-full shadow-lg"
                                                    title="Select"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(file.name, e)}
                                                    className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur px-2 py-1 border-t border-gray-100">
                                                <p className="text-[10px] truncate text-gray-600 font-mono">{file.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
