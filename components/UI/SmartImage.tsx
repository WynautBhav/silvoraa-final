'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  promptSubject: string;
  type?: 'product' | 'collection';
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src: initialSrc,
  alt,
  className,
  promptSubject,
  type = 'product',
  ...props
}) => {
  const [src, setSrc] = useState<string | undefined>(typeof initialSrc === 'string' ? initialSrc : undefined);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'generating' | 'error'>('loading');

  useEffect(() => {
    setSrc(typeof initialSrc === 'string' ? initialSrc : undefined);
    setStatus('loading');
  }, [initialSrc]);

const handleError = async () => {
    // If we are already generating or have a generated image, don't loop
    if (status === 'generating' || src?.startsWith('data:')) return;

    setStatus('generating');

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: promptSubject, type }),
      });
      const data = await res.json();
      if (data.image) {
        setSrc(data.image);
        setStatus('loaded');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className={`relative overflow-hidden bg-silvoraa-softWhite ${className}`}>
      {/* Image Element */}
      {src && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setStatus('loaded')}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}

      {/* Generating State Overlay ONLY (No spinner for standard loading) */}
      {(status === 'generating') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-silvoraa-lightGray border-t-silvoraa-gold rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-silvoraa-gold animate-pulse" />
            </div>
          </div>
          <span className="mt-4 text-[10px] uppercase tracking-widest text-silvoraa-gold animate-pulse font-bold">
            AI Curating Asset...
          </span>
        </div>
      )}

      {/* Fallback Error State */}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-silvoraa-warmGray text-xs uppercase tracking-widest">
          Image Unavailable
        </div>
      )}
    </div>
  );
};
