import type { Metadata } from 'next';
import CollectionsPageClient from './CollectionsPageClient';

export const metadata: Metadata = {
  title: 'Gemstone Collections | Silvoraa',
  description: 'Explore our curated gemstone collections — Amethyst for calm, Citrine for abundance, Blue Topaz for clarity. Handcrafted 925 sterling silver jewelry for every intention.',
  alternates: { canonical: 'https://www.silvoraa.com/collections' },
  openGraph: {
    title: 'Gemstone Collections | Silvoraa',
    description: 'Explore our curated gemstone collections.',
    url: 'https://www.silvoraa.com/collections',
  },
};

export default function CollectionsPage() {
  return <CollectionsPageClient />;
}
