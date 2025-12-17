import { notFound } from 'next/navigation';
import { getBlogPostById, getAllBlogPosts } from '@/lib/blog-loader';
import { useTranslations } from 'next-intl';
import BlogPostClient from './BlogPostClient';

// Force static generation - no serverless function
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
