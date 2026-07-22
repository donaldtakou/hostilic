'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { brandColors } from '@/lib/theme';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-loader';

interface BlogPostClientProps {
  postId: string;
}

function extractImagesFromContent(content: string): string[] {
  const images: string[] = [];
  for (const line of content.split('\n')) {
    const gridMatch = line.match(/^\[IMAGE_GRID:\s*([^\|]+)\|/);
    if (gridMatch) {
      images.push(...gridMatch[1].split(',').map(s => s.trim()));
      continue;
    }
    const srcMatch = line.match(/^\[IMAGE_SRC:\s*([^\|]+)\|/);
    if (srcMatch) {
      images.push(srcMatch[1].trim());
    }
  }
  return images;
}

function ZoomOverlay() {
  return (
    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
    </span>
  );
}

function BlogContent({ content, onImageClick }: { content: string; onImageClick: (index: number) => void }) {
  const lines = content.split('\n');
  let imgIndex = 0;

  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        const imageGridMatch = line.match(/^\[IMAGE_GRID:\s*([^\|]+)\|\s*(.+)\]$/);
        if (imageGridMatch) {
          const srcs = imageGridMatch[1].split(',').map(s => s.trim());
          const alt = imageGridMatch[2].trim();
          const startIndex = imgIndex;
          imgIndex += srcs.length;
          if (srcs.length === 2) {
            return (
              <div key={i} className="my-6 grid grid-cols-2 gap-2 rounded-xl overflow-hidden" style={{ maxHeight: '400px' }}>
                {srcs.map((src, j) => (
                  <button key={j} type="button" onClick={() => onImageClick(startIndex + j)} className="relative group block p-0 border-0 bg-transparent cursor-zoom-in">
                    <img src={src} alt={`${alt} ${j + 1}`} className="w-full h-full object-cover" style={{ maxHeight: '400px' }} />
                    <ZoomOverlay />
                  </button>
                ))}
              </div>
            );
          }
          return (
            <div key={i} className="my-6 grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              {srcs.map((src, j) => (
                <button key={j} type="button" onClick={() => onImageClick(startIndex + j)} className="relative group block p-0 border-0 bg-transparent cursor-zoom-in" style={{ height: '220px' }}>
                  <img src={src} alt={`${alt} ${j + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <ZoomOverlay />
                </button>
              ))}
            </div>
          );
        }

        const imageSrcMatch = line.match(/^\[IMAGE_SRC:\s*([^\|]+)\|\s*(.+)\]$/);
        if (imageSrcMatch) {
          const src = imageSrcMatch[1].trim();
          const alt = imageSrcMatch[2].trim();
          const index = imgIndex;
          imgIndex += 1;
          return (
            <button key={i} type="button" onClick={() => onImageClick(index)} className="relative group my-6 block w-full p-0 border-0 bg-transparent rounded-xl overflow-hidden cursor-zoom-in" style={{ maxHeight: '480px' }}>
              <img src={src} alt={alt} className="w-full object-cover rounded-xl" style={{ maxHeight: '480px' }} />
              <ZoomOverlay />
            </button>
          );
        }

        const imageMatch = line.match(/^\[IMAGE\s*:\s*(.+)\]$/);
        if (imageMatch) {
          return (
            <div
              key={i}
              className="my-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-center px-6 py-8"
              style={{ minHeight: '180px' }}
            >
              <div>
                <div className="text-4xl mb-3">📷</div>
                <p className="text-sm text-gray-500 italic">{imageMatch[1]}</p>
              </div>
            </div>
          );
        }

        if (line.startsWith('# ')) {
          return (
            <h1 key={i} className="text-3xl font-bold text-gray-900 mt-10 mb-4 border-b-2 pb-3" style={{ borderColor: '#8B6F47' }}>
              {line.replace(/^# /, '')}
            </h1>
          );
        }

        if (line.startsWith('## ')) {
          return (
            <h2 key={i} className="text-xl font-bold text-gray-800 mt-8 mb-3">
              {line.replace(/^## /, '')}
            </h2>
          );
        }

        if (line.startsWith('### ')) {
          return (
            <h3 key={i} className="text-lg font-semibold text-gray-700 mt-6 mb-2">
              {line.replace(/^### /, '')}
            </h3>
          );
        }

        if (line === '---') {
          return <hr key={i} className="my-8 border-gray-200" />;
        }

        if (line.startsWith('- ')) {
          const text = line.replace(/^- /, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          return (
            <li
              key={i}
              className="ml-6 text-gray-700 leading-relaxed list-disc"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
        }

        if (line.trim() === '') {
          return <div key={i} className="h-2" />;
        }

        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return (
          <p
            key={i}
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </div>
  );
}

export default function BlogPostClient({ postId }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('blog');
  const locale = useLocale();
  const router = useRouter();
  
  useEffect(() => {
    fetch(`/api/blogs/${postId}`)
      .then(res => res.json())
      .then(data => {
        if (data.post) {
          // Convert date string to Date object
          setPost({
            ...data.post,
            date: new Date(data.post.date)
          });
        } else {
          router.push('/404');
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/404');
      });
  }, [postId, router]);

  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const heroImages = useMemo(() => {
    if (post?.images && post.images.length > 1) return post.images;
    if (post?.imagePath) return [post.imagePath];
    return [];
  }, [post]);

  const contentImages = useMemo(() => extractImagesFromContent(post?.content || ''), [post]);

  const allImages = useMemo(() => [...heroImages, ...contentImages], [heroImages, contentImages]);

  const openLightbox = (index: number) => setLightbox({ images: allImages, index });

  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) => (prev && prev.index > 0 ? { ...prev, index: prev.index - 1 } : prev));
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) => (prev && prev.index < prev.images.length - 1 ? { ...prev, index: prev.index + 1 } : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

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

  const translateTitle = (title: string): string => {
    if (locale === 'fr') return title;
    
    // Basic translation of common terms
    const translations: { [key: string]: string } = {
      'CELEBRATION DE LA FETE DE LA JEUNESSE': 'YOUTH DAY CELEBRATION',
      'JOURNEE INTERNATIONALE': 'INTERNATIONAL DAY',
      'JOURNEE DE LA FEMME AFRICAINE': 'AFRICAN WOMEN\'S DAY',
      'CAMPAGNE DE SANTE': 'HEALTH CAMPAIGN',
      'PARTICIPATION': 'PARTICIPATION',
      'COMMEMORATION': 'COMMEMORATION',
      'INTERVENTION': 'INTERVENTION',
      'CONFERENCE': 'CONFERENCE',
      'DONS AUX ENFANTS': 'DONATIONS TO CHILDREN',
      'CELEBRATION': 'CELEBRATION',
      'REMISE DE DONS': 'DONATION CEREMONY',
      'SENSIBILISATION': 'AWARENESS',
      'VIOLENCES BASEES SUR LE GENRE': 'GENDER-BASED VIOLENCE',
      'PERSONNES EN SITUATION DE HANDICAP': 'PERSONS WITH DISABILITIES',
      'TOLERANCE ZERO': 'ZERO TOLERANCE',
      'MUTILATIONS GENITALES': 'GENITAL MUTILATION',
      'LUTTE CONTRE LE VIH': 'FIGHT AGAINST HIV',
      'DROITS DE L\'HOMME': 'HUMAN RIGHTS',
      'PRISE EN CHARGE': 'CARE AND SUPPORT',
    };
    
    let translated = title;
    Object.keys(translations).forEach(key => {
      const regex = new RegExp(key, 'gi');
      translated = translated.replace(regex, translations[key]);
    });
    
    return translated;
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

      {/* Hero Image(s) */}
      {post.images && post.images.length > 1 ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex gap-2 rounded-2xl overflow-hidden" style={{ height: '520px' }}>
            {/* Grande image à gauche */}
            <button type="button" onClick={() => openLightbox(0)} className="relative group flex-1 block p-0 border-0 cursor-zoom-in">
              <Image
                src={post.images[0]}
                alt={`${post.title} 1`}
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
              <ZoomOverlay />
            </button>
            {/* petites images empilées à droite */}
            <div className="flex flex-col gap-2 flex-1">
              {post.images.slice(1).map((src, j) => (
                src ? (
                  <button key={j} type="button" onClick={() => openLightbox(j + 1)} className="relative group flex-1 block p-0 border-0 cursor-zoom-in">
                    <Image
                      src={src}
                      alt={`${post.title} ${j + 2}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                    <ZoomOverlay />
                  </button>
                ) : null
              ))}
            </div>
          </div>
        </div>
      ) : post.imagePath ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button type="button" onClick={() => openLightbox(0)} className="relative group block w-full h-[300px] md:h-[500px] p-0 border-0 rounded-2xl overflow-hidden cursor-zoom-in">
            <Image
              src={post.imagePath}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="object-cover"
              priority
            />
            <ZoomOverlay />
          </button>
        </div>
      ) : null}

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
            {translateTitle(post.title)}
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
            {post.content ? (
              <BlogContent content={post.content} onImageClick={(idx) => openLightbox(heroImages.length + idx)} />
            ) : (
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                {post.excerpt}
              </p>
            )}
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setLightbox(null)}
            aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
          >
            <X className="h-8 w-8" />
          </button>

          {lightbox.index > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => (prev && prev.index > 0 ? { ...prev, index: prev.index - 1 } : prev));
              }}
              aria-label={locale === 'fr' ? 'Image précédente' : 'Previous image'}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {lightbox.index < lightbox.images.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => (prev && prev.index < prev.images.length - 1 ? { ...prev, index: prev.index + 1 } : prev));
              }}
              aria-label={locale === 'fr' ? 'Image suivante' : 'Next image'}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {lightbox.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm z-10">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt={locale === 'fr' ? 'Image agrandie' : 'Enlarged image'}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
