import { NextResponse } from 'next/server';
import { getBlogPostById } from '@/lib/blog-loader';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = getBlogPostById(params.id);
    
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error loading blog post:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
