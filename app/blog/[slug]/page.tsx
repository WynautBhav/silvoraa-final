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
      images: post.image ? [{ url: `https://www.silvoraa.com${post.image}` }] : [],
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

export default function BlogPostPage() {
  return <BlogPostClient />;
}
