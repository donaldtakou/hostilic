"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Search, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "À propos",
    question: "Qu'est-ce que M2HC ?",
    answer: "M2HC (Marguerita Holistic Health Center) est une organisation de santé holistique au Cameroun dédiée au bien-être global. Nous offrons un accompagnement holistique des personnes pour leur bien-être physique, mental, émotionnel et social."
  },
  {
    id: 2,
    category: "À propos",
    question: "Quelles sont vos valeurs ?",
    answer: "Nos valeurs fondamentales sont : la dignité humaine, l'approche holistique, l'autonomisation, l'empathie et l'écoute, l'équité et l'inclusion, ainsi que l'intégrité et le professionnalisme."
  },
  {
    id: 3,
    category: "Programmes",
    question: "Quels programmes proposez-vous ?",
    answer: "Nous proposons 5 axes stratégiques : campagnes de santé holistique, programmes pour les femmes, programmes jeunesse, programmes famille et enfants, et accompagnement des personnes en situation de handicap ou déplacées."
  },
  {
    id: 4,
    category: "Programmes",
    question: "Comment puis-je bénéficier de vos programmes ?",
    answer: "Vous pouvez nous contacter via notre formulaire de contact, par email à mholistichealthcenter@gmail.com, ou consulter la page Programmes pour plus de détails sur chaque programme."
  },
  {
    id: 5,
    category: "Dons",
    question: "Comment puis-je faire un don ?",
    answer: "Vous pouvez faire un don en ligne via notre page Donations, par virement bancaire au compte 679 012 650 01 (Ecobank), ou via Mobile Money (Orange Money / MTN Mobile Money)."
  },
  {
    id: 6,
    category: "Dons",
    question: "Les dons sont-ils sécurisés ?",
    answer: "Oui, tous nos paiements sont sécurisés avec cryptage des transactions. Vous recevez automatiquement un reçu fiscal par email. Aucune donnée bancaire n'est stockée."
  },
  {
    id: 7,
    category: "Dons",
    question: "Puis-je faire un don mensuel ?",
    answer: "Oui, nous proposons des options de dons ponctuels et de dons mensuels. Vous pouvez également parrainer un programme spécifique."
  },
  {
    id: 8,
    category: "Contact",
    question: "Comment vous contacter ?",
    answer: "Vous pouvez nous contacter par email à mholistichealthcenter@gmail.com, via notre formulaire de contact sur le site, ou consulter notre page Contact pour toutes les coordonnées."
  },
  {
    id: 9,
    category: "Contact",
    question: "Sous quel délai répondez-vous ?",
    answer: "Nous nous engageons à répondre à toutes les demandes sous 24 à 48 heures ouvrables."
  },
  {
    id: 10,
    category: "Santé",
    question: "Proposez-vous des consultations gratuites ?",
    answer: "Oui, nous organisons régulièrement des campagnes de santé avec consultations médicales gratuites en zones rurales et urbaines, incluant dépistage, prévention et distribution de médicaments."
  },
  {
    id: 11,
    category: "Santé",
    question: "Intervenez-vous dans ma région ?",
    answer: "Nous intervenons dans 7+ zones au Cameroun. Contactez-nous pour savoir si nous sommes présents dans votre région ou pour organiser une intervention."
  },
  {
    id: 12,
    category: "Événements",
    question: "Quels événements organisez-vous ?",
    answer: "Nous organisons des journées thématiques : Journée Internationale de la Femme, Journée de la Femme Africaine, 16 Jours d'Activisme contre les VBG, Journée de l'Enfant Africain, Journée des Droits de l'Homme, et bien d'autres."
  },
]

const categories = ["Tous", "À propos", "Programmes", "Dons", "Contact", "Santé", "Événements"]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "Tous" || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#0D47A1' }}>
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur M2HC
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-base font-medium transition-all ${
                selectedCategory === category
                  ? "text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
              style={selectedCategory === category ? { backgroundColor: '#0D47A1' } : {}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium mb-2 block" style={{ color: '#0D47A1' }}>
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                        openItems.includes(faq.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucune question ne correspond à votre recherche.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto" style={{ backgroundColor: '#f5f5f5' }}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vous n'avez pas trouvé de réponse ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe est là pour répondre à toutes vos questions
              </p>
              <a href="/contact">
                <button
                  className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#0D47A1' }}
                >
                  Contactez-nous
                </button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
