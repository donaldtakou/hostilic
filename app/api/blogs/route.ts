import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog-loader';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalider toutes les heures

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error loading blogs:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
