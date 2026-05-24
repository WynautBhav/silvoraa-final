import type { Metadata } from 'next';
import AboutPageClient from './about-page-client';

export const metadata: Metadata = {
  title: 'Our Story | Silvoraa',
  description: 'Discover Silvoraa — handcrafted gemstone jewelry made with intention by Rahul Sharma. Learn about our artisans, quality standards, and commitment to ethical luxury.',
  alternates: { canonical: 'https://www.silvoraa.com/about' },
  openGraph: {
    title: 'Our Story | Silvoraa',
    description: 'Discover Silvoraa — handcrafted gemstone jewelry made with intention by Rahul Sharma.',
    url: 'https://www.silvoraa.com/about',
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
