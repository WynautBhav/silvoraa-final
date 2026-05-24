"use client";
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPostsData } from '@/data/blogPosts';
import { seoBlogPosts } from '@/data/seoBlogPosts';
import { ChevronRight, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

const allBlogs = { ...blogPostsData, ...seoBlogPosts };

export default function BlogPostClient() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? allBlogs[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-serif mb-4 text-silvoraa-black">Post Not Found</h1>
          <p className="text-silvoraa-warmGray mb-8 max-w-md">
            This blog post could not be found. It may have been moved or deleted.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-silvoraa-black text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-silvoraa-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center text-xs text-silvoraa-warmGray uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-silvoraa-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
          <Link href="/blog" className="hover:text-silvoraa-gold transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3 mx-2 opacity-40" />
          <span className="text-silvoraa-black font-bold truncate max-w-[200px]">{post.title}</span>
        </div>

        {post.category && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-silvoraa-gold/10 text-silvoraa-gold rounded-full text-[10px] font-bold uppercase tracking-widest">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-serif text-silvoraa-black leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-silvoraa-warmGray mb-8">
          {post.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
        </div>

        {post.image && (
          <div className="aspect-[2/1] rounded-2xl overflow-hidden bg-gray-50 mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="text-lg md:text-xl text-silvoraa-warmGray font-light leading-relaxed mb-8 pb-8 border-b border-gray-100">
            {post.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-silvoraa-black prose-p:text-silvoraa-warmGray prose-a:text-silvoraa-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-silvoraa-black prose-img:rounded-xl">
          {post.content?.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-serif text-silvoraa-black mt-10 mb-4">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-serif text-silvoraa-black mt-8 mb-3">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="text-silvoraa-warmGray ml-4">{line.replace('- ', '')}</li>;
            }
            if (line.trim() === '') return null;
            return <p key={i} className="text-silvoraa-warmGray leading-relaxed mb-4">{line}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
