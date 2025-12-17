"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  DollarSign,
  Mail,
  MessageSquare,
  FileText,
  TrendingUp,
  Heart,
  Clock,
  Lock,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { brandColors } from "@/lib/theme"

export const dynamic = 'force-dynamic'

interface Stats {
  totalUsers: number
  totalDonations: number
  totalAmount: number
  totalNewsletters: number
  pendingFeedbacks: number
  totalApplications: number
  totalBlogPosts: number
}

interface RecentDonation {
  id: string
  amount: number
  donorName: string
  donorEmail: string
  createdAt: string
}

interface RecentFeedback {
  id: string
  name: string
  email: string
  rating: number
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState("")
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentDonations, setRecentDonations] = useState<RecentDonation[]>([])
  const [recentFeedbacks, setRecentFeedbacks] = useState<RecentFeedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'admin est déjà authentifié
    const adminAuth = sessionStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    
    if (password === "Admin123!") {
      sessionStorage.setItem("adminAuth", "true")
      setIsAuthenticated(true)
      fetchStats()
    } else {
      setAuthError("Mot de passe incorrect !")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    setPassword("")
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      
      if (response.ok) {
        setStats(data.stats)
        setRecentDonations(data.recentDonations)
        setRecentFeedbacks(data.recentFeedbacks)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: "#f5f5f5" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: brandColors.primary[600] }}
            >
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Accès Admin
            </h1>
            <p className="text-gray-600">
              Entrez le mot de passe pour accéder au dashboard
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe Admin
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-colors"
                    style={{ borderColor: password ? brandColors.primary[600] : undefined }}
                    placeholder="Entrez le mot de passe"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {authError && (
                  <p className="mt-2 text-sm" style={{ color: brandColors.secondary[500] }}>
                    {authError}
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                💡 <strong>Astuce :</strong> Le mot de passe par défaut est <code className="bg-gray-200 px-1 rounded">Admin123!</code>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: brandColors.primary[600] }}
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 text-center">
              <a 
                href="/"
                className="text-sm hover:underline"
                style={{ color: brandColors.primary[600] }}
              >
                ← Retour à l'accueil
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: brandColors.primary[600] }}></div>
      </div>
    )
  }

  if (!stats) {
    return <div>Erreur de chargement</div>
  }

  const statCards = [
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      bgColor: "#E3F2FD",
      iconColor: brandColors.primary[600],
      change: "+12%",
    },
    {
      title: "Dons reçus",
      value: `${stats.totalAmount.toLocaleString()}€`,
      icon: DollarSign,
      bgColor: "#FFEBEE",
      iconColor: brandColors.secondary[500],
      change: "+23%",
    },
    {
      title: "Abonnés newsletter",
      value: stats.totalNewsletters,
      icon: Mail,
      bgColor: "#E3F2FD",
      iconColor: brandColors.primary[600],
      change: "+8%",
    },
    {
      title: "Témoignages en attente",
      value: stats.pendingFeedbacks,
      icon: MessageSquare,
      bgColor: "#FFEBEE",
      iconColor: brandColors.secondary[500],
      change: "5 nouveaux",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-600">
              Bienvenue Admin, voici un aperçu de votre activité
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-all hover:shadow-lg"
            style={{ backgroundColor: brandColors.secondary[500] }}
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: stat.bgColor }}>
                      <stat.icon className="h-6 w-6" style={{ color: stat.iconColor }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: brandColors.secondary[500] }}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => router.push("/admin/feedbacks")}
                  className="p-4 rounded-lg transition-all hover:shadow-lg text-left"
                  style={{ backgroundColor: "#E3F2FD" }}
                >
                  <MessageSquare className="h-6 w-6 mb-2" style={{ color: brandColors.primary[600] }} />
                  <p className="font-medium text-gray-900">Témoignages</p>
                  <p className="text-sm text-gray-600">{stats.pendingFeedbacks} en attente</p>
                </button>
                <button
                  onClick={() => router.push("/admin/blog")}
                  className="p-4 rounded-lg transition-all hover:shadow-lg text-left"
                  style={{ backgroundColor: "#FFEBEE" }}
                >
                  <FileText className="h-6 w-6 mb-2" style={{ color: brandColors.secondary[500] }} />
                  <p className="font-medium text-gray-900">Blog</p>
                  <p className="text-sm text-gray-600">{stats.totalBlogPosts} articles</p>
                </button>
                <button
                  onClick={() => router.push("/admin/donations")}
                  className="p-4 rounded-lg transition-all hover:shadow-lg text-left"
                  style={{ backgroundColor: "#FFEBEE" }}
                >
                  <DollarSign className="h-6 w-6 mb-2" style={{ color: brandColors.secondary[500] }} />
                  <p className="font-medium text-gray-900">Dons</p>
                  <p className="text-sm text-gray-600">{stats.totalDonations} total</p>
                </button>
                <button
                  onClick={() => router.push("/admin/users")}
                  className="p-4 rounded-lg transition-all hover:shadow-lg text-left"
                  style={{ backgroundColor: "#E3F2FD" }}
                >
                  <Users className="h-6 w-6 mb-2" style={{ color: brandColors.primary[600] }} />
                  <p className="font-medium text-gray-900">Utilisateurs</p>
                  <p className="text-sm text-gray-600">{stats.totalUsers} inscrits</p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.slice(0, 5).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "#FFEBEE" }}>
                        <Heart className="h-4 w-4" style={{ color: brandColors.secondary[500] }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {donation.donorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(donation.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold" style={{ color: brandColors.secondary[500] }}>
                      +{donation.amount}€
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedbacks */}
        <Card>
          <CardHeader>
            <CardTitle>Témoignages en attente de modération</CardTitle>
          </CardHeader>
          <CardContent>
            {recentFeedbacks.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                Aucun témoignage en attente
              </p>
            ) : (
              <div className="space-y-4">
                {recentFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{feedback.name}</p>
                      <div className="flex">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {feedback.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
