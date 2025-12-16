import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { FeedbackModel } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer TOUS les feedbacks (approved et non approved)
    const allFeedbacks = await FeedbackModel.findAll();
    
    // Trier par date et mapper avec id
    const sortedFeedbacks = allFeedbacks
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(f => ({
        id: f._id,
        name: f.name,
        email: f.email,
        rating: f.rating,
        message: f.message,
        approved: f.approved,
        createdAt: f.createdAt
      }));

    return NextResponse.json({ feedbacks: sortedFeedbacks });
  } catch (error) {
    console.error('Erreur lors de la récupération des feedbacks:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id, approved } = await request.json();

    const result = await FeedbackModel.updateOne({ _id: id }, { approved });

    if (!result) {
      return NextResponse.json(
        { error: 'Témoignage introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: approved ? 'Témoignage approuvé avec succès' : 'Approbation annulée',
      feedback: result
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du feedback:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    const result = await FeedbackModel.deleteOne({ _id: id });

    if (!result) {
      return NextResponse.json(
        { error: 'Témoignage introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Témoignage supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du feedback:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
