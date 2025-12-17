import BlogClient from './BlogClient';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600;

export default function BlogPage() {
  return (
    <div className="py-12">
      <BlogClient />
    </div>
  );
}
