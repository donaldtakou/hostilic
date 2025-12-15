"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Users, Award, TrendingUp, ArrowRight, Target, Eye, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { id: 1, name: "Partenaires actifs", value: "10+", icon: Users },
  { id: 2, name: "Personnes accompagnées", value: "1,000+", icon: Heart },
  { id: 3, name: "Axes stratégiques", value: "5", icon: Award },
  { id: 4, name: "Zones d'intervention", value: "7+", icon: TrendingUp },
]

const values = [
  {
    title: "Dignité humaine",
    description: "Nous plaçons la valeur de chaque personne au centre de notre accompagnement.",
    icon: Heart,
  },
  {
    title: "Approche holistique",
    description: "Nous considérons l'être humain dans toutes ses dimensions : physique, mentale, émotionnelle et sociale.",
    icon: Sparkles,
  },
  {
    title: "Autonomisation",
    description: "Nous aidons chacun, en particulier les femmes et les jeunes, à devenir acteur de son bien-être.",
    icon: Target,
  },
  {
    title: "Empathie et écoute",
    description: "Nous offrons un accompagnement bienveillant, confidentiel et respectueux.",
    icon: Users,
  },
  {
    title: "Équité et inclusion",
    description: "Nous œuvrons pour un accès juste et accessible au bien-être pour tous.",
    icon: Shield,
  },
  {
    title: "Intégrité et professionnalisme",
    description: "Nous travaillons avec éthique, rigueur et transparence.",
    icon: Award,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#0D47A1] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Marguerita Holistic Health Center
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-white/95 leading-relaxed px-4">
              Prémunir et contribuer à libérer l'être humain de l'état de vulnérabilité ou de mal-être grâce à l'approche holistique
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-white/90 max-w-3xl mx-auto px-4">
              Pour une santé globale, le développement du capital humain et le bien-être intégral
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/donate" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#0D47A1] hover:bg-gray-100 text-base md:text-lg px-6 md:px-8">
                  <Heart className="mr-2 h-5 w-5" />
                  Faire un don
                </Button>
              </Link>
              <Link href="/programs" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-base md:text-lg px-6 md:px-8">
                  Nos programmes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Notre Mission</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/95">
                Contribuer à l'amélioration du bien-être des individus victimes d'affections diverses, en assurant l'accompagnement et la prise en charge holistique par le biais d'appuis intégrés (éducatif, sanitaire, psychosocial, sportif, ludique, spirituel…). M2HC œuvre à la promotion du développement du capital humain, le renforcement des capacités et le vivre-ensemble.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#8B6F47] to-[#6B5437] text-white p-6 md:p-8 rounded-2xl shadow-lg"
            >
              <Eye className="h-10 w-10 md:h-12 md:w-12 mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Notre Vision</h3>
              <p className="text-base md:text-lg leading-relaxed text-white/95">
                Prémunir et contribuer à libérer l'être humain de l'état de vulnérabilité grâce à l'approche holistique (mentale, émotionnelle, sociale, spirituelle, psychologique et physique), pour restaurer les équilibres fondamentaux et vivre en harmonie.
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
                  <div className="text-gray-600 text-xs md:text-sm lg:text-base">{stat.name}</div>
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
              Nos Valeurs
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Les principes qui guident nos actions au quotidien
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6 md:p-8 hover:border-[#0D47A1] hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#8B6F47] rounded-xl mb-4 md:mb-6">
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {value.description}
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
              Rejoignez notre mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 px-4">
              Ensemble, œuvrons pour un bien-être holistique et une société plus solidaire
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/donate" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#0D47A1] hover:bg-gray-100">
                  <Heart className="mr-2 h-5 w-5" />
                  Faire un don
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10">
                  Nous contacter
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
