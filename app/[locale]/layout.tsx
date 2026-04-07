import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import Chatbot from "@/components/Chatbot";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hostilic.vercel.app'),
  title: "M2HC - Accompagner ensemble les jeunes et les personnes âgées",
  description: "M2HC est une ONG dédiée à l'accompagnement des jeunes et des personnes âgées pour un avenir meilleur et une société plus solidaire.",
  keywords: "ONG, aide sociale, jeunes, personnes âgées, solidarité, accompagnement",
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: "M2HC - ONG d'accompagnement",
    description: "Accompagner les jeunes et les personnes âgées pour un avenir meilleur",
    images: ['/logo.jpeg'],
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Attendre les params (Next.js 15)
  const { locale } = await params;

  // Récupérer les messages pour la locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.className} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
            <Header />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <Footer />
            <LanguageSwitcher />
            <Chatbot />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
