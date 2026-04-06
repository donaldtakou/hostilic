# 🌟 Hostilic (M2HC) - Professional ONG Website

This is a modern [Next.js](https://nextjs.org) project built for Marguerita Holistic Health Center (M2HC).

## 📖 Description

**M2H2** est une plateforme web moderne et complète pour une ONG dédiée à l'accompagnement des jeunes et des personnes âgées. Ce site offre une expérience utilisateur exceptionnelle avec des fonctionnalités avancées.

## ✨ Fonctionnalités Principales

### 🔐 Authentification Complète
- ✅ Inscription et connexion sécurisées (NextAuth.js)
- ✅ Gestion des rôles (Admin, User, Volunteer)
- ✅ Protection des routes et sessions JWT
- ✅ Hash sécurisé des mots de passe (bcrypt)

### 💰 Système de Dons Professionnel
- ✅ Interface intuitive avec montants prédéfinis
- ✅ Dons ponctuels et récurrents
- ✅ Option de don anonyme
- ✅ Messages personnalisés
- ✅ Préparé pour Stripe

### 📧 Newsletter
- ✅ Inscription/désinscription en un clic
- ✅ Stockage en base de données
- ✅ Validation des emails
- ✅ Interface d'administration

### 💬 Système de Feedback
- ✅ Soumission de témoignages avec notation
- ✅ Modération par les admins
- ✅ Affichage des feedbacks approuvés
- ✅ Mise en vedette des meilleurs témoignages

### 📞 Contact Intelligent
- ✅ Formulaire avec validation Zod
- ✅ Stockage des messages
- ✅ Horaires d'ouverture
- ✅ Prêt pour intégration Google Maps

### 👥 Gestion des Programmes
- ✅ Programmes pour jeunes
- ✅ Programmes pour personnes âgées
- ✅ Activités intergénérationnelles
- ✅ Formulaires d'inscription

---

## 📝 Gestion du Blog (Blog Content Management)

Le système de blog est semi-automatisé. Il génère un registre central à partir de fichiers statiques situés dans `public/blogs/`.

### Comment ajouter un nouvel article :

1.  **Créer un dossier :** Créez un nouveau dossier dans `public/blogs/` nommé `MOIS ANNEE` (ex: `MARS 2026`).
2.  **Ajouter le texte :** Créez un fichier nommé `1.txt` (ou `2.txt`, etc.) à l'intérieur.
3.  **Ajouter l'image :** Ajoutez l'image correspondante nommée `1.png` (ou `2.png`, etc.) dans le même dossier.
4.  **Optionnel : Date exacte :** Pour utiliser une date spécifique, ajoutez un en-tête à votre fichier `.txt` :
    ```text
    DATE: 2026-03-25
    Votre contenu commence ici...
    ```
5.  **Régénérer les données :** Lancez la commande suivante pour mettre à jour le registre :
    ```bash
    node scripts/generate-blog-data.js
    ```

---

## 🛠️ Stack Technique

### Frontend
- **Next.js 15+** - Framework React moderne (App Router)
- **TypeScript** - Sécurité et typage
- **Tailwind CSS** - Styling professionnel
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **next-intl** - Support multi-langues
- **React Hook Form + Zod** - Formulaires validés

### Backend
- **Next.js API Routes** - API REST
- **Prisma** - ORM moderne
- **PostgreSQL** - Base de données
- **NextAuth.js** - Authentification

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
Ouvrir [http://localhost:3001](http://localhost:3001) 🚀

## 🚀 Déploiement

Pour déployer vos changements sur GitHub :
```bash
git add .
git commit -m "Description de vos changements"
git push origin main
```
Le déploiement est automatique depuis la branche **main**.

## 📊 Pages Disponibles

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Landing page moderne |
| À propos | `/about` | Mission et équipe |
| Programmes | `/programs` | Liste des programmes |
| Dons | `/donate` | Faire un don |
| Contact | `/contact` | Formulaire de contact |
| Témoignages | `/testimonials` | Retours d'expérience |
| Blog | `/blog` | Articles et Actualités |

## 📞 Support
**Email**: contact@m2h2.org  
© 2026 M2HC. Développé pour Marguerita Holistic Health Center.
