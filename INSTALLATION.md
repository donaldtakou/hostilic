# 🚀 M2H2 - Plateforme ONG Professionnelle COMPLÈTE

## 📋 Table des Matières
- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Intégration CamPay](#intégration-campay)
- [Intégration Stripe](#intégration-stripe)
- [Déploiement](#déploiement)
- [API Documentation](#api-documentation)
- [Maintenance](#maintenance)

---

## 🌟 Vue d'ensemble

**M2H2** est une plateforme web complète et opérationnelle pour une ONG d'accompagnement des jeunes et des personnes âgées. Le site intègre un système de paiement multi-canal professionnel avec **CamPay** (Orange Money & MTN Money) et **Stripe** (cartes bancaires).

### 🎯 Objectifs
- ✅ Système de dons sécurisé multi-paiements
- ✅ Gestion complète des bénéficiaires et programmes
- ✅ Dashboard administrateur professionnel
- ✅ Blog et système de témoignages
- ✅ Newsletter automatisée
- ✅ Design responsive et moderne

---

## ✨ Fonctionnalités

### 💰 Système de Paiement Multi-Canal
#### 📱 CamPay (Mobile Money)
- ✅ **MTN Money** - Paiements instantanés
- ✅ **Orange Money** - Paiements instantanés
- ✅ Webhooks temps réel
- ✅ Vérification automatique du statut
- ✅ Reçus de paiement

#### 💳 Stripe (Cartes Bancaires)
- ✅ **Visa, Mastercard, AMEX**
- ✅ **Dons ponctuels** et **récurrents**
- ✅ **3D Secure** intégré
- ✅ Gestion des remboursements
- ✅ Facturation automatique

### 🔐 Authentification & Sécurité
- ✅ NextAuth.js avec JWT
- ✅ Hash bcrypt (12 rounds)
- ✅ Rôles : USER, VOLUNTEER, ADMIN
- ✅ Protection des routes API
- ✅ Validation Zod côté serveur

### 📊 Dashboard Administrateur
- ✅ Statistiques en temps réel
- ✅ Gestion des dons (filtre, export)
- ✅ Modération des témoignages
- ✅ Gestion du blog/actualités
- ✅ Newsletter management
- ✅ Analytics avancés

### 📝 Gestion de Contenu
- ✅ Blog avec éditeur riche
- ✅ Système de témoignages
- ✅ Galerie photos/vidéos
- ✅ Programmes détaillés
- ✅ Pages dynamiques

---

## 🛠️ Technologies

### Frontend
```
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Swiper.js (carrousels)
- React Hook Form + Zod
- Recharts (graphiques)
```

### Backend
```
- Next.js API Routes
- MongoDB + Mongoose
- NextAuth.js
- bcryptjs
```

### Paiements
```
- CamPay API (Mobile Money)
- Stripe SDK (Cartes)
- Webhooks sécurisés
```

---

## 📦 Installation

### Prérequis
- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **MongoDB** 6+ ([Télécharger](https://www.mongodb.com/try/download/community))
- **Git** ([Télécharger](https://git-scm.com/))

### Étape 1: Cloner le Repository
```bash
git clone https://github.com/votre-org/m2h2.git
cd m2h2/frontend/my-app
```

### Étape 2: Installer les Dépendances
```bash
npm install
```

### Étape 3: Configuration MongoDB

#### Option A: MongoDB Local
```bash
# Démarrer MongoDB
mongod --dbpath /path/to/data

# Créer la base de données
mongosh
> use m2h2_db
> db.createCollection("users")
> exit
```

#### Option B: MongoDB Atlas (Cloud)
1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Obtenir l'URI de connexion
4. Whitelist votre IP

### Étape 4: Configuration des Variables d'Environnement
```bash
cp .env.example .env
```

Éditer `.env` avec vos clés :
```env
# MongoDB
MONGODB_URI="mongodb://localhost:27017/m2h2_db"
# Ou Atlas: mongodb+srv://user:password@cluster.mongodb.net/m2h2_db

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générer-avec: openssl rand -base64 32"

# Email
EMAIL_FROM="noreply@m2h2.org"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="M2H2"

# CamPay (voir section suivante)
CAMPAY_API_URL="https://api.campay.net/api/v1"
CAMPAY_APP_USERNAME="your_username"
CAMPAY_APP_PASSWORD="your_password"
CAMPAY_WEBHOOK_SECRET="your_webhook_secret"

# Stripe (voir section suivante)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Étape 5: Lancer le Serveur
```bash
npm run dev
```

✅ Le site est accessible sur **http://localhost:3000**

---

## 🔧 Configuration

### Intégration CamPay

CamPay permet d'accepter les paiements **Orange Money** et **MTN Money** au Cameroun.

#### 1️⃣ Création du Compte CamPay
1. Aller sur [CamPay](https://www.campay.net/)
2. Créer un compte marchand
3. Soumettre les documents requis (RCCM, CNI, etc.)
4. Attendre validation (24-48h)

#### 2️⃣ Obtenir les Identifiants API
```
Dashboard CamPay → Settings → API Credentials
- Username: votre_username
- Password: votre_password
- Webhook Secret: généré automatiquement
```

#### 3️⃣ Configuration dans .env
```env
CAMPAY_API_URL="https://api.campay.net/api/v1"
CAMPAY_APP_USERNAME="your_campay_username"
CAMPAY_APP_PASSWORD="your_campay_password"
CAMPAY_WEBHOOK_SECRET="your_campay_webhook_secret"
```

#### 4️⃣ Configurer les Webhooks CamPay
```
URL du Webhook: https://votre-domaine.com/api/webhooks/campay
Événements: payment.successful, payment.failed
```

#### 5️⃣ Test en Mode Sandbox
```env
# Pour les tests
CAMPAY_API_URL="https://demo.campay.net/api/v1"
CAMPAY_APP_USERNAME="test_username"
CAMPAY_APP_PASSWORD="test_password"
```

**Numéros de test CamPay:**
```
MTN Money Test: 237 67X XXX XXX
Orange Money Test: 237 69X XXX XXX
```

#### 6️⃣ Frais CamPay
```
MTN Money: 1.5% + 100 XAF
Orange Money: 1.5% + 100 XAF
Minimum: 100 XAF
Maximum: 2,000,000 XAF par transaction
```

---

### Intégration Stripe

Stripe permet d'accepter les **cartes bancaires** internationales.

#### 1️⃣ Création du Compte Stripe
1. Aller sur [Stripe](https://stripe.com/)
2. Créer un compte
3. Activer les paiements

#### 2️⃣ Obtenir les Clés API
```
Dashboard Stripe → Developers → API Keys
- Publishable Key: pk_test_... (public)
- Secret Key: sk_test_... (privée)
```

#### 3️⃣ Configuration dans .env
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_votre_cle_publique"
STRIPE_SECRET_KEY="sk_test_votre_cle_privee"
```

#### 4️⃣ Configurer les Webhooks Stripe
```bash
# Installer Stripe CLI pour les tests locaux
npm install -g stripe

# Se connecter
stripe login

# Écouter les webhooks en local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Production:**
```
Dashboard Stripe → Developers → Webhooks → Add endpoint
URL: https://votre-domaine.com/api/webhooks/stripe
Événements: 
  - payment_intent.succeeded
  - payment_intent.payment_failed
  - charge.refunded
```

Copier le **Webhook Secret** (`whsec_...`) dans `.env`:
```env
STRIPE_WEBHOOK_SECRET="whsec_votre_webhook_secret"
```

#### 5️⃣ Activer 3D Secure
```
Dashboard Stripe → Settings → Payment methods
Activer: Visa, Mastercard, American Express
3D Secure: Automatique
```

#### 6️⃣ Frais Stripe
```
Europe: 1.4% + 0.25€
International: 2.9% + 0.25€
Abonnements: Pas de frais supplémentaires
```

---

## 🚀 Déploiement

### Option 1: Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

**Configuration Vercel:**
1. Ajouter toutes les variables d'environnement
2. Configurer le domaine personnalisé
3. Activer HTTPS automatique

### Option 2: VPS (DigitalOcean, AWS, etc.)

```bash
# Build production
npm run build

# Démarrer avec PM2
npm install -g pm2
pm2 start npm --name "m2h2" -- start
pm2 save
pm2 startup
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name m2h2.org www.m2h2.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build et run
docker build -t m2h2 .
docker run -p 3000:3000 --env-file .env m2h2
```

---

## 📖 API Documentation

### Endpoints Paiements

#### POST `/api/payments/initiate`
Initier un paiement (CamPay ou Stripe)

**Body:**
```json
{
  "amount": 5000,
  "donorName": "Jean Dupont",
  "donorEmail": "jean@example.com",
  "donorPhone": "237699123456",
  "message": "Don pour les jeunes",
  "anonymous": false,
  "recurring": false,
  "paymentMethod": "CAMPAY_MTN" // ou "CAMPAY_ORANGE" ou "STRIPE"
}
```

**Response CamPay:**
```json
{
  "success": true,
  "message": "Paiement initié",
  "donation": {
    "id": "...",
    "reference": "CAMPAY-REF",
    "operator": "MTN",
    "status": "PENDING"
  },
  "paymentLink": "https://..."
}
```

**Response Stripe:**
```json
{
  "success": true,
  "donation": {
    "id": "...",
    "status": "PENDING"
  },
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_..."
}
```

#### GET `/api/payments/initiate?id={donationId}`
Vérifier le statut d'un paiement

**Response:**
```json
{
  "donation": {
    "id": "...",
    "amount": 5000,
    "currency": "XAF",
    "status": "COMPLETED",
    "paymentMethod": "CAMPAY_MTN",
    "donorName": "Jean Dupont",
    "createdAt": "2025-01-01T10:00:00Z"
  }
}
```

### Webhooks

#### POST `/api/webhooks/campay`
Webhook CamPay (configuré automatiquement)

#### POST `/api/webhooks/stripe`
Webhook Stripe (configuré automatiquement)

---

## 🔒 Sécurité

### Checklist Production
- [ ] Changer `NEXTAUTH_SECRET` (générer avec `openssl rand -base64 32`)
- [ ] Utiliser HTTPS (Let's Encrypt gratuit)
- [ ] Activer les clés API production (CamPay + Stripe)
- [ ] Configurer les webhooks avec signatures
- [ ] Limiter les requêtes API (rate limiting)
- [ ] Activer les logs de sécurité
- [ ] Backups MongoDB automatiques
- [ ] Monitoring (Sentry, LogRocket)

---

## 📊 Maintenance

### Vérifier les Paiements Quotidiennement
```bash
# Logs paiements
npm run logs:payments

# Sync statuts CamPay
npm run sync:campay

# Rapports Stripe
npm run reports:stripe
```

### Backups MongoDB
```bash
# Backup manuel
mongodump --uri="mongodb://..." --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://..." /backup/20250101
```

### Monitoring
- **Uptime Robot**: Surveillance 24/7
- **Sentry**: Suivi des erreurs
- **Google Analytics**: Analyse du trafic

---

## 👥 Support

**Email:** support@m2h2.org  
**Documentation:** [Wiki](https://github.com/votre-org/m2h2/wiki)  
**Issues:** [GitHub Issues](https://github.com/votre-org/m2h2/issues)

---

## 📝 License

© 2025 M2H2. Tous droits réservés.

---

**Développé avec ❤️ pour faire la différence**
