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
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
