import type { Metadata } from 'next';
import AuthenticityClient from './AuthenticityClient';

export const metadata: Metadata = {
  title: 'Authenticity Guarantee | Silvoraa',
  description: 'Every Silvoraa piece comes with authenticity certification. GIA certified gemstones, 925 sterling silver, and lifetime warranty.',
  alternates: { canonical: 'https://www.silvoraa.com/authenticity' },
  openGraph: {
    title: 'Authenticity Guarantee | Silvoraa',
    description: 'GIA certified gemstones with lifetime warranty.',
    url: 'https://www.silvoraa.com/authenticity',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Authenticity Guarantee | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authenticity Guarantee | Silvoraa',
    description: 'GIA certified gemstones with lifetime warranty.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
    { '@type': 'ListItem', position: 2, name: 'Authenticity', item: 'https://www.silvoraa.com/authenticity' },
  ],
});

export default function AuthenticityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <AuthenticityClient />
    </>
  );
}
