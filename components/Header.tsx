"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Menu, X, Heart } from "lucide-react"
import { Button } from "./ui/button"
import { brandColors } from "@/lib/theme"

const navigation = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "programs", path: "/programs" },
  { key: "gallery", path: "/gallery" },
  { key: "testimonials", path: "/testimonials" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
] as const

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("nav")

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
          <Link href={`/${locale}`} className="flex items-center space-x-2 md:space-x-3 group">
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
            {navigation.map((item) => {
              const href = `/${locale}${item.path}`
              const isActive = pathname === href
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "" : "text-gray-700"
                  }`}
                  style={isActive ? { color: brandColors.primary[600] } : {}}
                  onMouseEnter={(e) => e.currentTarget.style.color = brandColors.primary[600]}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#374151'; }}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href={`/${locale}/donate`}>
              <Button variant="outline" size="sm" className="text-sm">
                <Heart className="h-4 w-4 mr-1.5" />
                {t("donate")}
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
            {navigation.map((item) => {
              const href = `/${locale}${item.path}`
              const isActive = pathname === href
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive ? "text-white" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={isActive ? { backgroundColor: brandColors.primary[600] } : {}}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              )
            })}
            <div className="pt-4 space-y-2">
              <Link href={`/${locale}/donate`} className="block">
                <Button variant="outline" fullWidth>
                  <Heart className="h-4 w-4 mr-2" />
                  {t("donate")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
