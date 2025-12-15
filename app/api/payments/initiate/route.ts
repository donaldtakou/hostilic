import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Donation from "@/models/Donation"
import { camPayService } from "@/lib/campay"
import { stripeService } from "@/lib/stripe"
import { z } from "zod"

const paymentSchema = z.object({
  amount: z.number().min(100, "Le montant minimum est de 100 XAF"),
  donorName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  donorEmail: z.string().email("Email invalide"),
  donorPhone: z.string().optional(),
  message: z.string().optional(),
  anonymous: z.boolean().optional(),
  recurring: z.boolean().optional(),
  paymentMethod: z.enum(['CAMPAY_MTN', 'CAMPAY_ORANGE', 'STRIPE']),
})

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    const body = await req.json()
    const data = paymentSchema.parse(body)

    // Générer une référence externe unique
    const externalReference = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Créer le don dans la base de données
    const donation = await Donation.create({
      amount: data.amount,
      currency: data.paymentMethod.startsWith('CAMPAY') ? 'XAF' : 'EUR',
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donorPhone: data.donorPhone,
      message: data.message,
      anonymous: data.anonymous || false,
      recurring: data.recurring || false,
      paymentMethod: data.paymentMethod,
      status: 'PENDING',
    })

    // Traiter selon la méthode de paiement
    if (data.paymentMethod === 'CAMPAY_MTN' || data.paymentMethod === 'CAMPAY_ORANGE') {
      // Paiement Mobile Money via CamPay
      if (!data.donorPhone) {
        return NextResponse.json(
          { error: "Le numéro de téléphone est requis pour le paiement Mobile Money" },
          { status: 400 }
        )
      }

      try {
        const campayResponse = await camPayService.initiatePayment(
          data.amount,
          data.donorPhone,
          `Don M2H2 - ${data.donorName}`,
          externalReference
        )

        // Mettre à jour le don avec les informations CamPay
        donation.campayReference = campayResponse.reference
        donation.campayExternalReference = campayResponse.external_reference
        donation.transactionDetails = {
          operator: campayResponse.operator,
          link: campayResponse.link,
        }
        await donation.save()

        return NextResponse.json(
          {
            success: true,
            message: "Paiement initié avec succès. Veuillez confirmer sur votre téléphone.",
            donation: {
              id: donation._id.toString(),
              reference: campayResponse.reference,
              operator: campayResponse.operator,
              status: 'PENDING',
            },
            paymentLink: campayResponse.link,
          },
          { status: 201 }
        )
      } catch (error: any) {
        donation.status = 'FAILED'
        donation.transactionDetails = { error: error.message }
        await donation.save()

        return NextResponse.json(
          { error: error.message || "Échec du paiement Mobile Money" },
          { status: 400 }
        )
      }
    } else if (data.paymentMethod === 'STRIPE') {
      // Paiement par carte via Stripe
      try {
        // Créer ou récupérer le client Stripe
        const customer = await stripeService.createOrGetCustomer({
          email: data.donorEmail,
          name: data.donorName,
          phone: data.donorPhone,
          metadata: {
            donationId: donation._id.toString(),
          },
        })

        // Créer le Payment Intent
        const paymentIntent = await stripeService.createPaymentIntent({
          amount: data.amount * 100, // Convertir en centimes
          currency: 'eur',
          description: `Don M2H2 - ${data.donorName}`,
          customerEmail: data.donorEmail,
          customerId: customer.id,
          metadata: {
            donationId: donation._id.toString(),
            donorName: data.donorName,
          },
        })

        // Mettre à jour le don
        donation.stripePaymentIntentId = paymentIntent.id
        donation.stripeCustomerId = customer.id
        await donation.save()

        return NextResponse.json(
          {
            success: true,
            message: "Paiement initié avec succès",
            donation: {
              id: donation._id.toString(),
              status: 'PENDING',
            },
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
          },
          { status: 201 }
        )
      } catch (error: any) {
        donation.status = 'FAILED'
        donation.transactionDetails = { error: error.message }
        await donation.save()

        return NextResponse.json(
          { error: error.message || "Échec du paiement par carte" },
          { status: 400 }
        )
      }
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Payment initiation error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'initiation du paiement" },
      { status: 500 }
    )
  }
}

// Vérifier le statut d'un paiement
export async function GET(req: Request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(req.url)
    const donationId = searchParams.get("id")
    const reference = searchParams.get("reference")

    if (!donationId && !reference) {
      return NextResponse.json(
        { error: "ID de don ou référence requis" },
        { status: 400 }
      )
    }

    let donation
    if (donationId) {
      donation = await Donation.findById(donationId)
    } else {
      donation = await Donation.findOne({ campayReference: reference })
    }

    if (!donation) {
      return NextResponse.json(
        { error: "Don non trouvé" },
        { status: 404 }
      )
    }

    // Si c'est un paiement CamPay et toujours en attente, vérifier le statut
    if (
      (donation.paymentMethod === 'CAMPAY_MTN' || donation.paymentMethod === 'CAMPAY_ORANGE') &&
      donation.status === 'PENDING' &&
      donation.campayReference
    ) {
      try {
        const campayStatus = await camPayService.checkPaymentStatus(donation.campayReference)
        
        if (campayStatus.status === 'SUCCESSFUL') {
          donation.status = 'COMPLETED'
          await donation.save()
        } else if (campayStatus.status === 'FAILED') {
          donation.status = 'FAILED'
          await donation.save()
        }
      } catch (error) {
        console.error('Error checking CamPay status:', error)
      }
    }

    return NextResponse.json({
      donation: {
        id: donation._id.toString(),
        amount: donation.amount,
        currency: donation.currency,
        status: donation.status,
        paymentMethod: donation.paymentMethod,
        donorName: donation.anonymous ? 'Anonyme' : donation.donorName,
        createdAt: donation.createdAt,
      }
    })
  } catch (error) {
    console.error("Payment status check error:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
