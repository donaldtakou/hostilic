"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  rating: number
  message: string
  createdAt: string
}

const filterOptions = [
  { label: "Tous", value: "all" },
  { label: "5 étoiles", value: "5" },
  { label: "4 étoiles", value: "4" },
  { label: "Récents", value: "recent" },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/feedback?limit=50")
      const data = await response.json()
      setTestimonials(data.feedbacks || [])
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === "all") return true
    if (filter === "5") return t.rating === 5
    if (filter === "4") return t.rating === 4
    if (filter === "recent") return true // Déjà trié par date
    return true
  })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6" style={{ backgroundColor: '#0D47A1' }}>
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
              Témoignages
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Découvrez les témoignages de ceux qui ont bénéficié de notre accompagnement holistique
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2" style={{ color: '#0D47A1' }}>1,000+</div>
              <p className="text-sm md:text-base text-gray-600">Personnes accompagnées</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-1 md:mb-2">4.8</div>
              <div className="flex justify-center mb-1 md:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-600">Note moyenne</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-1 md:mb-2">95%</div>
              <p className="text-sm md:text-base text-gray-600">Satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          <Filter className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className="text-xs md:text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des témoignages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="h-6 w-6" style={{ color: '#8B6F47', opacity: 0.3 }} />
                    </div>
                    <p className="text-gray-700 mb-4 italic line-clamp-4">
                      "{testimonial.message}"
                    </p>
                    <div className="flex items-center mt-4 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ background: 'linear-gradient(to bottom right, #0D47A1, #8B6F47)' }}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(testimonial.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredTestimonials.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Aucun témoignage trouvé pour ce filtre.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 lg:mt-20 text-center rounded-2xl p-6 md:p-10 lg:p-12" style={{ background: 'linear-gradient(to right, #0D47A1, #8B6F47)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4 px-4">
            Partagez votre expérience
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-4 md:mb-6 max-w-2xl mx-auto px-4">
            Votre témoignage peut inspirer et aider d'autres personnes dans leur parcours de guérison
          </p>
          <Button size="lg" className="bg-white hover:bg-gray-100 text-sm md:text-base" style={{ color: '#0D47A1' }}>
            Laisser un témoignage
          </Button>
        </div>
      </div>
    </div>
  )
}
