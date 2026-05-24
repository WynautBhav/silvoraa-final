import type { Metadata } from 'next';
import { blogPostsData } from '@/data/blogPosts';
import { seoBlogPosts } from '@/data/seoBlogPosts';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

const allBlogs = { ...blogPostsData, ...seoBlogPosts };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = slug ? allBlogs[slug] : null;

  if (!post) {
    return { title: 'Post Not Found | Silvoraa' };
  }

  return {
    title: `${post.title} | Silvoraa Blog`,
    description: post.excerpt?.substring(0, 155) || 'Gemstone jewelry insights from Silvoraa.',
    alternates: { canonical: `https://www.silvoraa.com/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Silvoraa Blog`,
      description: post.excerpt?.substring(0, 155) || '',
      url: `https://www.silvoraa.com/blog/${slug}`,
      images: post.image ? [{ url: `https://www.silvoraa.com${post.image}`, width: 1200, height: 630, alt: post.title }] : [],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Silvoraa Blog`,
      description: post.excerpt?.substring(0, 155) || '',
      images: post.image ? [`https://www.silvoraa.com${post.image}`] : [],
    },
  };
}

function blogPostingSchema(post: (typeof allBlogs)[string], slug: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt?.substring(0, 300) || '',
    image: post.image ? `https://www.silvoraa.com${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Silvoraa Gemologists',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Silvoraa',
      logo: { '@type': 'ImageObject', url: 'https://www.silvoraa.com/favicon.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.silvoraa.com/blog/${slug}` },
  });
}

function breadcrumbSchema(slug: string, title: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.silvoraa.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.silvoraa.com/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://www.silvoraa.com/blog/${slug}` },
    ],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = slug ? allBlogs[slug] : null;

  if (!post) {
    return <BlogPostClient />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema(slug, post.title) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: blogPostingSchema(post, slug) }} />
      <BlogPostClient />
    </>
  );
}
