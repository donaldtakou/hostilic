'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Tag } from 'lucide-react';
import { brandColors } from '@/lib/theme';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-loader';

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        // Convert date strings to Date objects
        const postsWithDates = (data.posts || []).map((post: any) => ({
          ...post,
          date: new Date(post.date)
        }));
        setPosts(postsWithDates);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blogs:', err);
        setLoading(false);
      });
  }, []);
  const t = useTranslations('blog');
  const locale = useLocale();
  const searchParams = useSearchParams();
  
  const categories = [t('all'), t('health'), t('campaigns'), t('women'), t('youth')];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('all'));
  
  // Handle URL category parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryMap: { [key: string]: string } = {
        'health': t('health'),
        'campaigns': t('campaigns'),
        'women': t('women'),
        'youth': t('youth'),
      };
      const translatedCategory = categoryMap[categoryParam];
      if (translatedCategory) {
        setSelectedCategory(translatedCategory);
      }
    }
  }, [searchParams, t]);

  const categoryMap: { [key: string]: string } = {
    [t('all')]: 'all',
    [t('health')]: 'health',
    [t('campaigns')]: 'campaigns',
    [t('women')]: 'women',
    [t('youth')]: 'youth',
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryKey = categoryMap[selectedCategory];
    const matchesCategory = categoryKey === 'all' || post.category === categoryKey;
    return matchesSearch && matchesCategory;
  });

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
      'VISITE D\'INFORMATION': 'INFORMATION VISIT',
    };
    
    let translated = title;
    Object.keys(translations).forEach(key => {
      const regex = new RegExp(key, 'gi');
      translated = translated.replace(regex, translations[key]);
    });
    
    return translated;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white py-20 mb-12" style={{ backgroundColor: brandColors.primary[600] }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters & Search */}
        <div className="mb-8 md:mb-12">
          {/* Search Bar */}
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="overflow-x-auto pb-2">
            <div className="flex justify-center gap-2 md:gap-3 min-w-max px-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                    selectedCategory === category
                      ? 'text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={
                    selectedCategory === category
                      ? { backgroundColor: brandColors.primary[600] }
                      : {}
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                {post.imagePath ? (
                  <Image
                    src={post.imagePath}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center text-white"
                    style={{ backgroundColor: brandColors.primary[600] }}
                  >
                    <div className="text-center">
                      <p className="text-sm opacity-75">{t('imageComing')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#8B6F47' }}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {getCategoryLabel(post.category)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {translateTitle(post.title)}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/${locale}/blog/${post.id}`}
                  className="inline-flex items-center font-semibold hover:underline"
                  style={{ color: brandColors.primary[600] }}
                >
                  {t('readMore')} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {t('noArticles')}
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 rounded-2xl p-6 md:p-8 text-white text-center"
          style={{ backgroundColor: brandColors.primary[600] }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
            {t('newsletterTitle')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90 px-4">
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
        </motion.div>
      </div>
    </>
  );
}
