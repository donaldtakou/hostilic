"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Users, Award, TrendingUp, ArrowRight, Target, Eye, Shield, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getAllBlogPosts, BlogPost } from '@/lib/blog-loader'
import { Calendar, Tag } from 'lucide-react'

const stats = [
  { id: 1, nameKey: "partners", value: "20+", icon: Users, href: "about" },
  { id: 2, nameKey: "people", value: "15,000+", icon: Heart, href: "testimonials" },
  { id: 3, nameKey: "axes", value: "5", icon: Award, href: "programs" },
  { id: 4, nameKey: "zones", value: "50+", icon: TrendingUp, href: "gallery" },
]

const carouselImages = [
  {
    src: "/gallery/16 JOURS DACTIVISME CONTRE LES VIOLENCES BASEES SUR LE GENRE/1.png",
    alt: "16 Jours d'Activisme contre les Violences Basées sur le Genre",
    titleFr: "16 Jours d'Activisme contre les VBG",
    titleEn: "16 Days of Activism against GBV"
  },
  {
    src: "/gallery/JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP/3.jpg",
    alt: "Journée Internationale des Personnes en Situation de Handicap",
    titleFr: "Soutien aux Personnes en Situation de Handicap",
    titleEn: "Support for Persons with Disabilities"
  },
  {
    src: "/gallery/JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP/4.jpg",
    alt: "Accompagnement des Personnes en Situation de Handicap",
    titleFr: "Accompagnement Holistique",
    titleEn: "Holistic Support"
  },
  {
    src: "/gallery/JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP/5.jpg",
    alt: "Inclusion des Personnes en Situation de Handicap",
    titleFr: "Inclusion et Dignité",
    titleEn: "Inclusion and Dignity"
  },
  {
    src: "/gallery/M2HC A LETRANGER/1.jpg",
    alt: "Présentation de M2HC au GFAC à Istanbul",
    titleFr: "Présentation de M2HC au GFAC à Istanbul",
    titleEn: "M2HC Presentation at GFAC in Istanbul"
  },
  {
    src: "/gallery/M2HC A LETRANGER/2.jpg",
    alt: "Partenariats Internationaux M2HC",
    titleFr: "Intervention de M2HC au GFAC d'Istanbul",
    titleEn: "M2HC Intervention at GFAC Istanbul"
  },
  {
    src: "/gallery/M2HC A LETRANGER/3.jpg",
    alt: "Collaborations Internationales",
    titleFr: "Collaborations Globales",
    titleEn: "Global Collaborations"
  },
  {
    src: "/gallery/jeunesse/2.jpg",
    alt: "Programme Jeunesse M2HC",
    titleFr: "Autonomisation de la Jeunesse",
    titleEn: "Youth Empowerment"
  },
  {
    src: "/gallery/JOURNEE DE L ENFANT AFRICAIN/2.jpg",
    alt: "Journée de l'Enfant Africain",
    titleFr: "Journée de l'Enfant Africain",
    titleEn: "African Child Day"
  },
  {
    src: "/gallery/JOURNEE INTERNATIONALE DE LA FEMME/5.jpg",
    alt: "Journée Internationale de la Femme",
    titleFr: "Célébration de la Femme",
    titleEn: "Women's Day Celebration"
  }
]

export default function HomePage() {
  const t = useTranslations('home')
  const tNav = useTranslations('nav')
  const tBlog = useTranslations('blog')
  const locale = useLocale()
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const allPosts = getAllBlogPosts()
    setRecentPosts(allPosts.slice(0, 3))
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const values = [
    {
      titleKey: "dignity",
      descriptionKey: "dignityDesc",
      icon: Heart,
    },
    {
      titleKey: "holistic",
      descriptionKey: "holisticDesc",
      icon: Sparkles,
    },
    {
      titleKey: "empowerment",
      descriptionKey: "empowermentDesc",
      icon: Target,
    },
    {
      titleKey: "empathy",
      descriptionKey: "empathyDesc",
      icon: Users,
    },
    {
      titleKey: "equity",
      descriptionKey: "equityDesc",
      icon: Shield,
    },
    {
      titleKey: "integrity",
      descriptionKey: "integrityDesc",
      icon: Award,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Carousel Hero Section */}
      <section className="relative w-full bg-black">
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] max-h-[900px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={carouselImages[currentSlide].src}
                alt={carouselImages[currentSlide].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover"
                priority={currentSlide === 0}
                quality={90}
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="max-w-4xl"
                  >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight">
                      {locale === 'fr'
                        ? carouselImages[currentSlide].titleFr
                        : carouselImages[currentSlide].titleEn}
                    </h1>
                    <div className="h-1.5 w-24 bg-[#8B6F47] rounded-full mb-6 md:mb-8"></div>
                    <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 md:mb-10 max-w-2xl drop-shadow-lg">
                      {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Link href={`/${locale}/donate`}>
                        <Button size="lg" className="w-full sm:w-auto bg-[#8B6F47] hover:bg-[#6d5638] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                          <Heart className="mr-2 h-5 w-5" />
                          {tNav('donate')}
                        </Button>
                      </Link>
                      <Link href={`/${locale}/programs`}>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#0D47A1] shadow-xl transition-all duration-300">
                          {t('hero.programsBtn')}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-20 group border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-20 group border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${currentSlide === index
                  ? 'w-12 h-3 bg-white shadow-lg'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60 backdrop-blur-sm'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-4 py-2 bg-black/30 backdrop-blur-md text-white text-sm rounded-full hover:bg-black/50 transition-all border border-white/20"
            >
              {isAutoPlaying ? '' : ''}
            </button>
          </div>
        </div>
      </section>

      {/* Old Carousel Section - REMOVE */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" style={{ display: 'none' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D47A1] mb-4">
              {locale === 'fr' ? 'Nos Actions en Images' : 'Our Actions in Pictures'}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {locale === 'fr'
                ? 'Découvrez notre engagement envers la santé holistique et le bien-être communautaire'
                : 'Discover our commitment to holistic health and community well-being'}
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Carousel Container */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselImages[currentSlide].src}
                    alt={carouselImages[currentSlide].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    className="object-cover"
                    priority={currentSlide === 0}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Title Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                  >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                      {locale === 'fr'
                        ? carouselImages[currentSlide].titleFr
                        : carouselImages[currentSlide].titleEn}
                    </h3>
                    <div className="h-1 w-20 bg-[#8B6F47] rounded-full"></div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-[#0D47A1] group-hover:text-[#8B6F47]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-[#0D47A1] group-hover:text-[#8B6F47]" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${currentSlide === index
                    ? 'w-12 h-3 bg-[#0D47A1]'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-gray-500 hover:text-[#0D47A1] transition-colors"
              >
                {isAutoPlaying
                  ? (locale === 'fr' ? '' : '')
                  : (locale === 'fr' ? '' : '')}
              </button>
            </div>
          </div>

          {/* CTA to Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href={`/${locale}/gallery`}>
              <Button size="lg" className="bg-[#8B6F47] hover:bg-[#6d5638] text-white">
                {locale === 'fr' ? 'Voir toute la galerie' : 'View full gallery'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">

            {/* Carte Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
              style={{ height: '420px' }}
            >
              {/* Image de fond */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/gallery/happy child.jpg')" }}
              />
              {/* Dégradé sombre pour lisibilité */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.82) 100%)' }} />
              {/* Flèche — lien vers À propos */}
              <Link href={`/${locale}/about`} className="absolute top-6 right-6 z-10 w-6 h-6 rounded-full bg-[#212121] flex items-center justify-center shadow-md hover:bg-white hover:text-[#212121] transition-colors duration-200">
                <ArrowRight className="h-3 w-3 text-white" />
              </Link>
              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('mission.title')}</h3>
                <p className="text-base md:text-lg leading-relaxed text-white/90">{t('mission.description')}</p>
              </div>
            </motion.div>

            {/* Carte Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
              style={{ height: '420px' }}
            >
              {/* Image de fond */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/gallery/free human.jpg')" }}
              />
              {/* Dégradé sombre pour lisibilité */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.82) 100%)' }} />
              {/* Flèche — lien vers À propos */}
              <Link href={`/${locale}/about`} className="absolute top-6 right-6 z-10 w-6 h-6 rounded-full bg-[#212121] flex items-center justify-center shadow-md hover:bg-white hover:text-[#212121] transition-colors duration-200">
                <ArrowRight className="h-3 w-3 text-white" />
              </Link>
              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('vision.title')}</h3>
                <p className="text-base md:text-lg leading-relaxed text-white/90">{t('vision.description')}</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Stats + Blog — zone double ton */}
      <section className="relative overflow-hidden">

        {/* ── Fond bleu — stats ── */}
        <div className="relative bg-[#0D47A1] pt-14 pb-32 md:pt-20 md:pb-40">
          {/* Cercles décoratifs animés */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.13, 0.07] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.10, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-10 -right-16 w-96 h-96 rounded-full bg-white pointer-events-none"
          />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Link key={stat.id} href={`/${locale}/${stat.href}`} className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, type: 'spring', stiffness: 90 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 md:p-7 cursor-pointer hover:bg-white/20 transition-colors"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 120 }}
                        className="inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-white/20 rounded-full mb-3"
                      >
                        <Icon className="h-5 w-5 md:h-7 md:w-7 text-white" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.35 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-blue-200 text-xs md:text-sm font-medium">{t(`stats.${stat.nameKey}`)}</div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Séparateur SVG courbe (double ton) ── */}
        <div className="relative -mt-1">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z" fill="#0D47A1" />
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#F0F4FF" />
          </svg>
        </div>

        {/* ── Fond clair — blog ── */}
        <div className="bg-[#F0F4FF] pt-4 pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block bg-[#0D47A1] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              >
                {t('blog.title')}
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D47A1] mb-4">
                {t('blog.subtitle')}
              </h2>
            </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={post.imagePath}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0D47A1] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#0D47A1] transition-colors">
                    <Link href={`/${locale}/blog`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Link 
                      href={`/${locale}/blog`}
                      className="inline-flex items-center text-[#8B6F47] font-semibold hover:text-[#6d5638] transition-colors"
                    >
                      {tBlog('readMore')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href={`/${locale}/blog`}>
              <Button size="lg" className="bg-[#0D47A1] text-white hover:bg-[#0a3d91] px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                {t('blog.viewAll')}
              </Button>
            </Link>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section — double ton */}
      <section className="relative overflow-hidden">

        {/* ── Séparateur SVG : blanc → bleu foncé ── */}
        <div className="relative -mb-1">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
            <path d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z" fill="#ffffff" />
            <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="#0A2F6B" />
          </svg>
        </div>

        {/* ── Fond bleu foncé — valeurs ── */}
        <div className="relative bg-[#0A2F6B] py-16 md:py-24 overflow-hidden">

          {/* Décorations de fond animées */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-white/5 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white pointer-events-none"
          />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

            {/* En-tête */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              >
                {t('values.title')}
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t('values.subtitle')}
              </h2>
            </motion.div>

            {/* Grille des valeurs */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.titleKey}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, type: 'spring', stiffness: 85 }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="group relative bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 md:p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                  >
                    {/* Numéro d'ordre */}
                    <span className="absolute top-5 right-6 text-white/10 font-extrabold text-5xl select-none leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Icône */}
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-xl mb-5"
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </motion.div>

                    {/* Ligne accent */}
                    <div className="w-8 h-0.5 bg-white/40 mb-4 group-hover:w-14 transition-all duration-300" />

                    <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                      {t(`values.${value.titleKey}`)}
                    </h3>
                    <p className="text-sm md:text-base text-blue-100/80 leading-relaxed">
                      {t(`values.${value.descriptionKey}`)}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Séparateur SVG : bleu foncé → bleu vif (CTA) ── */}
        <div className="relative -mt-1">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z" fill="#0A2F6B" />
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#0D47A1" />
          </svg>
        </div>

      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#0D47A1] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 px-4">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href={`/${locale}/donate`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[#8B6F47] text-white hover:bg-[#6d5638]">
                  <Heart className="mr-2 h-5 w-5 " />
                  {tNav('donate')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10">
                  {t('cta.contactBtn')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
