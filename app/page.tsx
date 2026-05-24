import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Silvoraa | Premium Gemstone Jewelry',
  description: 'Discover Silvoraa\'s collection of premium 925 sterling silver gemstone jewelry — Amethyst, Topaz, Citrine, Garnet, and more. Handcrafted with natural stones for those who wear meaning.',
  alternates: { canonical: 'https://www.silvoraa.com/' },
  openGraph: {
    title: 'Silvoraa | Premium Gemstone Jewelry',
    description: 'Premium 925 sterling silver jewelry with authentic gemstones. Handcrafted pieces that blend ancient wisdom with modern elegance.',
    url: 'https://www.silvoraa.com/',
    siteName: 'Silvoraa',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Silvoraa Gemstone Jewelry' }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silvoraa | Premium Gemstone Jewelry',
    description: 'Premium 925 sterling silver jewelry with authentic gemstones.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

const jewelryStoreSchema = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: 'Silvoraa',
  url: 'https://www.silvoraa.com',
  description: 'Premium 925 sterling silver gemstone jewelry — Amethyst, Topaz, Citrine, Garnet, and more.',
  image: 'https://www.silvoraa.com/images/og-home.jpg',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Credit Card, Debit Card, UPI',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Silvoraa',
  url: 'https://www.silvoraa.com',
  logo: 'https://www.silvoraa.com/favicon.svg',
  description: 'Handcrafted gemstone jewelry brand based in Jaipur, India. Creating intention-based jewelry with 925 sterling silver and authentic earth-mined gemstones.',
  founder: {
    '@type': 'Person',
    name: 'Rahul Sharma',
    jobTitle: 'Founder & Lead Designer',
    knowsAbout: 'Gemstone Jewelry, Gemology, Jewelry Design'
  },
  sameAs: [
    'https://www.instagram.com/silvoraa',
    'https://www.facebook.com/silvoraa',
    'https://www.youtube.com/@silvoraa'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919876543210',
    contactType: 'customer service',
    availableLanguage: 'English'
  },
  areaServed: 'Worldwide',
  serviceType: 'Online jewelry retail'
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Silvoraa',
  url: 'https://www.silvoraa.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://www.silvoraa.com/shop?search={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jewelryStoreSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <HomePageClient />
    </>
  );
}
