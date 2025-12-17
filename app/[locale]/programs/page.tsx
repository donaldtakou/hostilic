"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Heart, Baby, HandHeart, UserCircle, Building2, Activity, Stethoscope, BrainCircuit, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function ProgramsPage() {
  const t = useTranslations('programs')
  const tAxes = useTranslations('programs.axes')
  const tActions = useTranslations('programs.actions')
  const tCta = useTranslations('programs.cta')
  
  const strategicAxes = [
  {
    id: 1,
    title: tAxes('earlyChildhood.title'),
    description: tAxes('earlyChildhood.description'),
    icon: Baby,
    color: "blue",
    features: [
      tAxes('earlyChildhood.feature1'),
      tAxes('earlyChildhood.feature2'),
      tAxes('earlyChildhood.feature3'),
      tAxes('earlyChildhood.feature4'),
    ],
  },
  {
    id: 2,
    title: tAxes('women.title'),
    description: tAxes('women.description'),
    icon: HandHeart,
    color: "red",
    features: [
      tAxes('women.feature1'),
      tAxes('women.feature2'),
      tAxes('women.feature3'),
      tAxes('women.feature4'),
    ],
  },
  {
    id: 3,
    title: tAxes('youth.title'),
    description: tAxes('youth.description'),
    icon: UserCircle,
    color: "blue",
    features: [
      tAxes('youth.feature1'),
      tAxes('youth.feature2'),
      tAxes('youth.feature3'),
      tAxes('youth.feature4'),
    ],
  },
  {
    id: 4,
    title: tAxes('community.title'),
    description: tAxes('community.description'),
    icon: Users,
    color: "green",
    features: [
      tAxes('community.feature1'),
      tAxes('community.feature2'),
      tAxes('community.feature3'),
      tAxes('community.feature4'),
    ],
  },
  {
    id: 5,
    title: tAxes('institutions.title'),
    description: tAxes('institutions.description'),
    icon: Building2,
    color: "blue",
    features: [
      tAxes('institutions.feature1'),
      tAxes('institutions.feature2'),
      tAxes('institutions.feature3'),
      tAxes('institutions.feature4'),
    ],
  },
]

  const actions = [
    {
      title: tActions('psychosocial'),
      description: tActions('psychosocialDesc'),
      icon: BrainCircuit,
      link: '/blog?category=health',
    },
    {
      title: tActions('awareness'),
      description: tActions('awarenessDesc'),
      icon: Users,
      link: '/blog?category=women',
    },
    {
      title: tActions('campaigns'),
      description: tActions('campaignsDesc'),
      icon: Stethoscope,
      link: '/blog?category=campaigns',
    },
    {
      title: tActions('community'),
      description: tActions('communityDesc'),
      icon: Heart,
      link: '/blog?category=campaigns',
    },
    {
      title: tActions('morale'),
      description: tActions('moraleDesc'),
      icon: Activity,
      link: '/blog?category=health',
    },
  ]
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
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 px-4">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strategic Axes */}
        <section className="py-12 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              {t('strategicAxes')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 px-4">
              {t('strategicAxesSubtitle')}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {strategicAxes.map((axe, index) => (
              <motion.div
                key={axe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Left Side - Icon & Info */}
                    <div 
                      className="text-white p-6 md:p-8 flex flex-col justify-center"
                      style={{ 
                        backgroundColor: axe.color === 'blue' ? '#0D47A1' : axe.color === 'red' ? '#8B6F47' : axe.color === 'green' ? '#43A047' : '#0D47A1'
                      }}
                    >
                      <div className="inline-flex p-3 md:p-4 bg-white/20 rounded-xl mb-3 md:mb-4 w-fit">
                        <axe.icon className="h-10 w-10 md:h-12 md:w-12" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{axe.title}</h3>
                      <p className="text-sm md:text-base text-white/90">{axe.description}</p>
                    </div>

                    {/* Right Side - Details */}
                    <div className="lg:col-span-2 p-6 md:p-8">
                      <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">
                        {t('interventions')}
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {axe.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2 md:space-x-3">
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm md:text-base text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Link to related blog posts */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Link 
                          href={`/blog?category=${axe.color === 'red' ? 'women' : axe.color === 'green' ? 'campaigns' : 'youth'}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold hover:underline transition-colors"
                          style={{ color: '#0D47A1' }}
                        >
                          {tAxes('seeActions')} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="py-12 md:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                {tActions('title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 px-4">
                {tActions('subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {actions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={action.link} className="block h-full">
                    <Card className="h-full text-center hover:shadow-xl transition-all hover:scale-105 bg-white cursor-pointer">
                      <CardContent className="pt-6 md:pt-8 px-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4" style={{ backgroundColor: '#8B6F47' }}>
                          <action.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">
                          {action.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-3">{action.description}</p>
                        <div className="inline-flex items-center gap-1 text-xs font-semibold mt-2" style={{ color: '#0D47A1' }}>
                          {tActions('seeMore')} <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="py-8 md:py-12 px-4 text-center rounded-2xl" style={{ backgroundColor: '#0D47A1', color: 'white' }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
                {tCta('title')}
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto" style={{ opacity: 0.9 }}>
                {tCta('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-100" style={{ color: '#0D47A1' }}>
                    {tCta('contactBtn')}
                  </Button>
                </Link>
                <Link href="/donate" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    {tCta('donateBtn')}
                  </Button>
                </Link>
              </div>
          </div>
        </section>
      </div>
    </div>
  )
}
