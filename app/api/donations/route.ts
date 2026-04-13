import { NextResponse } from "next/server"
import { DonationModel } from "@/lib/db"
import { z } from "zod"

const donationSchema = z.object({
  amount: z.number().min(1, "Le montant doit être supérieur à 0"),
  donorName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  donorEmail: z.string().email("Email invalide"),
  message: z.string().optional(),
  paymentMethod: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = donationSchema.parse(body)

    const donation = await DonationModel.create({
      amount: data.amount,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      message: data.message,
      paymentMethod: data.paymentMethod || "manual",
      status: "COMPLETED",
    })

    return NextResponse.json(
      {
        message: "Don enregistré avec succès",
        donation: {
          id: donation._id,
          amount: donation.amount,
        },
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
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "10")

    const allDonations = await DonationModel.findAll()
    const donations = allDonations
      .filter(d => d.status === "COMPLETED")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
      .map(d => ({
        amount: d.amount,
        donorName: d.donorName,
        message: d.message,
        createdAt: d.createdAt,
      }))

    return NextResponse.json({ donations }, { status: 200 })
  } catch (error) {
    console.error("Get donations error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
