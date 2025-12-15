import { NextResponse } from "next/server"
import { headers } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Donation from "@/models/Donation"
import { camPayService } from "@/lib/campay"

export async function POST(req: Request) {
  try {
    await dbConnect()

    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('x-campay-signature') || ''

    // Vérifier la signature du webhook
    if (!camPayService.verifyWebhookSignature(body, signature)) {
      console.error('Invalid CamPay webhook signature')
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      )
    }

    const event = JSON.parse(body)

    // Gérer les différents événements
    switch (event.event) {
      case 'payment.successful':
        await handlePaymentSuccessful(event.data)
        break
      
      case 'payment.failed':
        await handlePaymentFailed(event.data)
        break
      
      default:
        console.log(`Unhandled CamPay event type: ${event.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('CamPay webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccessful(data: any) {
  const { reference, external_reference, amount, operator } = data

  const donation = await Donation.findOne({
    $or: [
      { campayReference: reference },
      { campayExternalReference: external_reference }
    ]
  })

  if (donation) {
    donation.status = 'COMPLETED'
    donation.transactionDetails = {
      ...donation.transactionDetails,
      completedAt: new Date(),
      operator,
      webhookReceived: true,
    }
    await donation.save()

    console.log(`✅ Donation ${donation._id} marked as COMPLETED (CamPay ${reference})`)

    // TODO: Envoyer un email de confirmation au donateur
  } else {
    console.warn(`Donation not found for CamPay reference: ${reference}`)
  }
}

async function handlePaymentFailed(data: any) {
  const { reference, external_reference, reason } = data

  const donation = await Donation.findOne({
    $or: [
      { campayReference: reference },
      { campayExternalReference: external_reference }
    ]
  })

  if (donation) {
    donation.status = 'FAILED'
    donation.transactionDetails = {
      ...donation.transactionDetails,
      failedAt: new Date(),
      reason,
      webhookReceived: true,
    }
    await donation.save()

    console.log(`❌ Donation ${donation._id} marked as FAILED (CamPay ${reference})`)
  }
}
