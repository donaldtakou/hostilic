# Guide d'utilisation du logo M2H2

## Logo principal
Le logo est situé dans `/public/logo.jpeg`

## Utilisation

### Dans les composants React/Next.js
```tsx
<img 
  src="/logo.jpeg" 
  alt="M2H2 Logo" 
  className="h-12 w-auto object-contain"
/>
```

### Tailles recommandées

**Header (navigation)**: 
```tsx
className="h-14 w-auto" // 56px de hauteur
```

**Footer**:
```tsx
className="h-12 w-auto" // 48px de hauteur
```

**Chatbot**:
```tsx
className="w-10 h-10" // 40x40px (rond)
```

**Favicon**:
```tsx
// Déjà configuré dans layout.tsx
icons: {
  icon: '/logo.jpeg',
  shortcut: '/logo.jpeg',
  apple: '/logo.jpeg',
}
```

## Charte graphique extraite du logo

Les couleurs principales ont été extraites du logo et appliquées dans `lib/theme.ts`:

```typescript
brandColors: {
  primary: { // Bleu du logo
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: { // Violet/Purple du logo
    600: '#9333ea',
    700: '#7e22ce',
  },
  accent: { // Rouge/Rose du logo
    600: '#dc2626',
    700: '#b91c1c',
  }
}
```

## Intégrations actuelles

✅ **Header** - Logo cliquable avec effet hover
✅ **Footer** - Logo dans section "About"
✅ **Chatbot** - Avatar avec logo
✅ **Favicon** - Icône du navigateur
✅ **Open Graph** - Partages sur réseaux sociaux
✅ **Metadata** - SEO optimisé

## Format du logo

**Format actuel**: JPEG
**Recommandation**: Pour de meilleures performances, convertir en:
- **PNG** avec transparence pour le header/footer
- **ICO** ou **PNG** (32x32, 64x64, 128x128) pour le favicon
- **WebP** pour optimisation web

## Conversion recommandée (optionnelle)

```bash
# Avec ImageMagick
convert logo.jpeg -resize 512x512 -quality 90 logo.png
convert logo.jpeg -resize 32x32 favicon-32.png
convert logo.jpeg -resize 64x64 favicon-64.png
```

## Accessibilité

Toujours utiliser l'attribut `alt` descriptif:
```tsx
alt="M2H2 Logo - ONG d'accompagnement des jeunes et personnes âgées"
```

## Performance

Pour optimisation Next.js, utiliser le composant Image:
```tsx
import Image from 'next/image'

<Image
  src="/logo.jpeg"
  alt="M2H2 Logo"
  width={56}
  height={56}
  priority // Pour le logo du header
/>
```
