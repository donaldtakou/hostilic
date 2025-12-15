import mongoose, { Schema, models } from 'mongoose'

export interface IDonation {
  _id: string
  amount: number
  currency: string
  donorName: string
  donorEmail: string
  donorPhone?: string
  message?: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  paymentMethod: 'STRIPE' | 'CAMPAY_MTN' | 'CAMPAY_ORANGE' | 'CARD'
  stripePaymentIntentId?: string
  stripeCustomerId?: string
  campayReference?: string
  campayExternalReference?: string
  userId?: string
  anonymous: boolean
  recurring: boolean
  frequency?: string
  transactionDetails?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const DonationSchema = new Schema<IDonation>(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 1,
    },
    currency: {
      type: String,
      default: 'XAF', // Franc CFA par défaut
    },
    donorName: {
      type: String,
      required: [true, 'Donor name is required'],
    },
    donorEmail: {
      type: String,
      required: [true, 'Donor email is required'],
    },
    donorPhone: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    paymentMethod: {
      type: String,
      enum: ['STRIPE', 'CAMPAY_MTN', 'CAMPAY_ORANGE', 'CARD'],
      required: [true, 'Payment method is required'],
    },
    stripePaymentIntentId: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
    campayReference: {
      type: String,
    },
    campayExternalReference: {
      type: String,
    },
    userId: {
      type: String,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
    },
    transactionDetails: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
)

// Index pour recherche rapide
DonationSchema.index({ status: 1, createdAt: -1 })
DonationSchema.index({ donorEmail: 1 })
DonationSchema.index({ stripePaymentIntentId: 1 })
DonationSchema.index({ campayReference: 1 })

const Donation = models.Donation || mongoose.model<IDonation>('Donation', DonationSchema)

export default Donation
