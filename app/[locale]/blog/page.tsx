import { getAllBlogPosts } from '@/lib/blog-loader';
import BlogClient from './BlogClient';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalider toutes les heures

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-12">
      <BlogClient posts={posts} />
    </div>
  );
}
