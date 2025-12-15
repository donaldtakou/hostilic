import mongoose, { Schema, models } from 'mongoose'

export interface IContactMessage {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  replied: boolean
  createdAt: Date
  updatedAt: Date
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    replied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const ContactMessage = models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema)

export default ContactMessage
