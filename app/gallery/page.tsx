"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Image as ImageIcon, ChevronRight, ArrowLeft, ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/ImageCarousel"

interface GalleryFolder {
  id: string
  name: string
  displayName: string
  folderPath: string
  category: string
  count: number
  thumbnail: string
  description: string
}

const galleryFolders: GalleryFolder[] = [
  {
    id: "1",
    name: "JOURNEE INTERNATIONALE DE LA FEMME",
    displayName: "Journée Internationale de la Femme",
    folderPath: "JOURNEE INTERNATIONALE DE LA FEMME",
    category: "evenements",
    count: 9,
    thumbnail: "/gallery/JOURNEE INTERNATIONALE DE LA FEMME/1.jpg",
    description: "Célébration et autonomisation des femmes"
  },
  {
    id: "2",
    name: "FEMME_AFRICAINE",
    displayName: "Journée de la Femme Africaine",
    folderPath: "JOURNEE DE LA FEMME AFRICAINE",
    category: "evenements",
    count: 11,
    thumbnail: "/gallery/JOURNEE DE LA FEMME AFRICAINE/1.jpg",
    description: "Honorer les femmes africaines et leurs contributions"
  },
  {
    id: "3",
    name: "ENFANT_AFRICAIN",
    displayName: "Journée de l'Enfant Africain",
    folderPath: "JOURNEE DE L ENFANT AFRICAIN",
    category: "evenements",
    count: 10,
    thumbnail: "/gallery/JOURNEE DE L ENFANT AFRICAIN/1.jpg",
    description: "Pour le bien-être et les droits des enfants"
  },
  {
    id: "4",
    name: "JEUNESSE",
    displayName: "Journée Internationale de la Jeunesse",
    folderPath: "JOURNEE INTERNATIONALE DE LA JEUNESSE",
    category: "evenements",
    count: 1,
    thumbnail: "/gallery/JOURNEE INTERNATIONALE DE LA JEUNESSE/1.jpg",
    description: "Engagement et autonomisation de la jeunesse"
  },
  {
    id: "5",
    name: "FAMILLE",
    displayName: "Journée Internationale de la Famille",
    folderPath: "JOURNÉE INTERNATIONALE DE LA FAMILLE",
    category: "evenements",
    count: 7,
    thumbnail: "/gallery/JOURNÉE INTERNATIONALE DE LA FAMILLE/1.jpg",
    description: "Célébration des liens familiaux"
  },
  {
    id: "6",
    name: "DROITS_HOMME",
    displayName: "Journée des Droits de l'Homme",
    folderPath: "JOURNÉE INTERNATIONALE DES DROITS DE L HOMME",
    category: "evenements",
    count: 4,
    thumbnail: "/gallery/JOURNÉE INTERNATIONALE DES DROITS DE L HOMME/1.jpg",
    description: "Promotion et protection des droits humains"
  },
  {
    id: "7",
    name: "HANDICAP",
    displayName: "Journée des Personnes en Situation de Handicap",
    folderPath: "JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP",
    category: "evenements",
    count: 8,
    thumbnail: "/gallery/JOURNÉE INTERNATIONALE DES PERSONNES EN SITUATION DE HANDICAP/1.jpg",
    description: "Inclusion et dignité pour tous"
  },
  {
    id: "8",
    name: "16_JOURS",
    displayName: "16 Jours d'Activisme contre les Violences",
    folderPath: "16 JOURS DACTIVISME CONTRE LES VIOLENCES BASEES SUR LE GENRE",
    category: "evenements",
    count: 24,
    thumbnail: "/gallery/16 JOURS DACTIVISME CONTRE LES VIOLENCES BASEES SUR LE GENRE/2.jpg",
    description: "Lutte contre les violences basées sur le genre"
  },
  {
    id: "9",
    name: "CAMPAGNE_SANTE",
    displayName: "Campagnes de Santé Holistique",
    folderPath: "CAMPAGNE DE SANTE HOLISTIQUE",
    category: "sante",
    count: 26,
    thumbnail: "/gallery/CAMPAGNE DE SANTE HOLISTIQUE/5.jpg",
    description: "Interventions en zones rurales et urbaines"
  },
  {
    id: "10",
    name: "ETRANGER",
    displayName: "M2HC à l'International",
    folderPath: "M2HC A LETRANGER",
    category: "international",
    count: 4,
    thumbnail: "/gallery/M2HC A LETRANGER/1.jpg",
    description: "Notre impact au-delà des frontières"
  },
  {
    id: "11",
    name: "INSTITUTIONS",
    displayName: "M2HC et les Institutions",
    folderPath: "M2HC ET LES INSTITUTIONS",
    category: "institutions",
    count: 9,
    thumbnail: "/gallery/M2HC ET LES INSTITUTIONS/2.jpg",
    description: "Partenariats institutionnels"
  },
  {
    id: "12",
    name: "NOSO",
    displayName: "Personnes Déplacées Internes du NOSO",
    folderPath: "PRISE EN CHARGE HOLISTIQUE DES PERSONNES DEPLACÉES INTERNES DU NOSO, PAR M2HC EN COLLABORATION AVEC ASCOVIME AU SIEGE DE M2HC",
    category: "communautaire",
    count: 6,
    thumbnail: "/gallery/PRISE EN CHARGE HOLISTIQUE DES PERSONNES DEPLACÉES INTERNES DU NOSO, PAR M2HC EN COLLABORATION AVEC ASCOVIME AU SIEGE DE M2HC/1.jpg",
    description: "Accompagnement holistique des PDI"
  },
  {
    id: "13",
    name: "COVID",
    displayName: "Réarmement Moral pendant le COVID",
    folderPath: "REARMEMENT MORAL DU PERSONNEL DE SANTE PENDANT LE COVID",
    category: "institutions",
    count: 4,
    thumbnail: "/gallery/REARMEMENT MORAL DU PERSONNEL DE SANTE PENDANT LE COVID/1.jpg",
    description: "Soutien au personnel de santé"
  },
  {
    id: "14",
    name: "JEUNESSE_PROG",
    displayName: "Programmes Jeunesse",
    folderPath: "jeunesse",
    category: "jeunesse",
    count: 8,
    thumbnail: "/gallery/jeunesse/1.jpg",
    description: "Accompagnement et formation des jeunes"
  },
  {
    id: "15",
    name: "DONS_SCOLAIRES",
    displayName: "Remise de Dons Scolaires",
    folderPath: "REMISE DE DONS SCOLAIRES",
    category: "communautaire",
    count: 1,
    thumbnail: "/gallery/REMISE DE DONS SCOLAIRES/1.jpg",
    description: "Soutien à l'éducation des enfants"
  },
]

const categories = [
  { value: "all", label: "Tous" },
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getImageExtension = (folderPath: string, imageNumber: number): string => {
    let ext = "jpg"
    
    // CAMPAGNE DE SANTE HOLISTIQUE
    if (folderPath === "CAMPAGNE DE SANTE HOLISTIQUE") {
      if ([9, 11, 16, 17, 18, 20, 24].includes(imageNumber)) ext = "png"
    } 
    // JOURNEE INTERNATIONALE DE LA FEMME
    else if (folderPath === "JOURNEE INTERNATIONALE DE LA FEMME") {
      if ([8, 9].includes(imageNumber)) ext = "png"
    }
    // M2HC A L'ETRANGER
    else if (folderPath === "M2HC A L'ETRANGER") {
      if (imageNumber === 4) ext = "png"
    }
    // M2HC A L'OCCASION DE LA JOURNEE DE LA FEMME AFRICAINE
    else if (folderPath === "M2HC A L'OCCASION DE LA JOURNEE DE LA FEMME AFRICAINE") {
      if (imageNumber === 2) ext = "png"
    }
    // M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DE LA FAMILLE
    else if (folderPath === "M2HC A L'OCCASION DE LA JOURNÉE INTERNATIONALE DE LA FAMILLE") {
      if ([2, 3, 4, 5, 7].includes(imageNumber)) ext = "png"
    }
    // M2HC A L'OCCASION DES 16 JOURS D'ACTIVISME
    else if (folderPath === "M2HC A L'OCCASION DES 16 JOURS D'ACTIVISME CONTRE LES VIOLENCES BASEES SUR LE GENRE") {
      if (imageNumber === 1) ext = "png"
    }
    // M2HC ET LES INSTITUTIONS
    else if (folderPath === "M2HC ET LES INSTITUTIONS") {
      if (imageNumber === 9) ext = "png"
    }
    
    return ext
  }

  const generateFolderImages = (folder: GalleryFolder) => {
    const images: string[] = []
    for (let i = 1; i <= folder.count; i++) {
      const ext = getImageExtension(folder.folderPath, i)
      images.push(`/gallery/${folder.folderPath}/${i}.${ext}`)
    }
    return images
  }

  const filteredFolders = galleryFolders.filter(
    (folder) => selectedCategory === "all" || folder.category === selectedCategory
  )

  // Générer les images du dossier sélectionné
  const folderImages = selectedFolder ? generateFolderImages(selectedFolder) : []

  // Navigation au clavier dans la lightbox
  useEffect(() => {
    if (!selectedImage || !selectedFolder) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        const newIndex = currentImageIndex - 1
        setCurrentImageIndex(newIndex)
        setSelectedImage(folderImages[newIndex])
      } else if (e.key === 'ArrowRight' && currentImageIndex < folderImages.length - 1) {
        const newIndex = currentImageIndex + 1
        setCurrentImageIndex(newIndex)
        setSelectedImage(folderImages[newIndex])
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentImageIndex, folderImages, selectedFolder])

  // Si un dossier est sélectionné, afficher sa galerie
  if (selectedFolder) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            onClick={() => setSelectedFolder(null)}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux collections
          </Button>

          {/* Folder Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0D47A1' }}>
              {selectedFolder.displayName}
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedFolder.description}
            </p>
            <p className="text-gray-500 mt-2">
              {selectedFolder.count} {selectedFolder.count > 1 ? 'photos' : 'photo'}
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folderImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
                onClick={() => {
                  setCurrentImageIndex(index)
                  setSelectedImage(image)
                }}
              >
                <img
                  src={image}
                  alt={`${selectedFolder.displayName} - Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-8 w-8" />
              </button>

              {/* Previous button */}
              {currentImageIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newIndex = currentImageIndex - 1
                    setCurrentImageIndex(newIndex)
                    setSelectedImage(folderImages[newIndex])
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
              )}

              {/* Next button */}
              {currentImageIndex < folderImages.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newIndex = currentImageIndex + 1
                    setCurrentImageIndex(newIndex)
                    setSelectedImage(folderImages[newIndex])
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm z-10">
                {currentImageIndex + 1} / {folderImages.length}
              </div>

              {/* Image */}
              <img
                src={selectedImage}
                alt="Image agrandie"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Vue par défaut : afficher les panneaux de dossiers
  return (
    <div className="py-12 bg-gray-50">
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
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

        {/* Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolders.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className="bg-white rounded-lg cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                onClick={() => {
                  console.log("Clicking folder:", folder.displayName)
                  setSelectedFolder(folder)
                }}
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={folder.thumbnail}
                    alt={folder.displayName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-semibold" style={{ color: '#0D47A1' }}>
                    {folder.count} {folder.count > 1 ? 'photos' : 'photo'}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#0D47A1] transition-colors">
                    {folder.displayName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {folder.description}
                  </p>
                  <div className="flex items-center text-[#0D47A1] font-medium text-sm">
                    Voir les photos
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFolders.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucune collection trouvée pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  )
}
