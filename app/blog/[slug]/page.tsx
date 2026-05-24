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
    title: post.title,
    description: post.excerpt?.substring(0, 160) || '',
    alternates: { canonical: `https://www.silvoraa.com/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Silvoraa Blog`,
      description: post.excerpt?.substring(0, 155) || '',
      url: `https://www.silvoraa.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [`https://www.silvoraa.com${post.image}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Silvoraa Blog`,
      description: post.excerpt?.substring(0, 155) || '',
      images: post.image ? [`https://www.silvoraa.com${post.image}`] : [],
    },
  };
}

function articleSchema(post: NonNullable<(typeof allBlogs)[string]>, slug: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt?.substring(0, 300) || '',
    image: post.image ? `https://www.silvoraa.com${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Rahul Sharma', jobTitle: 'Founder & Lead Gemologist', url: 'https://www.silvoraa.com/about' },
    publisher: { '@type': 'Organization', name: 'Silvoraa', logo: { '@type': 'ImageObject', url: 'https://www.silvoraa.com/favicon.svg' } },
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

  const stoneDefinitions: Record<string, string> = {
    amethyst: 'Amethyst is a purple quartz gemstone believed to promote calmness, reduce anxiety, and enhance spiritual awareness. It is the birthstone for February.',
    citrine: 'Citrine is a yellow-orange quartz gemstone associated with abundance, success, and joy. Often called the merchant\'s stone, it is believed to attract prosperity.',
    garnet: 'Garnet is a deep red gemstone known as the stone of commitment and energy. It symbolizes trust and friendship, and is the birthstone for January.',
    topaz: 'Topaz is a silicate gemstone associated with honesty, intuition, and emotional balance. Blue Topaz is the birthstone for December.',
    opal: 'Opal is a gemstone known for its unique play-of-color, associated with inspiration, creativity, and emotional balance.',
    'rose quartz': 'Rose Quartz is a pink variety of quartz known as the stone of unconditional love, emotional healing, and self-love.',
    labradorite: 'Labradorite is a feldspar gemstone known as the stone of transformation, believed to enhance intuition and protect against negative energy.',
    'lapis lazuli': 'Lapis Lazuli is a deep blue metamorphic rock associated with truth, wisdom, and inner peace.',
    iolite: 'Iolite is a blue-violet gemstone known as the stone of visionaries, believed to enhance focus and creative thinking.',
    emerald: 'Emerald is a green variety of beryl associated with rebirth, fertility, and love. It symbolizes harmony in relationships.',
    peridot: 'Peridot is a green olivine gemstone associated with warmth, happiness, and positive energy. It is the birthstone for August.',
  };

  const definitionMatch = Object.entries(stoneDefinitions).find(([stone]) =>
    post.title.toLowerCase().includes(stone) || post.excerpt.toLowerCase().includes(stone)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema(post, slug) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema(slug, post.title) }} />
      <BlogPostClient post={post} definitionParagraph={definitionMatch?.[1]} slug={slug} />
    </>
  );
}
