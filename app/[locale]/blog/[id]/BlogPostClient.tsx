'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { brandColors } from '@/lib/theme';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-loader';

interface BlogPostClientProps {
  postId: string;
}

export default function BlogPostClient({ postId }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    fetch(`/api/blogs/${postId}`)
      .then(res => res.json())
      .then(data => {
        if (data.post) {
          setPost(data.post);
        } else {
          router.push('/404');
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/404');
      });
  }, [postId, router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  const t = useTranslations('blog');
  const locale = useLocale();

  const formatDate = (date: Date): string => {
    const months = locale === 'fr' 
      ? ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getCategoryLabel = (category: string): string => {
    const map: { [key: string]: string } = {
      'health': t('health'),
      'campaigns': t('campaigns'),
      'women': t('women'),
      'youth': t('youth'),
    };
    return map[category] || category;
  };

  return (
    <div className="py-12">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{locale === 'fr' ? 'Retour au blog' : 'Back to blog'}</span>
        </Link>
      </div>

      {/* Hero Image */}
      {post.imagePath && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={post.imagePath}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <span 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: '#8B6F47' }}
            >
              <Tag className="h-4 w-4 mr-2" />
              {getCategoryLabel(post.category)}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="text-sm">
              {post.month} {post.year}
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
              {post.title}
            </p>
          </motion.div>

          {/* Share / Back to Blog */}
          <div className="mt-12 pt-8 border-t">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: brandColors.primary[600] }}
            >
              <ArrowLeft className="h-5 w-5" />
              {locale === 'fr' ? 'Retour aux articles' : 'Back to articles'}
            </Link>
          </div>
        </div>
      </article>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >
        <div className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 text-white text-center"
          style={{ backgroundColor: brandColors.primary[600] }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
            {t('newsletterTitle')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
            {t('newsletterSubtitle')}
          </p>
          <Link href={`/${locale}/contact`}>
            <button 
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: 'white', color: brandColors.primary[600] }}
            >
              {t('newsletterBtn')}
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
