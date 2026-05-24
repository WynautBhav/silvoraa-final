import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Silvoraa Jewelry. Visit our Jaipur studio, book a consultation, or reach out to our gemology experts.',
  alternates: { canonical: 'https://www.silvoraa.com/contact' },
  openGraph: {
    title: 'Contact | Silvoraa',
    description: 'Get in touch with our gemology experts.',
    url: 'https://www.silvoraa.com/contact',
    images: [{ url: 'https://www.silvoraa.com/images/og-home.jpg', width: 1200, height: 630, alt: 'Contact | Silvoraa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Silvoraa',
    description: 'Get in touch with our gemology experts.',
    images: ['https://www.silvoraa.com/images/og-home.jpg'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
