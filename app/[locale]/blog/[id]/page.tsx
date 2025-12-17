import { notFound } from 'next/navigation';
import { getBlogPostById, getAllBlogPosts } from '@/lib/blog-loader';
import { useTranslations } from 'next-intl';
import BlogPostClient from './BlogPostClient';

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
