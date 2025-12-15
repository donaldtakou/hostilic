import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  userId?: string;
  metadata?: {
    model?: string;
    tokens?: number;
    rating?: number;
    helpful?: boolean;
  };
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    userId: {
      type: String,
      index: true,
    },
    metadata: {
      model: String,
      tokens: Number,
      rating: Number,
      helpful: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour recherche rapide
ChatMessageSchema.index({ sessionId: 1, timestamp: 1 });
ChatMessageSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.models.ChatMessage || 
  mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
