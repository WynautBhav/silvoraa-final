import type { Metadata } from 'next';
import ShopContent from './shop-content';

export const metadata: Metadata = {
  title: 'Shop All | Silvoraa',
  description: 'Browse our complete collection of 925 sterling silver gemstone jewelry. Discover handcrafted rings, earrings, pendants, and bracelets with Amethyst, Citrine, Topaz, and more.',
  alternates: { canonical: 'https://www.silvoraa.com/shop' },
  openGraph: {
    title: 'Shop All | Silvoraa',
    description: 'Browse our complete collection of handcrafted gemstone jewelry.',
    url: 'https://www.silvoraa.com/shop',
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
