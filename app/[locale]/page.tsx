"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Users, Award, TrendingUp, ArrowRight, Target, Eye, Shield, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const stats = [
  { id: 1, nameKey: "partners", value: "10+", icon: Users },
  { id: 2, nameKey: "people", value: "1,000+", icon: Heart },
  { id: 3, nameKey: "axes", value: "5", icon: Award },
  { id: 4, nameKey: "zones", value: "7+", icon: TrendingUp },
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
    alt: "M2HC à l'International",
    titleFr: "M2HC à l'International",
    titleEn: "M2HC Internationally"
  },
  {
    src: "/gallery/M2HC A LETRANGER/2.jpg",
    alt: "Partenariats Internationaux M2HC",
    titleFr: "Partenariats Internationaux",
    titleEn: "International Partnerships"
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
  const locale = useLocale();
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
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
              {isAutoPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>
        </div>
      </section>

      {/* Old Carousel Section - REMOVE */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" style={{display: 'none'}}>
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
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
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
                  ? (locale === 'fr' ? '⏸ Pause' : '⏸ Pause')
                  : (locale === 'fr' ? '▶ Lecture automatique' : '▶ Auto-play')}
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0D47A1] to-[#1976D2] text-white p-6 md:p-8 rounded-2xl shadow-lg"
            >
              <Target className="h-10 w-10 md:h-12 md:w-12 mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('mission.title')}</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/95">
                {t('mission.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#8B6F47] to-[#6B5437] text-white p-6 md:p-8 rounded-2xl shadow-lg"
            >
              <Eye className="h-10 w-10 md:h-12 md:w-12 mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('vision.title')}</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/95">
                {t('vision.description')}
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#0D47A1] rounded-full mb-3 md:mb-4">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0D47A1] mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm lg:text-base">{t(`stats.${stat.nameKey}`)}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D47A1] mb-4">
              {t('values.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              {t('values.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6 md:p-8 hover:border-[#0D47A1] hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#8B6F47] to-[#6B5437] rounded-xl mb-4 md:mb-6">
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {t(`values.${value.titleKey}`)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t(`values.${value.descriptionKey}`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
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
