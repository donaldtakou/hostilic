"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Image as ImageIcon, ChevronRight, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GalleryFolder {
  id: string
  displayName: string
  folderPath: string
  category: string
  count: number
  thumbnail: string
  description: string
  pngFiles?: number[]
}

const galleryFolders: GalleryFolder[] = [
  {
    id: "1",
    displayName: "Journée Internationale de la Femme",
    folderPath: "JOURNEE INTERNATIONALE DE LA FEMME",
    category: "evenements",
    count: 9,
    thumbnail: "/gallery/JOURNEE INTERNATIONALE DE LA FEMME/1.jpg",
    description: "Célébration et autonomisation des femmes",
    pngFiles: [8, 9]
  },
  {
    id: "2",
    displayName: "Journée de la Femme Africaine",
    folderPath: "M2HC A L'OCCASION DE LA JOURNEE DE LA FEMME AFRICAINE",
    category: "evenements",
    count: 11,
    thumbnail: "/gallery/M2HC A L'OCCASION DE LA JOURNEE DE LA FEMME AFRICAINE/1.jpg",
    description: "Honorer les femmes africaines et leurs contributions",
    pngFiles: [2]
  },
  {
    id: "3",
    displayName: "Journée de l'Enfant Africain",
    folderPath: "M2HC A L'OCCASION DE LA JOURNEE DE L'ENFANT AFRICAIN",
    category: "evenements",
    count: 10,
    thumbnail: "/gallery/M2HC A L'OCCASION DE LA JOURNEE DE L'ENFANT AFRICAIN/1.jpg",
    description: "Pour le bien-être et les droits des enfants"
  },
  {
    id: "4",
    displayName: "Journée Internationale de la Jeunesse",
    folderPath: "M2HC A L'OCCASION DE LA JOURNEE INTERNATIONALE DE LA JEUNESSE",
    category: "evenements",
    count: 1,
    thumbnail: "/gallery/M2HC A L'OCCASION DE LA JOURNEE INTERNATIONALE DE LA JEUNESSE/1.jpg",
    description: "Engagement et autonomisation de la jeunesse"
  },
  {
    id: "5",
    displayName: "Journée Internationale de la Famille",
    folderPath: "M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DE LA FAMILLE",
    category: "evenements",
    count: 7,
    thumbnail: "/gallery/M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DE LA FAMILLE/1.jpg",
    description: "Célébration des liens familiaux",
    pngFiles: [2, 3, 4, 5, 7]
  },
  {
    id: "6",
    displayName: "Journée des Droits de l'Homme",
    folderPath: "M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DES DROITS DE L'HOMME",
    category: "evenements",
    count: 4,
    thumbnail: "/gallery/M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DES DROITS DE L'HOMME/1.jpg",
    description: "Promotion et protection des droits humains"
  },
  {
    id: "7",
    displayName: "Journée des Personnes en Situation de Handicap",
    folderPath: "M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP",
    category: "evenements",
    count: 8,
    thumbnail: "/gallery/M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP/1.jpg",
    description: "Inclusion et dignité pour tous"
  },
  {
    id: "8",
    displayName: "16 Jours d'Activisme contre les Violences",
    folderPath: "M2HC A L'OCCASION DES 16 JOURS D'ACTIVISME CONTRE LES VIOLENCES BASEES SUR LE GENRE",
    category: "evenements",
    count: 24,
    thumbnail: "/gallery/M2HC A L'OCCASION DES 16 JOURS D'ACTIVISME CONTRE LES VIOLENCES BASEES SUR LE GENRE/2.jpg",
    description: "Lutte contre les violences basées sur le genre",
    pngFiles: [1]
  },
  {
    id: "9",
    displayName: "Campagnes de Santé Holistique",
    folderPath: "CAMPAGNE DE SANTE HOLISTIQUE",
    category: "sante",
    count: 26,
    thumbnail: "/gallery/CAMPAGNE DE SANTE HOLISTIQUE/5.jpg",
    description: "Interventions en zones rurales et urbaines",
    pngFiles: [9, 11, 16, 17, 18, 20, 24]
  },
  {
    id: "10",
    displayName: "Présentation de M2HC au GFAC à Istanbul",
    folderPath: "M2HC A L'ETRANGER",
    category: "international",
    count: 4,
    thumbnail: "/gallery/M2HC A L'ETRANGER/1.jpg",
    description: "Notre impact au-delà des frontières",
    pngFiles: [4]
  },
  {
    id: "11",
    displayName: "M2HC et les Institutions",
    folderPath: "M2HC ET LES INSTITUTIONS",
    category: "institutions",
    count: 9,
    thumbnail: "/gallery/M2HC ET LES INSTITUTIONS/2.jpg",
    description: "Partenariats institutionnels",
    pngFiles: [9]
  },
  {
    id: "12",
    displayName: "Personnes Déplacées Internes du NOSO",
    folderPath: "PRISE EN CHARGE HOLISTIQUE DES PERSONNES DEPLACÉES INTERNES DU NOSO, PAR M2HC EN COLLABORATION AVEC ASCOVIME AU SIEGE DE M2HC",
    category: "communautaire",
    count: 6,
    thumbnail: "/gallery/PRISE EN CHARGE HOLISTIQUE DES PERSONNES DEPLACÉES INTERNES DU NOSO, PAR M2HC EN COLLABORATION AVEC ASCOVIME AU SIEGE DE M2HC/1.jpg",
    description: "Accompagnement holistique des PDI"
  },
  {
    id: "13",
    displayName: "Réarmement Moral pendant le COVID",
    folderPath: "REARMEMENT MORAL DU PERSONNEL DE SANTE PENDANT LE COVID",
    category: "institutions",
    count: 4,
    thumbnail: "/gallery/REARMEMENT MORAL DU PERSONNEL DE SANTE PENDANT LE COVID/1.jpg",
    description: "Soutien au personnel de santé"
  },
  {
    id: "14",
    displayName: "Programmes Jeunesse",
    folderPath: "jeunesse",
    category: "jeunesse",
    count: 8,
    thumbnail: "/gallery/jeunesse/1.jpg",
    description: "Accompagnement et formation des jeunes"
  },
  {
    id: "15",
    displayName: "Remise de Dons Scolaires",
    folderPath: "REMISE DE DONS SCOLAIRES",
    category: "communautaire",
    count: 1,
    thumbnail: "/gallery/REMISE DE DONS SCOLAIRES/1.jpg",
    description: "Soutien à l'éducation des enfants"
  },
]

const categories = [
  { value: "all", label: "Toutes les Collections" },
  { value: "evenements", label: "Événements & Journées" },
  { value: "sante", label: "Campagnes de Santé" },
  { value: "communautaire", label: "Actions Communautaires" },
  { value: "institutions", label: "Institutions" },
  { value: "jeunesse", label: "Jeunesse" },
  { value: "international", label: "International" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFolder, setSelectedFolder] = useState<GalleryFolder | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const getImagePath = (folder: GalleryFolder, imageNumber: number): string => {
    const ext = folder.pngFiles?.includes(imageNumber) ? "png" : "jpg"
    return `/gallery/${folder.folderPath}/${imageNumber}.${ext}`
  }

  const generateFolderImages = (folder: GalleryFolder): string[] => {
    const images: string[] = []
    for (let i = 1; i <= folder.count; i++) {
      images.push(getImagePath(folder, i))
    }
    return images
  }

  const filteredFolders = galleryFolders.filter(
    (folder) => selectedCategory === "all" || folder.category === selectedCategory
  )

  // Navigation dans le lightbox
  const goToNextImage = () => {
    if (selectedFolder && selectedImageIndex !== null) {
      const nextIndex = (selectedImageIndex + 1) % selectedFolder.count
      setSelectedImageIndex(nextIndex)
    }
  }

  const goToPrevImage = () => {
    if (selectedFolder && selectedImageIndex !== null) {
      const prevIndex = selectedImageIndex === 0 ? selectedFolder.count - 1 : selectedImageIndex - 1
      setSelectedImageIndex(prevIndex)
    }
  }

  // Si un dossier est sélectionné, afficher sa galerie
  if (selectedFolder) {
    const folderImages = generateFolderImages(selectedFolder)
    
    return (
      <div className="min-h-screen py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              onClick={() => {
                setSelectedFolder(null)
                setSelectedImageIndex(null)
              }}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux collections
            </Button>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </Link>
          </div>

          {/* Folder Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{ color: '#0D47A1' }}>
              {selectedFolder.displayName}
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-2">
              {selectedFolder.description}
            </p>
            <p className="text-gray-500">
              {selectedFolder.count} {selectedFolder.count > 1 ? 'photos' : 'photo'}
            </p>
          </motion.div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {folderImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${selectedFolder.displayName} - Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 md:h-12 md:w-12" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {index + 1}/{selectedFolder.count}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImageIndex(null)}
              >
                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-10"
                  onClick={() => setSelectedImageIndex(null)}
                >
                  <X className="h-6 w-6 md:h-8 md:w-8" />
                </button>
                
                {/* Navigation Arrows */}
                {selectedFolder.count > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        goToPrevImage()
                      }}
                    >
                      <ArrowLeft className="h-6 w-6" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        goToNextImage()
                      }}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={folderImages[selectedImageIndex]}
                    alt={`${selectedFolder.displayName} - Photo ${selectedImageIndex + 1}`}
                    className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                  />
                  <p className="text-white text-center mt-4 text-sm md:text-base">
                    Photo {selectedImageIndex + 1} / {selectedFolder.count}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // Vue par défaut : afficher les panneaux de dossiers
  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6" style={{ backgroundColor: '#0D47A1' }}>
              <ImageIcon className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Galerie M2HC
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Découvrez en images nos actions de santé holistique et nos interventions sur le terrain
            </p>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all shadow-sm hover:shadow-md ${
                selectedCategory === category.value
                  ? "text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={selectedCategory === category.value ? { backgroundColor: '#0D47A1' } : {}}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredFolders.length} {filteredFolders.length > 1 ? 'collections' : 'collection'} • {' '}
            {filteredFolders.reduce((sum, folder) => sum + folder.count, 0)} photos au total
          </p>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredFolders.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card 
                className="cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full"
                onClick={() => setSelectedFolder(folder)}
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={folder.thumbnail}
                    alt={folder.displayName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold shadow-lg" style={{ color: '#0D47A1' }}>
                    {folder.count} {folder.count > 1 ? 'photos' : 'photo'}
                  </div>
                </div>
                <CardContent className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-[#0D47A1] transition-colors line-clamp-2">
                    {folder.displayName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {folder.description}
                  </p>
                  <div className="flex items-center text-[#0D47A1] font-medium text-sm">
                    Voir les photos
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredFolders.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune collection trouvée pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  )
}
