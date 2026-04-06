"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote, Filter, Upload, X, Image as ImageIcon, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { useTranslations, useLocale } from "next-intl"

interface Testimonial {
  id: string
  name: string
  rating: number
  message: string
  photo?: string
  createdAt: string
}

export default function TestimonialsPage() {
  const t = useTranslations('testimonials')
  const locale = useLocale()

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "", rating: 5 })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const filterOptions = [
    { label: t('all'), value: "all" },
    { label: t('stars5'), value: "5" },
    { label: t('stars4'), value: "4" },
    { label: t('recent'), value: "recent" },
  ]

  const getMockTestimonials = () => {
    if (locale === 'en') {
      return [
        {
          id: "mock-1",
          name: "Marie Kamga",
          rating: 5,
          message: "M2HC transformed my life. After years of struggling with mental health issues, their holistic approach gave me the tools and support I needed to heal. I'm now helping others in my community.",
          createdAt: "2024-11-15"
        },
        {
          id: "mock-2",
          name: "Joseph Nkeng",
          rating: 5,
          message: "The psychosocial support I received helped me through one of the darkest periods of my life. The team is professional, compassionate, and truly cares about making a difference.",
          createdAt: "2024-10-28"
        },
        {
          id: "mock-3",
          name: "Aminata Diallo",
          rating: 5,
          message: "As a young woman, I felt lost and without direction. M2HC's empowerment programs gave me confidence and skills. Today, I run my own small business and mentor other young women.",
          createdAt: "2024-09-12"
        },
        {
          id: "mock-4",
          name: "Dr. Paul Mbarga",
          rating: 5,
          message: "As a healthcare professional, I've seen firsthand the impact of M2HC's work. Their holistic approach to health addresses not just physical needs but mental and social wellbeing too.",
          createdAt: "2024-08-20"
        },
        {
          id: "mock-5",
          name: "Fatima Ngono",
          rating: 5,
          message: "The support during my pregnancy and after childbirth was invaluable. M2HC made sure I had access to quality care and emotional support throughout my journey to motherhood.",
          createdAt: "2024-07-05"
        },
        {
          id: "mock-6",
          name: "Jean-Claude Fouda",
          rating: 4,
          message: "M2HC helped me and my family after we were displaced. They provided not just material support, but also psychological counseling that helped us process our trauma and rebuild our lives.",
          createdAt: "2024-06-18"
        }
      ]
    } else {
      return [
        {
          id: "mock-1",
          name: "Marie Kamga",
          rating: 5,
          message: "M2HC a transformé ma vie. Après des années de lutte contre des problèmes de santé mentale, leur approche holistique m'a donné les outils et le soutien dont j'avais besoin pour guérir. J'aide maintenant d'autres personnes dans ma communauté.",
          createdAt: "2024-11-15"
        },
        {
          id: "mock-2",
          name: "Joseph Nkeng",
          rating: 5,
          message: "Le soutien psychosocial que j'ai reçu m'a aidé à traverser l'une des périodes les plus sombres de ma vie. L'équipe est professionnelle, compatissante et se soucie vraiment de faire une différence.",
          createdAt: "2024-10-28"
        },
        {
          id: "mock-3",
          name: "Aminata Diallo",
          rating: 5,
          message: "En tant que jeune femme, je me sentais perdue et sans direction. Les programmes d'autonomisation de M2HC m'ont donné confiance et compétences. Aujourd'hui, je dirige ma propre petite entreprise et je suis mentor pour d'autres jeunes femmes.",
          createdAt: "2024-09-12"
        },
        {
          id: "mock-4",
          name: "Dr. Paul Mbarga",
          rating: 5,
          message: "En tant que professionnel de la santé, j'ai vu de mes propres yeux l'impact du travail de M2HC. Leur approche holistique de la santé aborde non seulement les besoins physiques mais aussi le bien-être mental et social.",
          createdAt: "2024-08-20"
        },
        {
          id: "mock-5",
          name: "Fatima Ngono",
          rating: 5,
          message: "Le soutien pendant ma grossesse et après l'accouchement a été inestimable. M2HC s'est assuré que j'avais accès à des soins de qualité et à un soutien émotionnel tout au long de mon parcours vers la maternité.",
          createdAt: "2024-07-05"
        },
        {
          id: "mock-6",
          name: "Jean-Claude Fouda",
          rating: 4,
          message: "M2HC m'a aidé, moi et ma famille, après notre déplacement. Ils ont fourni non seulement un soutien matériel, mais aussi des conseils psychologiques qui nous ont aidés à traiter notre traumatisme et à reconstruire nos vies.",
          createdAt: "2024-06-18"
        }
      ]
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [locale])

  const fetchTestimonials = async () => {
    try {
      // Utiliser toujours les témoignages mock traduits
      setTestimonials(getMockTestimonials())
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      setTestimonials(getMockTestimonials())
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          rating: formData.rating,
          photo: photoPreview,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(
          t('successMessage'),
          { duration: 5000, position: 'top-center' }
        )
        setFormData({ name: "", email: "", message: "", rating: 5 })
        setPhotoFile(null)
        setPhotoPreview(null)
        setShowForm(false)
        // Pas besoin de recharger car le témoignage doit être approuvé d'abord
      } else {
        toast.error(data.error || t('error'), { duration: 4000 })
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      toast.error(t('errorConnection'), { duration: 4000 })
    } finally {
      setSubmitting(false)
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
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2" style={{ color: '#0D47A1' }}>15,000+</div>
              <p className="text-sm md:text-base text-gray-600">{t('peopleHelped')}</p>
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
              <p className="text-sm md:text-base text-gray-600">{t('averageRating')}</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-1 md:mb-2">95%</div>
              <p className="text-sm md:text-base text-gray-600">{t('satisfaction')}</p>
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
            <p className="mt-4 text-gray-600">{t('loading')}</p>
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
                            className={`h-5 w-5 ${i < testimonial.rating
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
                          {new Date(testimonial.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR')}
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
            <p className="text-gray-600 text-lg">{t('noTestimonials')}</p>
          </div>
        )}

        {/* Testimonial Form Section */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          {!showForm ? (
            <div className="text-center rounded-2xl p-6 md:p-10 lg:p-12" style={{ background: 'linear-gradient(to right, #0D47A1, #8B6F47)' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4 px-4">
                {t('shareExperience')}
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-4 md:mb-6 max-w-2xl mx-auto px-4">
                {t('shareExperienceDesc')}
              </p>
              <Button
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-white hover:bg-gray-100 text-sm md:text-base"
                style={{ color: '#0D47A1' }}
              >
                {t('shareBtn')}
              </Button>
            </div>
          ) : (
            <Card className="max-w-3xl mx-auto">
              <CardContent className="pt-6 px-4 md:px-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#0D47A1' }}>
                    {t('newTestimonial')}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForm(false)
                      setFormData({ name: "", email: "", message: "", rating: 5 })
                      setPhotoFile(null)
                      setPhotoPreview(null)
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('yourName')} *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('yourName')}
                      className="w-full"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('yourEmail')} *
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('yourEmail')}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('emailNotPublished')}
                    </p>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('rating')} *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${star <= formData.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('yourMessage')} *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('messagePlaceholder')}
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('photo')}
                    </label>
                    <div className="mt-2">
                      {photoPreview ? (
                        <div className="relative inline-block">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoFile(null)
                              setPhotoPreview(null)
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">
                              {t('choosePhoto')}
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full"
                    style={{ backgroundColor: '#0D47A1' }}
                  >
                    {submitting ? t('submitting') : t('submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
