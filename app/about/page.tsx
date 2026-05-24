import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Our Story | Silvoraa',
  description: 'Discover Silvoraa\'s story — handcrafted gemstone jewelry made with intention. Learn about our artisans, quality standards, and commitment to ethical luxury.',
  alternates: { canonical: 'https://www.silvoraa.com/about' },
  openGraph: {
    title: 'Our Story | Silvoraa',
    description: 'Discover Silvoraa\'s story — handcrafted gemstone jewelry made with intention.',
    url: 'https://www.silvoraa.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
