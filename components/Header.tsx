"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Heart, Globe } from "lucide-react"
import { Button } from "./ui/button"
import { brandColors } from "@/lib/theme"
import { useLocale, useTranslations } from 'next-intl'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('programs'), href: `/${locale}/programs` },
    { name: t('gallery'), href: `/${locale}/gallery` },
    { name: t('testimonials'), href: `/${locale}/testimonials` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('contact'), href: `/${locale}/contact` },
  ]

  const changeLanguage = (newLocale: string) => {
    // Obtenir le chemin sans la locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    // Rediriger vers la nouvelle locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <img 
              src="/logo.jpeg" 
              alt="M2HC Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold" style={{ color: brandColors.primary[600] }}>
                M2HC
              </h1>
              <p className="text-xs text-gray-600">Bien-être holistique</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? ""
                    : "text-gray-700"
                }`}
                style={pathname === item.href ? { color: brandColors.primary[600] } : {}}
                onMouseEnter={(e) => e.currentTarget.style.color = brandColors.primary[600]}
                onMouseLeave={(e) => { if (pathname !== item.href) e.currentTarget.style.color = '#374151'; }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 border-2 rounded-lg p-1 shadow-sm" style={{ borderColor: brandColors.primary[200] }}>
              <Globe className="h-4 w-4 text-gray-500 ml-1" />
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  locale === 'fr' 
                    ? 'bg-opacity-100 text-white shadow-sm scale-105' 
                    : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
                style={locale === 'fr' ? { backgroundColor: brandColors.primary[600] } : {}}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  locale === 'en' 
                    ? 'bg-opacity-100 text-white shadow-sm scale-105' 
                    : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
                style={locale === 'en' ? { backgroundColor: brandColors.primary[600] } : {}}
              >
                EN
              </button>
            </div>
            
            <Link href={`/${locale}/donate`}>
              <Button variant="outline" size="sm" className="text-sm">
                <Heart className="h-4 w-4 mr-1.5" />
                {t('donate')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  pathname === item.href
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={pathname === item.href ? { backgroundColor: brandColors.primary[600] } : {}}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {/* Language Selector Mobile */}
              <div className="px-4">
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-medium">
                  <Globe className="h-4 w-4" />
                  <span>Language / Langue</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { changeLanguage('fr'); setMobileMenuOpen(false); }}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      locale === 'fr' 
                        ? 'bg-opacity-100 text-white shadow-lg scale-105 ring-2 ring-offset-2' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                    }`}
                    style={locale === 'fr' ? { backgroundColor: brandColors.primary[600] } : {}}
                  >
                    🇫🇷 Français
                  </button>
                  <button
                    onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      locale === 'en' 
                        ? 'bg-opacity-100 text-white shadow-lg scale-105 ring-2 ring-offset-2' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                    }`}
                    style={locale === 'en' ? { backgroundColor: brandColors.primary[600] } : {}}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>
              
              <Link href={`/${locale}/donate`} className="block">
                <Button variant="outline" fullWidth>
                  <Heart className="h-4 w-4 mr-2" />
                  {t('donate')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
