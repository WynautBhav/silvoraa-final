"use client";
import type { Metadata } from 'next';
import React from 'react';

import Link from 'next/link';
import { ArrowRight, Gem, Sparkles } from 'lucide-react';
import { blogPostsData } from '@/data/blogPosts';
import { seoBlogPosts } from '@/data/seoBlogPosts';

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

const blogSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Silvoraa Blog",
  "description": "Gemstone jewelry guides, healing properties, and style tips",
  "url": "https://www.silvoraa.com/blog"
});

const BlogPage : React.FC = () => {
  // Merge both blog data sources
  const allBlogs = { ...blogPostsData, ...seoBlogPosts };
  const blogPosts = Object.values(allBlogs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      {/* Hero Section */}
      <div className="relative bg-silvoraa-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-silvoraa-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-16">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.3em] text-silvoraa-gold">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Discover the Magic of Gemstones
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Guides, healing properties, care tips, and styling advice from our gemstone experts.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-silvoraa-black">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 text-xs text-silvoraa-warmGray uppercase tracking-wider mb-3">
                  <Gem className="w-3 h-3" />
                  {post.readTime}
                </div>
                <h2 className="text-xl font-serif text-silvoraa-black mb-3 group-hover:text-silvoraa-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-silvoraa-warmGray text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-silvoraa-black group-hover:text-silvoraa-gold transition-colors mt-auto">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
