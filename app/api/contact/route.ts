import { NextResponse } from "next/server"
import { ContactMessageModel } from "@/lib/db"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    const contact = await ContactMessageModel.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'new',
    })

    // Log du message pour consultation
    console.log('📧 NOUVEAU MESSAGE DE CONTACT REÇU:')
    console.log('═══════════════════════════════════')
    console.log(`De: ${data.name} (${data.email})`)
    console.log(`Sujet: ${data.subject}`)
    console.log(`Message: ${data.message}`)
    console.log(`Téléphone: ${data.phone || 'Non fourni'}`)
    console.log(`Date: ${new Date().toLocaleString('fr-FR')}`)
    console.log('═══════════════════════════════════\n')

    return NextResponse.json(
      { 
        message: "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
        contact: {
          id: contact._id.toString(),
          name: data.name,
          email: data.email,
          subject: data.subject,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Contact error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const messages = await ContactMessageModel.findAll()
    
    // Trier par date décroissante
    const sortedMessages = messages
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(m => ({
        id: m._id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        status: m.status,
        createdAt: m.createdAt
      }))

    return NextResponse.json({ 
      messages: sortedMessages,
      count: sortedMessages.length 
    }, { status: 200 })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
