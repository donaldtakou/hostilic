import { NextResponse } from "next/server"
import { FeedbackModel } from "@/lib/db"
import { z } from "zod"

const feedbackSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = feedbackSchema.parse(body)

    const feedback = await FeedbackModel.create({
      name: data.name,
      email: data.email,
      rating: data.rating,
      message: data.message,
      approved: false,
    })

    return NextResponse.json(
      { 
        message: "Merci pour votre feedback ! Il sera examiné prochainement.",
        feedback: {
          id: feedback._id.toString(),
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

    console.error("Feedback error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "10")

    const feedbacks = await FeedbackModel.findAll({ approved: true })
    
    // Trier par date et limiter
    const sortedFeedbacks = feedbacks
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
      .map(f => ({
        name: f.name,
        rating: f.rating,
        message: f.message,
        createdAt: f.createdAt
      }))

    return NextResponse.json({ feedbacks: sortedFeedbacks }, { status: 200 })
  } catch (error) {
    console.error("Get feedbacks error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
