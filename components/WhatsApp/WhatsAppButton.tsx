'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { GLOBAL_CONFIG } from '@/constants';

export const WhatsAppButton: React.FC = () => {
  const { number, defaultMessage, buttonPosition, visibleOn } = GLOBAL_CONFIG.whatsapp;

  const cleanNumber = number.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(defaultMessage);
  const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  const positionClasses = buttonPosition === 'bottom-right'
    ? 'bottom-6 right-6'
    : 'bottom-6 left-6';

  if (visibleOn !== 'all') return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${positionClasses} z-[60] bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-[0_4px_16px_rgba(37,211,102,0.4)] transition-all duration-200 hover:scale-110 flex items-center justify-center`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};
