# 🎯 Configuration des Donations M2H2

## 📋 Vue d'ensemble

La page de donation du site M2H2 affiche vos informations de paiement (Mobile Money et compte bancaire) pour que les donateurs puissent effectuer des virements manuels.

## ⚙️ Configuration Requise

### 1. Créer le fichier `.env.local`

Copiez le fichier `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

### 2. Configurer les 3 variables obligatoires

Ouvrez `.env.local` et remplissez ces 3 variables :

```bash
# Numéro MTN Mobile Money
NEXT_PUBLIC_MTN_NUMBER=690000000

# Numéro Orange Money
NEXT_PUBLIC_ORANGE_NUMBER=655000000

# Numéro de compte bancaire
NEXT_PUBLIC_BANK_ACCOUNT=12345678901234567890
```

⚠️ **Important** : Remplacez les exemples par vos vrais numéros !

### 3. Redémarrer le serveur

```bash
npm run dev
```

## 🎨 Ce qui s'affiche

La page de donation (`/donate`) affiche :

- ✅ **3 méthodes de paiement** : MTN, Orange, Virement Bancaire
- ✅ **Numéros copiables** : Les donateurs peuvent copier les numéros en 1 clic
- ✅ **Instructions claires** : Comment effectuer le paiement pour chaque méthode
- ✅ **Montants suggérés** : 5 000 à 250 000 FCFA
- ✅ **Impact des dons** : Exemples concrets de ce que chaque montant peut financer
- ✅ **Couleurs du logo** : Design cohérent avec votre charte graphique

## 🔒 Sécurité

Les numéros sont stockés dans `.env.local` qui :
- ❌ N'est **jamais** envoyé sur GitHub (dans `.gitignore`)
- ✅ Est lu uniquement au démarrage du serveur
- ✅ Est accessible côté client (`NEXT_PUBLIC_` prefix)

## 📱 Fonctionnalités

### Copie en 1 clic
Les donateurs peuvent cliquer sur l'icône 📋 pour copier automatiquement le numéro.

### Instructions par méthode
- **MTN** : "Composez *126# puis suivez les instructions"
- **Orange** : "Composez #150# puis suivez les instructions"
- **Virement** : "Effectuez un virement bancaire vers ce compte"

### Design responsive
La page s'adapte aux mobiles, tablettes et ordinateurs.

## 🚀 Démarrage Rapide

1. Configurez `.env.local` avec vos 3 numéros
2. Lancez `npm run dev`
3. Visitez `http://localhost:3001/donate`
4. ✅ Votre page de donation est prête !

## 🎨 Personnalisation

Les couleurs sont automatiquement extraites du logo (`public/logo.jpeg`) via `lib/theme.ts`.

Pour modifier les montants suggérés, éditez `app/donate/page.tsx` ligne 198 :

```tsx
{[5000, 10000, 25000, 50000, 100000, 250000].map((amount) => (
  // ...
))}
```

## ❓ Questions Fréquentes

**Q : Faut-il une API de paiement ?**  
R : Non ! Les numéros s'affichent simplement, les donateurs font les virements manuellement.

**Q : Puis-je ajouter une 4ème méthode ?**  
R : Oui, éditez le tableau `paymentMethods` dans `app/donate/page.tsx`.

**Q : Les montants sont-ils obligatoires ?**  
R : Non, ils sont indicatifs. Les donateurs peuvent donner n'importe quel montant.

## 📞 Support

Pour toute question : contact@m2h2.org
