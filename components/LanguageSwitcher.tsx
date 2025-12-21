"use client"

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('common')

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-2">
      <Button
        onClick={() => switchLocale(locale === 'fr' ? 'en' : 'fr')}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white shadow-lg"
      >
        <Globe className="h-4 w-4 mr-2" />
        {locale === 'fr' ? 'EN' : 'FR'}
      </Button>
    </div>
  )
}