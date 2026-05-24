import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Gemstone Blog | Silvoraa',
  description: 'Discover gemstone healing properties, birthstone meanings, and jewelry care tips from the Silvoraa gemstone guide.',
  alternates: { canonical: 'https://www.silvoraa.com/blog' },
  openGraph: {
    title: 'Gemstone Blog | Silvoraa',
    description: 'Discover gemstone healing properties, birthstone meanings, and jewelry care tips.',
    url: 'https://www.silvoraa.com/blog',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Gemstone Blog | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemstone Blog | Silvoraa',
    description: 'Discover gemstone healing properties, birthstone meanings, and jewelry care tips.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.silvoraa.com/blog' },
  ],
});

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <BlogClient />
    </>
  );
}
