import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateChatResponse, detectFAQ, ChatMessage as ChatMessageType } from '@/lib/chatbot';
import { ChatMessageModel } from '@/lib/db';

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

    // Sauvegarder dans la base en mémoire
    await ChatMessageModel.create({
      message: message,
      response: response.message,
      sessionId: currentSessionId,
    });

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

    const allMessages = await ChatMessageModel.findAll();
    const messages = allMessages
      .filter(m => m.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map(m => ({
        id: m._id,
        message: m.message,
        response: m.response,
        sessionId: m.sessionId,
        createdAt: m.createdAt,
      }));

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

    const deletedCount = await ChatMessageModel.deleteBySessionId(sessionId);

    return NextResponse.json({
      success: true,
      message: 'Historique supprimé',
      deletedCount,
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
