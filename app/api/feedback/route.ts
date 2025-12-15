import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Feedback from "@/models/Feedback"
import { z } from "zod"

const feedbackSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const body = await req.json()
    const data = feedbackSchema.parse(body)

    const feedback = await Feedback.create({
      name: data.name,
      email: data.email,
      rating: data.rating,
      message: data.message,
      status: "PENDING",
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
    await dbConnect()
    
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const featured = searchParams.get("featured") === "true"

    const query: any = { approved: true }
    if (featured) {
      query.featured = true
    }

    const feedbacks = await Feedback.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .select('name rating message createdAt')

    return NextResponse.json({ feedbacks }, { status: 200 })
  } catch (error) {
    console.error("Get feedbacks error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
