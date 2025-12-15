# 🌟 M2H2 - Site Web Professionnel pour ONGThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## 📖 Description## Getting Started



**M2H2** est une plateforme web moderne et complète pour une ONG dédiée à l'accompagnement des jeunes et des personnes âgées. Ce site offre une expérience utilisateur exceptionnelle avec des fonctionnalités avancées.First, run the development server:



## ✨ Fonctionnalités Principales```bash

npm run dev

### 🔐 Authentification Complète# or

- ✅ Inscription et connexion sécurisées (NextAuth.js)yarn dev

- ✅ Gestion des rôles (Admin, User, Volunteer)# or

- ✅ Protection des routes et sessions JWTpnpm dev

- ✅ Hash sécurisé des mots de passe (bcrypt)# or

bun dev

### 💰 Système de Dons Professionnel```

- ✅ Interface intuitive avec montants prédéfinis

- ✅ Dons ponctuels et récurrentsOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- ✅ Option de don anonyme

- ✅ Messages personnalisésYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- ✅ Préparé pour Stripe

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### 📧 Newsletter

- ✅ Inscription/désinscription en un clic## Learn More

- ✅ Stockage en base de données

- ✅ Validation des emailsTo learn more about Next.js, take a look at the following resources:

- ✅ Interface d'administration

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### 💬 Système de Feedback- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- ✅ Soumission de témoignages avec notation

- ✅ Modération par les adminsYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- ✅ Affichage des feedbacks approuvés

- ✅ Mise en vedette des meilleurs témoignages## Deploy on Vercel



### 📞 Contact IntelligentThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- ✅ Formulaire avec validation Zod

- ✅ Stockage des messagesCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- ✅ Horaires d'ouverture
- ✅ Prêt pour intégration Google Maps

### 👥 Gestion des Programmes
- ✅ Programmes pour jeunes
- ✅ Programmes pour personnes âgées
- ✅ Activités intergénérationnelles
- ✅ Formulaires d'inscription

## 🛠️ Stack Technique

### Frontend
- **Next.js 15** - Framework React moderne
- **TypeScript** - Sécurité et typage
- **Tailwind CSS** - Styling professionnel
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **React Hook Form + Zod** - Formulaires validés

### Backend
- **Next.js API Routes** - API REST
- **Prisma** - ORM moderne
- **PostgreSQL** - Base de données
- **NextAuth.js** - Authentification
- **bcryptjs** - Sécurité

### UX
- **React Hot Toast** - Notifications
- **Responsive Design** - Mobile-first
- **Animations** - Transitions douces
- **SEO Optimisé** - Meta tags

## 📦 Installation Rapide

### Prérequis
- Node.js 18+
- PostgreSQL 14+

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env
cp .env.example .env
# Éditer .env avec vos credentials

# 3. Setup de la base de données
npx prisma generate
npx prisma db push

# 4. Lancer le serveur
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🚀

## 📂 Structure

```
my-app/
├── app/
│   ├── api/          # API Routes
│   ├── about/        # Page À propos
│   ├── auth/         # Authentification
│   ├── contact/      # Contact
│   ├── donate/       # Dons
│   ├── programs/     # Programmes
│   └── page.tsx      # Accueil
├── components/
│   ├── ui/           # Composants UI
│   ├── Header.tsx    # Header
│   └── Footer.tsx    # Footer
├── lib/
│   ├── prisma.ts     # DB Client
│   └── auth.ts       # Auth Config
└── prisma/
    └── schema.prisma # Modèles DB
```

## 🎨 Design

### Couleurs
- **Primaire**: Bleu (#2563eb)
- **Secondaire**: Violet (#9333ea)
- **Accent**: Rose (#ec4899)
- **Succès**: Vert (#10b981)
- **Erreur**: Rouge (#ef4444)

### Composants UI
- Buttons (5 variants)
- Inputs avec validation
- Cards avec hover effects
- Modals & Toasts
- Animations Framer Motion

## 🔒 Sécurité

- ✅ Hash bcrypt (rounds: 12)
- ✅ JWT Sessions
- ✅ Validation Zod serveur
- ✅ Protection CSRF
- ✅ Sanitization inputs
- ✅ Variables env sécurisées

## 🗄️ Base de Données

### Modèles Prisma
- **User** - Utilisateurs
- **Donation** - Dons
- **Newsletter** - Abonnés
- **Feedback** - Témoignages
- **Program** - Programmes
- **Application** - Candidatures
- **BlogPost** - Articles
- **ContactMessage** - Messages

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
vercel
```

### Build Production
```bash
npm run build
npm start
```

## 📊 Pages Disponibles

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Landing page moderne |
| À propos | `/about` | Mission et équipe |
| Programmes | `/programs` | Liste des programmes |
| Dons | `/donate` | Faire un don |
| Contact | `/contact` | Formulaire de contact |
| Connexion | `/auth/login` | Login/Register |
| Blog | `/blog` | Articles (à venir) |
| Dashboard | `/dashboard` | Espace membre (à venir) |

## 🎯 Prochaines Étapes

### Phase 2
- [ ] Dashboard administrateur complet
- [ ] Blog avec CMS
- [ ] Intégration Stripe payments
- [ ] Espace membre personnalisé
- [ ] Système de notifications

### Phase 3
- [ ] Application mobile
- [ ] Chat en temps réel
- [ ] Système de rendez-vous
- [ ] Multi-langues (i18n)
- [ ] Mode sombre

## 📞 Support

**Email**: contact@m2h2.org  
**Documentation**: [Voir le wiki](https://github.com/votre-org/m2h2/wiki)

## 🙏 Crédits

Développé avec ❤️ pour M2H2

**Technologies**: Next.js, TypeScript, Prisma, Tailwind CSS, NextAuth.js

---

© 2025 M2H2. Tous droits réservés.
