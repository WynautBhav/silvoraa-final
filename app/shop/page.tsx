import type { Metadata } from 'next';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop All | Silvoraa',
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

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
    { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.silvoraa.com/shop' },
  ],
});

export default function ShopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <ShopPageClient />
    </>
  );
}
