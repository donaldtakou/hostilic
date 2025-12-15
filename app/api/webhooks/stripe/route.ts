import { NextResponse } from "next/server"
import { headers } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Donation from "@/models/Donation"
import { stripeService } from "@/lib/stripe"
import Stripe from "stripe"

export async function POST(req: Request) {
  try {
    await dbConnect()

    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature') || ''

    let event: Stripe.Event

    try {
      event = stripeService.constructWebhookEvent(body, signature)
    } catch (error) {
      console.error('Stripe webhook signature verification failed')
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 400 }
      )
    }

    // Gérer les différents événements Stripe
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent)
        break

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge)
        break

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const donation = await Donation.findOne({
    stripePaymentIntentId: paymentIntent.id
  })

  if (donation) {
    donation.status = 'COMPLETED'
    donation.transactionDetails = {
      ...donation.transactionDetails,
      completedAt: new Date(),
      stripeChargeId: paymentIntent.latest_charge,
      webhookReceived: true,
    }
    await donation.save()

    console.log(`✅ Donation ${donation._id} marked as COMPLETED (Stripe ${paymentIntent.id})`)

    // TODO: Envoyer un email de confirmation au donateur
  } else {
    console.warn(`Donation not found for Stripe PaymentIntent: ${paymentIntent.id}`)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const donation = await Donation.findOne({
    stripePaymentIntentId: paymentIntent.id
  })

  if (donation) {
    donation.status = 'FAILED'
    donation.transactionDetails = {
      ...donation.transactionDetails,
      failedAt: new Date(),
      failureReason: paymentIntent.last_payment_error?.message,
      webhookReceived: true,
    }
    await donation.save()

    console.log(`❌ Donation ${donation._id} marked as FAILED (Stripe ${paymentIntent.id})`)
  }
}

async function handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent) {
  const donation = await Donation.findOne({
    stripePaymentIntentId: paymentIntent.id
  })

  if (donation && donation.status === 'PENDING') {
    donation.status = 'FAILED'
    donation.transactionDetails = {
      ...donation.transactionDetails,
      canceledAt: new Date(),
      webhookReceived: true,
    }
    await donation.save()

    console.log(`🚫 Donation ${donation._id} marked as FAILED (Canceled) (Stripe ${paymentIntent.id})`)
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const donation = await Donation.findOne({
    'transactionDetails.stripeChargeId': charge.id
  })

  if (donation) {
    donation.status = 'REFUNDED'
    donation.transactionDetails = {
      ...donation.transactionDetails,
      refundedAt: new Date(),
      refundAmount: charge.amount_refunded,
      webhookReceived: true,
    }
    await donation.save()

    console.log(`💰 Donation ${donation._id} marked as REFUNDED (Stripe ${charge.id})`)
  }
}
