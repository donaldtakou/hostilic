"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, Target, Users, Award, Eye, Shield, Sparkles, Lightbulb, CheckCircle, HandHeart, Baby, UserCircle, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const values = [
  {
    icon: Heart,
    title: "Dignité humaine",
    description: "Nous plaçons la valeur de chaque personne au centre de notre accompagnement.",
  },
  {
    icon: Sparkles,
    title: "Approche holistique",
    description: "Nous considérons l'être humain dans toutes ses dimensions : physique, mentale, émotionnelle et sociale.",
  },
  {
    icon: Target,
    title: "Autonomisation",
    description: "Nous aidons chacun, en particulier les femmes et les jeunes, à devenir acteur de son bien-être.",
  },
  {
    icon: Users,
    title: "Empathie et écoute",
    description: "Nous offrons un accompagnement bienveillant, confidentiel et respectueux.",
  },
  {
    icon: Shield,
    title: "Équité et inclusion",
    description: "Nous œuvrons pour un accès juste et accessible au bien-être pour tous.",
  },
  {
    icon: Award,
    title: "Intégrité et professionnalisme",
    description: "Nous travaillons avec éthique, rigueur et transparence.",
  },
  {
    icon: Lightbulb,
    title: "Prévention et éducation",
    description: "Nous privilégions la sensibilisation et la promotion d'un bien-être durable.",
  },
]

const strategicAxes = [
  {
    icon: Baby,
    title: "Axe Petite Enfance",
    description: "Accompagnement et développement holistique des tout-petits.",
  },
  {
    icon: HandHeart,
    title: "Axe Femme et Jeune Fille",
    description: "Autonomisation et accompagnement psychosocial des femmes et jeunes filles.",
  },
  {
    icon: UserCircle,
    title: "Axe Jeunesse",
    description: "Formation, mentorat et développement des capacités des jeunes.",
  },
  {
    icon: Users,
    title: "Axe Communautaire",
    description: "Renforcement du vivre-ensemble et des initiatives locales.",
  },
  {
    icon: Building2,
    title: "Axe Institutions et Organisations",
    description: "Valorisation du bien-être et développement professionnel.",
  },
]

const strengths = [
  "Respect de l'intérêt supérieur de l'être humain dans toutes ses dimensions",
  "Cadre apaisant apportant sérénité, paix intérieure et amour nécessaires à la guérison",
  "Équipe dynamique : médecins, psychologues, religieux, nutritionnistes, sportifs",
  "Coaching et accompagnement personnalisés des patients et des familles",
]

const achievements = [
  "Partenariat avec MINPROFF, MINAS, MINSANTE, MINEDUB, ASCOVIME",
  "Réarmement moral du personnel de santé pendant le Covid-19",
  "Campagnes de santé holistique en zones rurales (7 localités)",
  "Prise en charge holistique des personnes déplacées internes du NOSO",
  "Sensibilisations lors de journées internationales et nationales",
  "Accompagnement psychosocial et référencement",
]

const administration = [
  { name: "Pr TETANYE EKOE", role: "Président d'honneur", initials: "TE" },
  { name: "Mme VIBAN Gladys", role: "Présidente d'honneur", initials: "VG" },
  { name: "Mme ENOH Marguerite", role: "Présidente du Conseil d'administration", initials: "EM" },
  { name: "Mme BASSOUMBOUL Brigitte", role: "Secrétaire Générale", initials: "BB" },
  { name: "Mme NGONO OSSANGO Pangrace", role: "Secrétaire Générale adjointe", initials: "NP" },
  { name: "M. ONAMBELE MBEDE Jean Marie Joseph", role: "Coordonnateur", initials: "OM" },
  { name: "Mme NKOU ONDOUA Nadège", role: "Trésorière", initials: "NN" },
  { name: "M. AMOUGOU Adolphe", role: "Auditeur Interne", initials: "AA" },
  { name: "M. MAKANG Jean Pierre", role: "Conseiller n°1", initials: "MJ" },
]

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-20" style={{ backgroundColor: '#0D47A1' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              À propos de M2HC
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 px-4">
              Marguerita Holistic Health Center - Une approche holistique pour votre bien-être global
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <section className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
                      <Target className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#0D47A1' }} />
                    </div>
                    <CardTitle className="text-lg md:text-xl">Notre Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    Contribuer à l'amélioration du bien-être des individus victimes d'affections diverses, 
                    en assurant l'accompagnement et la prise en charge holistique par le biais d'appuis 
                    intégrés (éducatif, sanitaire, psychosocial, sportif, ludique, spirituel…). M2HC œuvre 
                    à la promotion du développement du capital humain, le renforcement des capacités, le 
                    soutien aux initiatives locales et le vivre-ensemble.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFEBEE' }}>
                      <Eye className="h-5 w-5 md:h-6 md:w-6" style={{ color: '#E53935' }} />
                    </div>
                    <CardTitle className="text-lg md:text-xl">Notre Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    Prémunir et contribuer à libérer l'être humain de l'état de vulnérabilité ou de 
                    mal-être grâce à l'approche holistique (mentale, émotionnelle, sociale, spirituelle, 
                    psychologique et physique), pour restaurer les équilibres fondamentaux de la personne 
                    afin de lui permettre de vivre en harmonie avec elle-même et avec l'ensemble des 
                    écosystèmes humains et sociaux.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Nos Valeurs
              </h2>
              <p className="text-lg md:text-xl text-gray-600 px-4">
                Les principes qui guident chacune de nos actions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-shadow">
                    <CardContent className="pt-6 md:pt-8 px-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 md:mb-4" style={{ backgroundColor: '#0D47A1' }}>
                        <value.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Notre Histoire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
                  <p>
                    L'ONG Marguerita Holistic Health Center naît de la vision de sa promotrice qui, 
                    après de multiples souffrances dans son corps, dans son âme et dans son esprit 
                    pendant des décennies, s'est référée auprès de plusieurs structures classiques 
                    de santé, sans obtenir le soulagement escompté.
                  </p>
                  <p>
                    Sans se décourager pour autant, elle a fait preuve de résilience pour recouvrer 
                    la santé. Sortie de cette impasse grâce à sa foi et à l'aide des personnes qui 
                    l'ont accompagnée dans le processus de guérison, elle fait le constat qu'il y a 
                    beaucoup de personnes souffrant des mêmes affections et qui n'arrivent pas à 
                    trouver un cadre approprié leur permettant de mettre les mots sur leurs maux.
                  </p>
                  <p>
                    Par conséquent, ces personnes ne pouvant obtenir de soulagement dans les structures 
                    hospitalières conventionnelles et incomprises par leur entourage immédiat, passent 
                    leur vie à aller d'un hôpital à un autre sans solutions efficaces. D'où la nécessité 
                    de créer un Centre qui prenne en charge l'homme dans sa globalité.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Strategic Axes */}
        <section className="py-12 md:py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Nos Axes Stratégiques
              </h2>
              <p className="text-lg md:text-xl text-gray-600 px-4">
                Cinq axes d'intervention pour une prise en charge complète
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
              {strategicAxes.map((axe, index) => (
                <motion.div
                  key={axe.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-shadow">
                    <CardContent className="pt-6 md:pt-8 px-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4" style={{ backgroundColor: '#8B6F47' }}>
                        <axe.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2">
                        {axe.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">{axe.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Nos Atouts
              </h2>
              <p className="text-lg md:text-xl text-gray-600 px-4">
                Ce qui fait notre différence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3 bg-white border-2 border-gray-100 p-4 md:p-6 rounded-lg hover:border-[#0D47A1] transition-colors"
                >
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-800">{strength}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-12 md:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Nos Réalisations
              </h2>
              <p className="text-lg md:text-xl text-gray-600 px-4">
                Des résultats concrets qui changent des vies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start space-x-3 bg-white p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-800">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Administration */}
        <section className="py-12 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Notre Administration
            </h2>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              Une équipe de direction expérimentée et dévouée
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {administration.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6 md:pt-8 px-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4" style={{ backgroundColor: '#0D47A1' }}>
                      {member.initials}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 md:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs md:text-sm font-medium" style={{ color: '#8B6F47' }}>
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
