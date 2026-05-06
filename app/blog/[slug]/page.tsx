"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowLeft, Clock, Gem, Calendar, Share2 } from 'lucide-react';
import { blogPostsData } from '@/data/blogPosts';
import { seoBlogPosts } from '@/data/seoBlogPosts';

const BlogPostPage : React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // Merge both blog data sources
  const allBlogs = { ...blogPostsData, ...seoBlogPosts };
  const post = slug ? allBlogs[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-serif text-silvoraa-black mb-4">Post Not Found</h1>
          <p className="text-silvoraa-warmGray mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-silvoraa-gold hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Silvoraa Gemology Team",
      "jobTitle": "Gemologists & Jewelry Experts"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Silvoraa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.silvoraa.com/images/banner1_new.png"
      }
    }
  });

  const sections = post.content.split('\n\n').filter(s => s.trim()).map(s => s.trim());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-6 lg:px-8 pb-12">
<Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Gem className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white max-w-4xl leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl text-silvoraa-warmGray leading-relaxed mb-12 font-serif italic border-l-4 border-silvoraa-gold pl-6">
            {post.excerpt}
          </p>

          <div className="prose prose-lg md:prose-2xl max-w-none">
            {sections.map((section, index) => {
              if (section.startsWith('## ')) {
                return <h2 key={index} className="text-3xl md:text-5xl font-serif text-silvoraa-black mt-16 mb-8 tracking-wide border-b border-gray-200 pb-4">{section.replace('## ', '')}</h2>;
              }
              if (section.startsWith('### ')) {
                return <h3 key={index} className="text-2xl md:text-4xl font-serif text-silvoraa-black/90 mt-12 mb-6 italic text-silvoraa-gold">{section.replace('### ', '')}</h3>;
              }
              if (section.startsWith('**') && section.endsWith('**')) {
                return <p key={index} className="text-2xl font-medium text-silvoraa-black mt-8 mb-4">{section.replace(/\*\*/g, '')}</p>;
              }
              if (section.startsWith('| ')) {
                return (
                  <div key={index} className="overflow-x-auto my-12 bg-white shadow-sm rounded-xl border border-gray-100">
                    <table className="w-full border-collapse">
                      <tbody>
                        {section.split('\n').map((row, i) => (
                          <tr key={i} className={i === 0 ? 'bg-silvoraa-gold/10 font-medium' : 'border-t border-gray-100'}>
                            {row.split('|').filter(c => c.trim()).map((cell, j) => (
                              <td key={j} className="px-6 py-4 text-base md:text-lg text-silvoraa-warmGray">{cell.trim()}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (section.startsWith('- ') || section.includes('\n- ')) {
                const lines = section.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-4 my-8 text-silvoraa-warmGray text-xl md:text-2xl leading-relaxed ml-4">
                    {lines.map((item, i) => {
                      if (item.trim().startsWith('- ')) {
                        return <li key={i} className="pl-2">{item.trim().replace('- ', '')}</li>;
                      }
                      return <p key={i} className="mb-2 mt-4">{item.trim()}</p>;
                    })}
                  </ul>
                );
              }
              return <p key={index} className="text-xl md:text-2xl text-silvoraa-warmGray leading-[1.8] mb-10 tracking-wide font-light">{section}</p>;
            })}
          </div>

          {/* Share & Navigation */}
          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link
              href="/blog"
              className="text-silvoraa-gold hover:underline font-medium text-lg"
            >
              ← More Articles
            </Link>
            <button
              className="flex items-center gap-2 text-silvoraa-warmGray hover:text-silvoraa-gold transition-colors text-lg"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
