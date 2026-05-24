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
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Our Story | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | Silvoraa',
    description: 'Discover Silvoraa\'s story — handcrafted gemstone jewelry made with intention.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Silvoraa',
  url: 'https://www.silvoraa.com',
  logo: 'https://www.silvoraa.com/favicon.svg',
  description: 'Handcrafted gemstone jewelry brand based in Jaipur, India. Creating intention-based jewelry with 925 sterling silver and authentic earth-mined gemstones.',
  foundingDate: '2020',
  founder: { '@type': 'Person', name: 'Silvoraa Founder' },
  sameAs: [
    'https://www.instagram.com/silvoraa',
    'https://www.facebook.com/silvoraa',
    'https://www.youtube.com/@silvoraa',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9876543210',
    contactType: 'customer service',
    availableLanguage: 'English',
    areaServed: 'IN',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jaipur',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
  },
});

const personSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Head Gemologist',
  description: 'GIA-certified gemologist with over 25 years of experience in gemstone selection and jewelry craftsmanship.',
  knowsAbout: ['Gemstone', 'Jewelry', 'GIA Certification', 'Ethical Sourcing'],
  memberOf: { '@type': 'Organization', name: 'Silvoraa' },
});

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.silvoraa.com/about' },
  ],
});

const speakableSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Our Story | Silvoraa',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.about-story', '.about-values', '.about-mission'] },
});

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: speakableSchema }} />
      <AboutClient />
    </>
  );
}
