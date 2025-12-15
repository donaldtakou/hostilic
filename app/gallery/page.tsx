"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { X, Play, Image as ImageIcon } from "lucide-react"
import ImageCarousel from "@/components/ImageCarousel"

const galleryItems = [
  {
    id: "1",
    type: "image",
    src: "/gallery/petite-enfance.jpg",
    title: "Axe Petite Enfance - Accompagnement holistique",
    category: "enfance",
  },
  {
    id: "2",
    type: "image",
    src: "/gallery/femmes.jpg",
    title: "Autonomisation des femmes et jeunes filles",
    category: "femmes",
  },
  {
    id: "3",
    type: "image",
    src: "/gallery/jeunesse.jpg",
    title: "Formation et mentorat des jeunes",
    category: "jeunesse",
  },
  {
    id: "4",
    type: "image",
    src: "/gallery/campagne-sante.jpg",
    title: "Campagne de santé holistique en zone rurale",
    category: "communautaire",
  },
  {
    id: "5",
    type: "image",
    src: "/gallery/sensibilisation.jpg",
    title: "Causeries éducatives et sensibilisation",
    category: "communautaire",
  },
  {
    id: "6",
    type: "image",
    src: "/gallery/equipe.jpg",
    title: "Notre équipe pluridisciplinaire",
    category: "equipe",
  },
  {
    id: "7",
    type: "image",
    src: "/gallery/partenaires.jpg",
    title: "Collaboration avec nos partenaires",
    category: "partenariats",
  },
  {
    id: "8",
    type: "image",
    src: "/gallery/rearmement.jpg",
    title: "Réarmement moral du personnel de santé",
    category: "institutions",
  },
]

const categories = [
  { value: "all", label: "Tous" },
  { value: "enfance", label: "Petite Enfance" },
  { value: "femmes", label: "Femmes" },
  { value: "jeunesse", label: "Jeunesse" },
  { value: "communautaire", label: "Communautaire" },
  { value: "institutions", label: "Institutions" },
  { value: "equipe", label: "Équipe" },
  { value: "partenariats", label: "Partenariats" },
]

const carouselItems = [
  {
    id: "1",
    image: "/hero-1.jpg",
    title: "Approche Holistique pour votre Bien-être",
    description: "Prise en charge mentale, émotionnelle, sociale et spirituelle",
  },
  {
    id: "2",
    image: "/hero-2.jpg",
    title: "5 Axes Stratégiques d'Intervention",
    description: "De la petite enfance aux institutions",
  },
  {
    id: "3",
    image: "/hero-3.jpg",
    title: "Campagnes en Zones Rurales",
    description: "Mengueme, Mbeng, Makak, Obala et plus encore",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxItem, setLightboxItem] = useState<any>(null)

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  )

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6" style={{ backgroundColor: '#0D47A1' }}>
              <ImageIcon className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
              Galerie M2HC
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Découvrez en images nos actions de santé holistique et nos interventions sur le terrain
            </p>
          </motion.div>
        </div>

        {/* Hero Carousel */}
        <div className="mb-16">
          <ImageCarousel items={carouselItems} autoplay effect="fade" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                selectedCategory === category.value
                  ? "text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
              style={selectedCategory === category.value ? { backgroundColor: '#0D47A1' } : {}}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setLightboxItem(item)}
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src={item.type === "image" ? item.src : item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=M2H2"
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {item.type === "video" && (
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-semibold">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxItem && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setLightboxItem(null)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              {lightboxItem.type === "image" ? (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/1200x800?text=M2H2"
                  }}
                />
              ) : (
                <div className="aspect-video bg-black rounded-lg">
                  <iframe
                    src={lightboxItem.src.replace("watch?v=", "embed/")}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}
              <p className="text-white text-center mt-4 text-lg font-semibold">
                {lightboxItem.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
