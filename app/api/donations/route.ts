import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Donation from "@/models/Donation"
import { z } from "zod"

const donationSchema = z.object({
  amount: z.number().min(1, "Le montant doit être supérieur à 0"),
  donorName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  donorEmail: z.string().email("Email invalide"),
  message: z.string().optional(),
  anonymous: z.boolean().optional(),
  recurring: z.boolean().optional(),
  frequency: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const body = await req.json()
    const data = donationSchema.parse(body)

    // Créer le don dans la base de données
    const donation = await Donation.create({
      amount: data.amount,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      message: data.message,
      anonymous: data.anonymous || false,
      recurring: data.recurring || false,
      frequency: data.frequency,
      status: "PENDING",
    })

    // TODO: Intégrer Stripe pour le paiement
    // Pour l'instant, on marque le don comme complété
    donation.status = "COMPLETED"
    await donation.save()

    return NextResponse.json(
      { 
        message: "Don enregistré avec succès",
        donation: {
          id: donation._id.toString(),
          amount: donation.amount,
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

    console.error("Donation error:", error)
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

    const donations = await Donation.find({
      status: "COMPLETED",
      anonymous: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('amount donorName message createdAt')

    return NextResponse.json({ donations }, { status: 200 })
  } catch (error) {
    console.error("Get donations error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
