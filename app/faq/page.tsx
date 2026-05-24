import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ | Silvoraa',
  description: 'Gemstone healing properties, birthstone guide, and jewelry care FAQ. Everything you need to know about Silvoraa jewelry.',
  alternates: { canonical: 'https://www.silvoraa.com/faq' },
  openGraph: {
    title: 'FAQ | Silvoraa',
    description: 'Gemstone healing properties and jewelry care.',
    url: 'https://www.silvoraa.com/faq',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'FAQ | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Silvoraa',
    description: 'Gemstone healing properties and jewelry care.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://www.silvoraa.com/faq' },
  ],
});

const speakableSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'FAQ | Silvoraa',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h2', 'h3', 'details p'] },
});

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: speakableSchema }} />
      <FAQClient />
    </>
  );
}
