'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Search, Tag, FileText } from 'lucide-react';
import { brandColors } from '@/lib/theme';
import Link from 'next/link';

// Articles de blog M2HC
const blogPosts = [
  {
    id: 1,
    title: "Réarmement moral du personnel de santé pendant le Covid-19",
    excerpt: "M2HC a accompagné le personnel de santé dans les hôpitaux de Yaoundé durant la pandémie pour renforcer leur résilience mentale et émotionnelle.",
    author: "M2HC",
    date: "15 novembre 2025",
    category: "Santé",
    image: "/placeholder-blog-1.jpg",
    slug: "rearmement-covid19"
  },
  {
    id: 2,
    title: "Campagne de santé holistique à Mengueme",
    excerpt: "Retour sur notre campagne de santé en zone rurale : consultations, sensibilisations et accompagnement psychosocial pour les communautés.",
    author: "Équipe M2HC",
    date: "10 novembre 2025",
    category: "Campagnes",
    image: "/placeholder-blog-2.jpg",
    slug: "campagne-mengueme"
  },
  {
    id: 3,
    title: "Journée internationale de la femme : 16 jours d'activisme",
    excerpt: "M2HC s'engage contre les violences basées sur le genre avec des causeries éducatives et un accompagnement des femmes victimes.",
    author: "Mme BASSOUMBOUL Brigitte",
    date: "8 novembre 2025",
    category: "Femmes",
    image: "/placeholder-blog-3.jpg",
    slug: "journee-femme-activisme"
  },
  {
    id: 4,
    title: "L'approche holistique : Une révolution dans la prise en charge",
    excerpt: "Découvrez comment M2HC intègre les dimensions physique, mentale, émotionnelle, sociale et spirituelle pour un bien-être complet.",
    author: "Mme ENOH Marguerite",
    date: "3 novembre 2025",
    category: "Santé",
    image: "/placeholder-blog-4.jpg",
    slug: "approche-holistique"
  },
  {
    id: 5,
    title: "Prise en charge des personnes déplacées du NOSO",
    excerpt: "M2HC apporte un soutien holistique aux personnes déplacées internes avec accompagnement psychosocial et aide matérielle.",
    author: "M. ONAMBELE MBEDE Jean Marie Joseph",
    date: "28 octobre 2025",
    category: "Humanitaire",
    image: "/placeholder-blog-5.jpg",
    slug: "deplaces-noso"
  },
  {
    id: 6,
    title: "Partenariat avec MINPROFF, MINAS et MINSANTE",
    excerpt: "M2HC renforce sa collaboration avec les ministères pour une couverture nationale de ses interventions holistiques.",
    author: "Direction M2HC",
    date: "20 octobre 2025",
    category: "Partenariats",
    image: "/placeholder-blog-6.jpg",
    slug: "partenariats-ministeres"
  }
];

const categories = ["Tous", "Santé", "Campagnes", "Femmes", "Humanitaire", "Partenariats"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4">
              Blog & Actualités M2HC
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 px-4">
              Suivez nos actions de santé holistique, nos campagnes et nos interventions sur le terrain
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="mb-8 md:mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-4 md:mb-6">
              <div className="relative">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-opacity-50"
                  style={{ borderColor: searchTerm ? brandColors.primary[600] : undefined }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
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
              {/* Image placeholder */}
              <div className="h-48 flex items-center justify-center text-white" style={{ backgroundColor: brandColors.primary[600] }}>
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Image à venir</p>
                </div>
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
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center font-semibold hover:underline"
                  style={{ color: brandColors.primary[600] }}
                >
                  Lire la suite →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucun article trouvé pour votre recherche.
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
            Restez informé
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90 px-4">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités
          </p>
          <Link href="/contact">
            <button 
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: 'white', color: brandColors.primary[600] }}
            >
              S'inscrire à la newsletter
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
