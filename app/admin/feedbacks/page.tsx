"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Check, X, Star, Trash2, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

interface Feedback {
  id: string
  name: string
  email: string
  rating: number
  message: string
  status: string
  approved: boolean
  featured: boolean
  createdAt: string
}

// Désactiver le prerendering statique pour les pages admin
export const dynamic = 'force-dynamic'

export default function AdminFeedbacksPage() {
  const session = useSession()
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login")
    } else if (session.status === "authenticated") {
      if ((session.data?.user as any)?.role !== "ADMIN") {
        router.push("/")
      } else {
        fetchFeedbacks()
      }
    }
  }, [session.status, session.data, router])

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/admin/feedbacks")
      const data = await response.json()
      
      if (response.ok) {
        setFeedbacks(data.feedbacks)
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error)
      toast.error("Erreur lors du chargement")
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/feedbacks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: !currentStatus, status: !currentStatus ? "APPROVED" : "PENDING" }),
      })

      if (response.ok) {
        toast.success(!currentStatus ? "Témoignage approuvé" : "Approbation annulée")
        fetchFeedbacks()
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
    }
  }

  const handleFeature = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/feedbacks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentStatus }),
      })

      if (response.ok) {
        toast.success(!currentStatus ? "Mis en avant" : "Retrait de la mise en avant")
        fetchFeedbacks()
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return

    try {
      const response = await fetch(`/api/admin/feedbacks?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Témoignage supprimé")
        fetchFeedbacks()
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
    }
  }

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (filter === "pending") return f.status === "PENDING"
    if (filter === "approved") return f.approved
    if (filter === "featured") return f.featured
    return true
  })

  if (loading || session.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des témoignages
            </h1>
            <p className="text-gray-600">
              {feedbacks.length} témoignages au total
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/admin")}>
            ← Retour au dashboard
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={filter === "all" ? "primary" : "outline"}
            onClick={() => setFilter("all")}
          >
            Tous ({feedbacks.length})
          </Button>
          <Button
            variant={filter === "pending" ? "primary" : "outline"}
            onClick={() => setFilter("pending")}
          >
            En attente ({feedbacks.filter((f) => f.status === "PENDING").length})
          </Button>
          <Button
            variant={filter === "approved" ? "primary" : "outline"}
            onClick={() => setFilter("approved")}
          >
            Approuvés ({feedbacks.filter((f) => f.approved).length})
          </Button>
          <Button
            variant={filter === "featured" ? "primary" : "outline"}
            onClick={() => setFilter("featured")}
          >
            Mis en avant ({feedbacks.filter((f) => f.featured).length})
          </Button>
        </div>

        {/* Feedbacks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFeedbacks.map((feedback) => (
            <Card key={feedback.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{feedback.name}</p>
                    <p className="text-sm text-gray-600">{feedback.email}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < feedback.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-sm">{feedback.message}</p>

                <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                  <span>{new Date(feedback.createdAt).toLocaleString("fr-FR")}</span>
                  <div className="flex gap-2">
                    {feedback.approved && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                        Approuvé
                      </span>
                    )}
                    {feedback.featured && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        Mis en avant
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={feedback.approved ? "secondary" : "primary"}
                    onClick={() => handleApprove(feedback.id, feedback.approved)}
                    className="flex-1"
                  >
                    {feedback.approved ? (
                      <>
                        <X className="h-4 w-4 mr-1" />
                        Retirer
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Approuver
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFeature(feedback.id, feedback.featured)}
                  >
                    <Star className={`h-4 w-4 ${feedback.featured ? "fill-current text-yellow-500" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(feedback.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600">Aucun témoignage trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
