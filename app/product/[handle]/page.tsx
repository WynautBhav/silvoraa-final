import type { Metadata } from 'next';
import { PRODUCTS } from '@/constants';
import ProductPageClient from './ProductPageClient';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = PRODUCTS.find(p => p.handle === handle);

  if (!product) {
    return { title: 'Product Not Found | Silvoraa' };
  }

  const cleanDescription = product.description
    ? product.description.replace(/<[^>]*>/g, '').substring(0, 155).trim()
    : `Shop ${product.title} — a handcrafted ${product.type.toLowerCase()} featuring ${product.stone}. Premium 925 sterling silver.`;

  return {
    title: product.seoTitle || `${product.title} | Silvoraa`,
    description: product.seoDescription || cleanDescription,
    alternates: { canonical: `https://www.silvoraa.com/product/${handle}` },
    openGraph: {
      title: product.seoTitle || `${product.title} | Silvoraa`,
      description: product.seoDescription || cleanDescription,
      url: `https://www.silvoraa.com/product/${handle}`,
      images: product.image ? [{ url: `https://www.silvoraa.com${product.image}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle || `${product.title} | Silvoraa`,
      description: product.seoDescription || cleanDescription,
      images: product.image ? [`https://www.silvoraa.com${product.image}`] : [],
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageClient />;
}
