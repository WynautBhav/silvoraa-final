import type { Metadata } from 'next';
import ShopContent from './shop-content';

export const metadata: Metadata = {
  title: 'Shop All',
  description: 'Browse our complete collection of 925 sterling silver gemstone jewelry — Amethyst, Topaz, Citrine, Garnet, and more. Handcrafted in India.',
  alternates: { canonical: 'https://www.silvoraa.com/shop' },
  openGraph: {
    title: 'Shop All | Silvoraa',
    description: 'Browse our complete collection of 925 sterling silver gemstone jewelry.',
    url: 'https://www.silvoraa.com/shop',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Shop All | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop All | Silvoraa',
    description: 'Browse our complete collection of 925 sterling silver gemstone jewelry.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
