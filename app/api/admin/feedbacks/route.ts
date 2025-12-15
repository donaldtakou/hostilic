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

    const feedbacks = await FeedbackModel.findAll();
    
    // Trier par date
    const sortedFeedbacks = feedbacks.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

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

    await FeedbackModel.updateOne({ _id: id }, { approved });

    return NextResponse.json({ message: 'Feedback mis à jour' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du feedback:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
