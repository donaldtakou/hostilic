import mongoose, { Schema, models } from 'mongoose'

export interface INewsletter {
  _id: string
  email: string
  name?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Newsletter = models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema)

export default Newsletter
