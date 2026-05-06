'use client';

import React, { useState } from 'react';
import { ID } from 'appwrite';
import { APPWRITE_CONFIG, storage } from '@/lib/appwrite';

interface ImageUploadButtonProps {
    label: string;
    onUpload: (url: string) => void;
    maxSizeKB?: number;
    currentUrl?: string;
    filePrefix?: string;
}

const getFileExtension = (name: string): string => {
    const parts = name.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'jpg';
};

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
    label,
    onUpload,
    maxSizeKB,
    currentUrl,
    filePrefix = 'hero-image',
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState<string>('');

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage('Please choose a valid image file.');
            return;
        }

        if (maxSizeKB && file.size > maxSizeKB * 1024) {
            setMessage(`Warning: file is larger than ${maxSizeKB}KB. Uploading anyway.`);
        } else {
            setMessage('');
        }

        setIsUploading(true);

        try {
            const ext = getFileExtension(file.name);
            const timestamp = Date.now();
            const renamed = new File([file], `${filePrefix}-${timestamp}.${ext}`, { type: file.type });
            const fileId = ID.unique();

            await storage.createFile(APPWRITE_CONFIG.bucketId, fileId, renamed);
            const publicUrl = storage.getFileView(APPWRITE_CONFIG.bucketId, fileId).toString();
            onUpload(publicUrl);
            setMessage('Uploaded successfully.');
        } catch (error) {
            console.error('Image upload failed:', error);
            setMessage('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center rounded-md bg-silvoraa-black px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gray-800">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFile}
                        disabled={isUploading}
                    />
                    {isUploading ? 'Uploading...' : label}
                </label>
                {currentUrl && (
                    <a
                        href={currentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Open current
                    </a>
                )}
            </div>
            {message && <p className="text-xs text-gray-600">{message}</p>}
        </div>
    );
};
