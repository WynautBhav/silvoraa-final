import React from 'react';
import { Inter, Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/Cart/CartContext';
import { AuthProvider } from '@/components/Auth/AuthContext';
import { ConfigProvider } from '@/components/Config/ConfigProvider';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: import('next').Metadata = {
  title: {
    default: 'Silvoraa | Premium Gemstone Jewelry',
    template: '%s | Silvoraa',
  },
  description: 'Premium 925 sterling silver gemstone jewelry — Amethyst, Topaz, Citrine, Garnet, and more. Handcrafted with authentic natural stones.',
  metadataBase: new URL('https://www.silvoraa.com'),
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    siteName: 'Silvoraa',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-silvoraa-white text-silvoraa-black font-sans antialiased">
        <AuthProvider>
          <ConfigProvider>
            <CartProvider>
              <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </CartProvider>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}