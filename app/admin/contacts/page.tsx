"use client"

import React, { useEffect, useState } from "react"
import { Mail, Calendar, User, MessageSquare, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

export const dynamic = 'force-dynamic'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/contact")
      const data = await response.json()
      
      if (response.ok) {
        setMessages(data.messages)
      } else {
        toast.error("Erreur lors du chargement")
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast.error("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Messages de Contact
            </h1>
            <p className="text-gray-600">
              {messages.length} message{messages.length > 1 ? 's' : ''} reçu{messages.length > 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={fetchMessages} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Aucun message reçu pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {message.subject}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {message.name}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <a 
                            href={`mailto:${message.email}`}
                            className="hover:text-blue-600 underline"
                          >
                            {message.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        message.status === 'new'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {message.status === 'new' ? 'Nouveau' : 'Lu'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                      <Button size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Répondre
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
