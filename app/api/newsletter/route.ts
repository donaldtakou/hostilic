import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Newsletter from "@/models/Newsletter"
import { z } from "zod"

const newsletterSchema = z.object({
  email: z.string().email("Email invalide"),
  name: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const body = await req.json()
    const { email, name } = newsletterSchema.parse(body)

    // Vérifier si l'email existe déjà
    const existing = await Newsletter.findOne({ email })

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { error: "Cet email est déjà inscrit à la newsletter" },
          { status: 400 }
        )
      } else {
        // Réactiver l'abonnement
        existing.active = true
        await existing.save()
        return NextResponse.json(
          { message: "Abonnement réactivé avec succès" },
          { status: 200 }
        )
      }
    }

    // Créer un nouvel abonnement
    await Newsletter.create({
      email,
      name: name || undefined,
    })

    return NextResponse.json(
      { message: "Inscription réussie à la newsletter" },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Newsletter error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      )
    }

    const newsletter = await Newsletter.findOne({ email })
    if (newsletter) {
      newsletter.active = false
      await newsletter.save()
    }

    return NextResponse.json(
      { message: "Désabonnement réussi" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
