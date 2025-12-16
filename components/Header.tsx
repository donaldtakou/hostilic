"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Heart } from "lucide-react"
import { Button } from "./ui/button"
import { brandColors } from "@/lib/theme"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
  { name: "Programmes", href: "/programs" },
  { name: "Galerie", href: "/gallery" },
  { name: "Témoignages", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
            <Link href="/donate">
              <Button variant="outline" size="sm" className="text-sm">
                <Heart className="h-4 w-4 mr-1.5" />
                Faire un don
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
              <Link href="/donate" className="block">
                <Button variant="outline" fullWidth>
                  <Heart className="h-4 w-4 mr-2" />
                  Faire un don
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
