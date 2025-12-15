import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export interface StripePaymentIntentParams {
  amount: number // En centimes (ex: 5000 = 50€)
  currency: string
  description: string
  metadata?: Record<string, string>
  customerEmail?: string
  customerId?: string
}

export interface StripeCustomerParams {
  email: string
  name?: string
  phone?: string
  metadata?: Record<string, string>
}

class StripeService {
  /**
   * Créer un Payment Intent pour un paiement unique
   */
  async createPaymentIntent(params: StripePaymentIntentParams): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        metadata: params.metadata || {},
        ...(params.customerEmail && { receipt_email: params.customerEmail }),
        ...(params.customerId && { customer: params.customerId }),
        automatic_payment_methods: {
          enabled: true,
        },
      })

      return paymentIntent
    } catch (error: any) {
      console.error('Stripe Payment Intent creation error:', error.message)
      throw new Error('Échec de la création du paiement Stripe')
    }
  }

  /**
   * Créer ou récupérer un client Stripe
   */
  async createOrGetCustomer(params: StripeCustomerParams): Promise<Stripe.Customer> {
    try {
      // Chercher si le client existe déjà
      const existingCustomers = await stripe.customers.list({
        email: params.email,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        return existingCustomers.data[0]
      }

      // Créer un nouveau client
      const customer = await stripe.customers.create({
        email: params.email,
        name: params.name,
        phone: params.phone,
        metadata: params.metadata || {},
      })

      return customer
    } catch (error: any) {
      console.error('Stripe Customer creation error:', error.message)
      throw new Error('Échec de la création du client Stripe')
    }
  }

  /**
   * Créer un abonnement récurrent
   */
  async createSubscription(
    customerId: string,
    priceId: string,
    metadata?: Record<string, string>
  ): Promise<Stripe.Subscription> {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        metadata: metadata || {},
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      })

      return subscription
    } catch (error: any) {
      console.error('Stripe Subscription creation error:', error.message)
      throw new Error('Échec de la création de l\'abonnement')
    }
  }

  /**
   * Créer des prix pour les abonnements récurrents
   */
  async createRecurringPrice(
    amount: number,
    currency: string,
    interval: 'month' | 'year',
    productName: string
  ): Promise<Stripe.Price> {
    try {
      // D'abord créer un produit
      const product = await stripe.products.create({
        name: productName,
        description: `Don récurrent ${interval === 'month' ? 'mensuel' : 'annuel'}`,
      })

      // Puis créer le prix
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: currency,
        recurring: {
          interval: interval,
        },
      })

      return price
    } catch (error: any) {
      console.error('Stripe Price creation error:', error.message)
      throw new Error('Échec de la création du prix récurrent')
    }
  }

  /**
   * Récupérer un Payment Intent
   */
  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await stripe.paymentIntents.retrieve(paymentIntentId)
    } catch (error: any) {
      console.error('Stripe Payment Intent retrieval error:', error.message)
      throw new Error('Échec de la récupération du paiement')
    }
  }

  /**
   * Annuler un Payment Intent
   */
  async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await stripe.paymentIntents.cancel(paymentIntentId)
    } catch (error: any) {
      console.error('Stripe Payment Intent cancellation error:', error.message)
      throw new Error('Échec de l\'annulation du paiement')
    }
  }

  /**
   * Rembourser un paiement
   */
  async refundPayment(
    paymentIntentId: string,
    amount?: number,
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
  ): Promise<Stripe.Refund> {
    try {
      return await stripe.refunds.create({
        payment_intent: paymentIntentId,
        ...(amount && { amount }),
        ...(reason && { reason }),
      })
    } catch (error: any) {
      console.error('Stripe Refund error:', error.message)
      throw new Error('Échec du remboursement')
    }
  }

  /**
   * Vérifier la signature d'un webhook Stripe
   */
  constructWebhookEvent(payload: string | Buffer, signature: string): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET not configured')
    }

    try {
      return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (error: any) {
      console.error('Webhook signature verification failed:', error.message)
      throw new Error('Signature de webhook invalide')
    }
  }

  /**
   * Lister les paiements d'un client
   */
  async listCustomerPayments(customerId: string, limit = 10): Promise<Stripe.PaymentIntent[]> {
    try {
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customerId,
        limit,
      })

      return paymentIntents.data
    } catch (error: any) {
      console.error('Stripe Payment listing error:', error.message)
      throw new Error('Échec de la récupération des paiements')
    }
  }
}

export const stripeService = new StripeService()
export default stripeService
