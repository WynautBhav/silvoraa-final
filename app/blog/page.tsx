import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Gemstone Blog | Silvoraa',
  description: 'Discover gemstone healing properties, jewelry care guides, and styling tips. Learn about Amethyst, Citrine, and more from our experts.',
  alternates: { canonical: 'https://www.silvoraa.com/blog' },
  openGraph: {
    title: 'Gemstone Blog | Silvoraa',
    description: 'Gemstone jewelry guides and healing properties.',
    url: 'https://www.silvoraa.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
