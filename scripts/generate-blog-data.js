// Script pour générer blog-data.json à partir des fichiers .txt
const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '../public/blogs');

const MONTH_MAP = {
  'JANVIER': 0, 'FÉVRIER': 1, 'FEVRIER': 1, 'MARS': 2, 'AVRIL': 3,
  'MAI': 4, 'JUIN': 5, 'JUILLET': 6, 'AOUT': 7,
  'SEPTEMBRE': 8, 'OCTOBRE': 9, 'NOVEMBRE': 10, 'DECEMBRE': 11
};

function parseMonthYear(folderName) {
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

function getCategoryFromTitle(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('santé') || titleLower.includes('health') || titleLower.includes('hôpital') || titleLower.includes('medical')) {
    return 'health';
  }
  if (titleLower.includes('campagne') || titleLower.includes('campaign') || titleLower.includes('activisme') || titleLower.includes('sensibilisation')) {
    return 'campaigns';
  }
  if (titleLower.includes('femme') || titleLower.includes('women') || titleLower.includes('fille') || titleLower.includes('girl')) {
    return 'women';
  }
  if (titleLower.includes('jeune') || titleLower.includes('youth') || titleLower.includes('adolescent') || titleLower.includes('enfant')) {
    return 'youth';
  }
  return 'campaigns';
}

const posts = [];
const usedIds = new Set();

const folders = fs.readdirSync(blogsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

folders.forEach(folderName => {
  const parsed = parseMonthYear(folderName);
  if (!parsed) return;
  
  const folderPath = path.join(blogsDir, folderName);
  
  function scanFolder(currentPath, baseFolderName) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });
    
    items.forEach(item => {
      if (item.isDirectory()) {
        scanFolder(path.join(currentPath, item.name), baseFolderName);
      } else if (item.name.endsWith('.txt')) {
        const txtPath = path.join(currentPath, item.name);
        const content = fs.readFileSync(txtPath, 'utf-8').trim();
        if (!content) return;
        
        const fileNumber = item.name.replace('.txt', '');
        const imagePath = `/blogs/${folderName}/${fileNumber}.png`;
        const fullImagePath = path.join(__dirname, '../public', imagePath);
        
        // Skip if image doesn't exist
        if (!fs.existsSync(fullImagePath)) {
          console.log(`⚠️  Skipping ${folderName}/${fileNumber} - image not found`);
          return;
        }
        
        // Generate unique ID with counter if duplicate
        let baseId = `${folderName}-${fileNumber}`.toLowerCase().replace(/\s+/g, '-');
        let id = baseId;
        let counter = 1;
        while (usedIds.has(id)) {
          id = `${baseId}-${counter}`;
          counter++;
        }
        usedIds.add(id);
        
        const category = getCategoryFromTitle(content);
        const date = new Date(parsed.year, parsed.month, 1);
        
        posts.push({
          id,
          title: content,
          date: date.toISOString(),
          month: folderName.split(' ')[0],
          year: parsed.year.toString(),
          folderName,
          imagePath,
          excerpt: content.substring(0, 150) + (content.length > 150 ? '...' : ''),
          category
        });
      }
    });
  }
  
  scanFolder(folderPath, folderName);
});

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const outputPath = path.join(__dirname, '../lib/blog-data.json');
fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

console.log(`✅ Generated ${posts.length} blog posts in blog-data.json`);
