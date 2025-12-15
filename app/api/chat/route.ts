import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateChatResponse, detectFAQ, ChatMessage as ChatMessageType } from '@/lib/chatbot';
import ChatMessage from '@/models/ChatMessage';
import { connectDB } from '@/lib/mongodb';

// Schéma de validation
const chatRequestSchema = z.object({
  message: z.string().min(1, 'Le message ne peut pas être vide').max(1000, 'Message trop long'),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
});

/**
 * POST /api/chat
 * Envoyer un message au chatbot
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = chatRequestSchema.parse(body);
    const { message, sessionId, userId } = validatedData;

    // Générer un sessionId si absent
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Construction du message simple pour le chatbot
    const conversationHistory: ChatMessageType[] = [
      {
        role: 'user',
        content: message,
      }
    ];

    // Générer la réponse avec le chatbot intelligent (gratuit, sans API)
    const response = await generateChatResponse(conversationHistory, currentSessionId);

    // Essayer de sauvegarder dans MongoDB (ne pas bloquer si ça échoue)
    try {
      await connectDB();
      await ChatMessage.create({
        sessionId: currentSessionId,
        role: 'user',
        content: message,
        userId,
        timestamp: new Date(),
      });

      // Sauvegarder la réponse du bot
      await ChatMessage.create({
        sessionId: currentSessionId,
        role: 'assistant',
        content: response.message,
        userId,
        timestamp: new Date(),
        metadata: {
          model: 'intelligent-bot-v1',
          tokens: 0,
        },
      });
    } catch (dbError) {
      // MongoDB non disponible, continuer sans sauvegarder
      console.log('MongoDB non disponible, chatbot fonctionne sans historique');
    }

    return NextResponse.json({
      success: true,
      message: response.message,
      sessionId: currentSessionId,
      source: 'intelligent-bot',
      confidence: response.confidence,
    });
  } catch (error: any) {
    console.error('Erreur API Chat:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat?sessionId=xxx
 * Récupérer l'historique d'une conversation
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'sessionId requis',
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Récupérer l'historique
    const messages = await ChatMessage.find({ sessionId })
      .sort({ timestamp: 1 })
      .select('role content timestamp metadata')
      .lean();

    return NextResponse.json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (error: any) {
    console.error('Erreur GET Chat:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/chat?sessionId=xxx
 * Supprimer l'historique d'une session
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'sessionId requis',
        },
        { status: 400 }
      );
    }

    await connectDB();

    const result = await ChatMessage.deleteMany({ sessionId });

    return NextResponse.json({
      success: true,
      message: 'Historique supprimé',
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error('Erreur DELETE Chat:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
      },
      { status: 500 }
    );
  }
}
