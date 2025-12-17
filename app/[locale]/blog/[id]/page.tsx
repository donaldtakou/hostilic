import BlogPostClient from './BlogPostClient';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  
  return <BlogPostClient postId={id} />;
}
