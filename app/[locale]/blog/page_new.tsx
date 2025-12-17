import { getAllBlogPosts } from '@/lib/blog-loader';
import BlogClient from './BlogClient';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-12">
      <BlogClient posts={posts} />
    </div>
  );
}
