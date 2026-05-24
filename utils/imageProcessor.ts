/**
 * Utility for client-side image processing.
 * Handles automatic upscaling and WebP conversion before upload.
 */

export const processImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            // Target dimensions
            const TARGET_WIDTH = 2048;
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions (Upscale or Maintain)
            if (width < TARGET_WIDTH) {
                const scaleFactor = TARGET_WIDTH / width;
                width = TARGET_WIDTH;
                height = Math.round(img.height * scaleFactor);
            }

            canvas.width = width;
            canvas.height = height;

            // Apply high-quality smoothing for upscaling
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Draw image to canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to WebP
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Canvas to Blob conversion failed'));
                    }
                },
                'image/webp',
                0.90 // Quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image'));
        };

        img.src = url;
    });
};

export const generateFilename = (originalName: string): string => {
    // Remove extension and append timestamp + .webp
    const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = Date.now();
    return `${baseName}_${timestamp}.webp`;
};
