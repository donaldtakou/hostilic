import BlogPostClient from './BlogPostClient';
import { getAllBlogPosts } from '@/lib/blog-loader';
import { setRequestLocale } from 'next-intl/server';

// Force static generation at build time
export const dynamic = 'force-static';
export const dynamicParams = false; // Ne pas générer de nouvelles pages à la demande

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

// Générer toutes les pages blog au build
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  
  // Générer pour les deux locales
  const params = posts.flatMap(post => [
    { locale: 'fr', id: post.id },
    { locale: 'en', id: post.id }
  ]);
  
  return params;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <BlogPostClient postId={id} />;
}
