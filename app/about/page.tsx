import type { Metadata } from 'next';
import AboutPageClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Our Story | Silvoraa',
  description: 'Discover Silvoraa — handcrafted gemstone jewelry made with intention by Rahul Sharma. Learn about our artisans, quality standards, and commitment to ethical luxury.',
  alternates: { canonical: 'https://www.silvoraa.com/about' },
  openGraph: {
    title: 'Our Story | Silvoraa',
    description: 'Discover Silvoraa — handcrafted gemstone jewelry made with intention by Rahul Sharma.',
    url: 'https://www.silvoraa.com/about',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Our Story | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | Silvoraa',
    description: 'Discover Silvoraa\'s story — handcrafted gemstone jewelry made with intention.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'About Silvoraa Jewelry',
  description: 'Handcrafted gemstone jewelry brand founded by Rahul Sharma. GIA-certified gemologists creating intention-based jewelry with 925 sterling silver.',
  speaksAbout: ['gemstone jewelry', 'Rahul Sharma', 'Silvoraa', 'handcrafted jewelry Jaipur'],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <AboutPageClient />
    </>
  );
}
