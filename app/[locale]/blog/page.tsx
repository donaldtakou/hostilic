import BlogClient from './BlogClient';
import { setRequestLocale } from 'next-intl/server';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-12">
      <BlogClient />
    </div>
  );
}
