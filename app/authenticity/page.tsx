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
  },
};

export default function AuthenticityPage() {
  return <AuthenticityClient />;
}
