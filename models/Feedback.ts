import mongoose, { Schema, models } from 'mongoose'

export interface IFeedback {
  _id: string
  name: string
  email: string
  rating: number
  message: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  userId?: string
  approved: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    userId: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Feedback = models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema)

export default Feedback
