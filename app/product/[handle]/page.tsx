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
      images: product.image ? [{ url: `https://www.silvoraa.com${product.image}`, width: 1200, height: 630, alt: product.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle || `${product.title} | Silvoraa`,
      description: product.seoDescription || cleanDescription,
      images: product.image ? [`https://www.silvoraa.com${product.image}`] : [],
    },
  };
}

function productSchema(product: typeof PRODUCTS[0]) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description?.replace(/<[^>]*>/g, '').substring(0, 300).trim() || `${product.title} by Silvoraa`,
    image: product.images?.length ? product.images.map((i: string) => `https://www.silvoraa.com${i}`) : [`https://www.silvoraa.com${product.image}`],
    brand: { '@type': 'Brand', name: 'Silvoraa' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...product.variants.map(v => v.price)),
      highPrice: Math.max(...product.variants.map(v => v.price)),
      availability: 'https://schema.org/InStock',
      url: `https://www.silvoraa.com/product/${product.handle}`,
    },
  };
  return JSON.stringify(schema);
}

function breadcrumbSchema(handle: string, title: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.silvoraa.com/shop' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://www.silvoraa.com/product/${handle}` },
    ],
  });
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = PRODUCTS.find(p => p.handle === handle);

  if (!product) {
    return <ProductPageClient />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema(handle, product.title) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productSchema(product) }} />
      <ProductPageClient />
    </>
  );
}
