import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  title: string;
  date: Date;
  month: string;
  year: string;
  folderName: string;
  imagePath: string;
  excerpt: string;
  category: string;
}

const MONTH_MAP: { [key: string]: number } = {
  'JANVIER': 0,
  'FÉVRIER': 1,
  'FEVRIER': 1,
  'MARS': 2,
  'AVRIL': 3,
  'MAI': 4,
  'JUIN': 5,
  'JUILLET': 6,
  'AOUT': 7,
  'SEPTEMBRE': 8,
  'OCTOBRE': 9,
  'NOVEMBRE': 10,
  'DECEMBRE': 11,
};

function parseMonthYear(folderName: string): { month: number; year: number } | null {
  // Handle special cases like "JUILLET A AOUT 2020" or "OCTOBRE ROSE 2024"
  const match = folderName.match(/(JANVIER|FÉVRIER|FEVRIER|MARS|AVRIL|MAI|JUIN|JUILLET|AOUT|SEPTEMBRE|OCTOBRE|NOVEMBRE|DECEMBRE)\s+(\d{4})/i);
  
  if (match) {
    const monthName = match[1].toUpperCase();
    const year = parseInt(match[2]);
    const month = MONTH_MAP[monthName];
    
    if (month !== undefined) {
      return { month, year };
    }
  }
  
  return null;
}

function getCategoryFromTitle(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('femme') || titleLower.includes('women')) {
    return 'women';
  } else if (titleLower.includes('jeune') || titleLower.includes('youth') || titleLower.includes('adolescent')) {
    return 'youth';
  } else if (titleLower.includes('santé') || titleLower.includes('health') || titleLower.includes('covid') || titleLower.includes('campagne')) {
    return 'campaigns';
  } else if (titleLower.includes('handicap') || titleLower.includes('disability')) {
    return 'health';
  }
  
  return 'health';
}

export function getAllBlogPosts(): BlogPost[] {
  const blogsDirectory = path.join(process.cwd(), 'public', 'blogs');
  
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  
  const folders = fs.readdirSync(blogsDirectory);
  const posts: BlogPost[] = [];
  
  folders.forEach(folderName => {
    const folderPath = path.join(blogsDirectory, folderName);
    const stat = fs.statSync(folderPath);
    
    if (!stat.isDirectory()) return;
    
    const parsed = parseMonthYear(folderName);
    if (!parsed) return;
    
    const files = fs.readdirSync(folderPath);
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    
    txtFiles.forEach(txtFile => {
      const txtPath = path.join(folderPath, txtFile);
      const content = fs.readFileSync(txtPath, 'utf-8').trim();
      
      if (!content) return;
      
      const fileNumber = txtFile.replace('.txt', '');
      const imageFile = `${fileNumber}.png`;
      const imagePath = path.join(folderPath, imageFile);
      
      // Check if image exists
      const hasImage = fs.existsSync(imagePath);
      
      const id = `${folderName}-${fileNumber}`.toLowerCase().replace(/\s+/g, '-');
      const category = getCategoryFromTitle(content);
      
      // Create a date using the parsed month and year
      const date = new Date(parsed.year, parsed.month, 1);
      
      posts.push({
        id,
        title: content,
        date,
        month: folderName.split(' ')[0],
        year: parsed.year.toString(),
        folderName,
        imagePath: hasImage ? `/blogs/${folderName}/${imageFile}` : '',
        excerpt: content.substring(0, 150) + (content.length > 150 ? '...' : ''),
        category,
      });
    });
  });
  
  // Sort by date descending (most recent first)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return posts;
}

export function getBlogPostById(id: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.id === id) || null;
}
