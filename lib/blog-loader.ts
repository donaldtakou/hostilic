import blogData from './blog-data.json';

export interface BlogPost {
  id: string;
  title: string;
  date: Date;
  month: string;
  year: string;
  folderName: string;
  imagePath: string;
  images?: string[];
  excerpt: string;
  category: string;
  content?: string;
}

interface BlogPostJSON {
  id: string;
  title: string;
  date: string;
  month: string;
  year: string;
  folderName: string;
  imagePath: string;
  images?: string[];
  excerpt: string;
  category: string;
  content?: string;
}

// Plus besoin de MONTH_MAP, parseMonthYear et getCategoryFromTitle
// car tout est pré-généré dans blog-data.json

export function getAllBlogPosts(): BlogPost[] {
  // Load from static JSON file instead of fs
  const posts: BlogPost[] = (blogData as BlogPostJSON[]).map(post => ({
    ...post,
    date: new Date(post.date)
  }));
  
  return posts;
}

export function getBlogPostById(id: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.id === id) || null;
}
