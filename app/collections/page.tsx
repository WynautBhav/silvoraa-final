import type { Metadata } from 'next';
import CollectionsPageClient from './CollectionsPageClient';

export const metadata: Metadata = {
  title: 'Gemstone Collections',
  description: 'Explore our curated gemstone collections — Amethyst for calm, Citrine for abundance, Blue Topaz for clarity. Handcrafted 925 sterling silver jewelry for every intention.',
  alternates: { canonical: 'https://www.silvoraa.com/collections' },
  openGraph: {
    title: 'Gemstone Collections | Silvoraa',
    description: 'Explore our curated gemstone collections.',
    url: 'https://www.silvoraa.com/collections',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Gemstone Collections | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemstone Collections | Silvoraa',
    description: 'Explore our curated gemstone collections.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
    { '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://www.silvoraa.com/collections' },
  ],
});

export default function CollectionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <CollectionsPageClient />
    </>
  );
}
