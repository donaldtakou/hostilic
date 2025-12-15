// Chatbot intelligent basé sur pattern matching (100% GRATUIT, sans API)

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  sessionId?: string;
  confidence?: number;
}

/**
 * Base de connaissances M2H2
 */
const KNOWLEDGE_BASE = {
  about: {
    keywords: ['qui', 'quoi', 'c\'est quoi', 'présentation', 'about', 'm2h2', 'ong', 'organisation'],
    response: `**M2H2** est une ONG camerounaise dédiée à l'accompagnement des jeunes et des personnes âgées. 🌟

🎯 **Notre Mission**:
Accompagner et soutenir les jeunes et les personnes âgées dans leur développement personnel et social.

💙 **Nos Valeurs**:
- Solidarité intergénérationnelle
- Dignité et respect
- Innovation sociale
- Transparence

📍 **Localisation**: Yaoundé, Cameroun

Pour en savoir plus, visitez [notre page À propos](/about) !`,
  },
  
  donation: {
    keywords: ['don', 'donner', 'donation', 'aider financièrement', 'contribuer', 'soutenir', 'argent'],
    response: `Pour faire un don à M2H2, c'est très simple ! 🎁

**Étapes**:
1. 🌐 Rendez-vous sur [/donate](/donate)
2. 💰 Choisissez votre montant (libre ou suggéré)
3. 💳 Sélectionnez votre moyen de paiement:
   - 📱 **Orange Money** (CamPay)
   - 📱 **MTN Money** (CamPay)
   - 💳 **Carte bancaire** (Visa, Mastercard, AMEX)
4. ✅ Confirmez et recevez votre reçu par email

**Options**:
- Don ponctuel
- Don mensuel (abonnement)

🔒 **100% sécurisé** - Tous les dons contribuent directement à nos programmes !`,
  },

  payment: {
    keywords: ['paiement', 'payer', 'orange', 'mtn', 'carte', 'visa', 'mastercard', 'moyens de paiement'],
    response: `Nous acceptons plusieurs moyens de paiement pour votre confort ! 💳

**📱 Mobile Money** (via CamPay):
- Orange Money
- MTN Money
- Paiement instantané et sécurisé

**💳 Cartes Bancaires** (via Stripe):
- Visa
- Mastercard
- American Express
- Protection 3D Secure

**🔒 Sécurité**:
- Transactions cryptées
- Reçu fiscal automatique
- Aucune donnée stockée

Tous nos paiements sont traités par des partenaires certifiés ! ✅`,
  },

  volunteer: {
    keywords: ['bénévole', 'benevole', 'volontaire', 'volunteer', 'rejoindre', 'participer', 'engagement'],
    response: `Merci pour votre intérêt à rejoindre notre équipe ! 🙌

**Comment devenir bénévole ?**

1. 📋 Consultez nos programmes sur [/programs](/programs)
2. ✍️ Remplissez le formulaire de candidature
3. 📞 Notre équipe vous contactera sous 48h
4. 🤝 Entretien et orientation
5. 🎓 Formation selon votre mission
6. 🚀 C'est parti !

**Profils recherchés**:
- Animateurs sociaux
- Formateurs professionnels
- Professionnels de santé
- Entrepreneurs/Mentors
- Retraités motivés
- Étudiants engagés

📧 **Contact**: benevole@m2h2.org`,
  },

  youth_programs: {
    keywords: ['jeune', 'jeunes', 'formation', 'entrepreneur', 'emploi', 'métier', 'carrière', 'étudiant'],
    response: `Nos programmes pour les **jeunes** (15-35 ans) 🎓:

**✅ Formation Professionnelle**
- Métiers du numérique (développement, design, marketing digital)
- Artisanat et commerce
- Agriculture moderne et agro-business

**✅ Accompagnement Entrepreneuriat**
- Élaboration de business plan
- Micro-crédits et financement
- Mentorat par des entrepreneurs
- Mise en réseau

**✅ Développement Personnel**
- Leadership et soft skills
- Orientation professionnelle
- Gestion de projet
- Confiance en soi

📍 **S'inscrire**: [/programs](/programs)
📧 **Contact**: jeunes@m2h2.org`,
  },

  senior_programs: {
    keywords: ['âgé', 'age', 'personne âgée', 'senior', 'vieux', 'retraité', 'elderly'],
    response: `Nos programmes pour les **personnes âgées** (60+ ans) 👴👵:

**✅ Santé et Bien-être**
- Consultations médicales gratuites
- Aide à domicile
- Nutrition adaptée
- Suivi médical régulier

**✅ Lien Social**
- Activités intergénérationnelles
- Clubs seniors (jeux, lecture, arts)
- Sorties et loisirs
- Événements festifs

**✅ Soutien Matériel**
- Aide alimentaire mensuelle
- Équipements médicaux (cannes, fauteuils)
- Rénovation logement
- Vêtements et couvertures

💙 **Contact**: seniors@m2h2.org
📍 **Inscription**: [/programs](/programs)`,
  },

  contact: {
    keywords: ['contact', 'joindre', 'appeler', 'email', 'téléphone', 'adresse', 'bureau'],
    response: `📞 **Contactez-nous** - Nous sommes là pour vous !

**📧 Email**:
- Général: contact@m2h2.org
- Dons: dons@m2h2.org
- Bénévolat: benevole@m2h2.org
- Programmes Jeunes: jeunes@m2h2.org
- Programmes Seniors: seniors@m2h2.org

**📱 Téléphone**:
+237 6XX XXX XXX (Lu-Ve: 8h-17h)

**📍 Adresse**:
Yaoundé, Cameroun

**🌐 Réseaux Sociaux**:
- Facebook: @M2H2ONG
- Twitter: @M2H2_ONG
- Instagram: @m2h2ong

Ou utilisez notre [formulaire de contact](/contact) ! ✉️`,
  },

  help: {
    keywords: ['aide', 'aider', 'help', 'comment', 'puis-je', 'participer', 'soutenir'],
    response: `Plusieurs façons de nous aider ! 💪

**💰 Faire un Don**
Contribuez financièrement via [/donate](/donate)

**🙋 Devenir Bénévole**
Donnez de votre temps et compétences

**🤝 Parrainer un Programme**
Sponsorisez une formation ou un événement

**📢 Partager nos Actions**
Parlez de nous sur les réseaux sociaux

**🎁 Don en Nature**
Matériel, vêtements, équipements

**🏢 Partenariat d'Entreprise**
Collaborations RSE

Chaque geste compte ! 💙

👉 Plus d'infos: contact@m2h2.org`,
  },

  navigation: {
    keywords: ['page', 'site', 'trouver', 'où', 'navigation', 'menu'],
    response: `🗺️ **Navigation du site M2H2**:

**Pages principales**:
- 🏠 [Accueil](/) - Présentation générale
- 📖 [À propos](/about) - Notre histoire et mission
- 🎯 [Programmes](/programs) - Nos actions et inscriptions
- 💝 [Faire un don](/donate) - Contribuer financièrement
- 📰 [Actualités](/blog) - Blog et nouvelles
- 🖼️ [Galerie](/gallery) - Photos et vidéos
- 💬 [Témoignages](/testimonials) - Retours d'expérience
- 📧 [Contact](/contact) - Nous joindre
- 🔐 [Connexion](/auth/login) - Espace membre

Besoin d'aide sur une page spécifique ? 😊`,
  },
};

/**
 * Réponses pour salutations
 */
const GREETINGS = {
  keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'hi', 'hey', 'coucou'],
  responses: [
    "Bonjour ! 👋 Comment puis-je vous aider aujourd'hui ?",
    "Bonjour et bienvenue sur M2H2 ! 🌟 Comment puis-je vous assister ?",
    "Salut ! 😊 Je suis là pour répondre à vos questions sur M2H2. Que voulez-vous savoir ?",
  ],
};

/**
 * Réponses pour remerciements
 */
const THANKS = {
  keywords: ['merci', 'thanks', 'thank you', 'cool', 'super', 'génial', 'parfait'],
  responses: [
    "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions !",
    "De rien ! 💙 Je suis là pour vous aider !",
    "Ravi d'avoir pu vous aider ! ✨ À votre service !",
    "Content que ça vous aide ! 🌟 Besoin d'autre chose ?",
  ],
};

/**
 * Analyse le message et trouve la meilleure réponse
 */
export async function generateChatResponse(
  messages: ChatMessage[],
  sessionId?: string
): Promise<ChatResponse> {
  const lastMessage = messages[messages.length - 1];
  const userMessage = lastMessage.content.toLowerCase().trim();

  // Vérifier les salutations
  if (GREETINGS.keywords.some(keyword => userMessage.includes(keyword))) {
    return {
      message: GREETINGS.responses[Math.floor(Math.random() * GREETINGS.responses.length)],
      sessionId,
      confidence: 1,
    };
  }

  // Vérifier les remerciements
  if (THANKS.keywords.some(keyword => userMessage.includes(keyword))) {
    return {
      message: THANKS.responses[Math.floor(Math.random() * THANKS.responses.length)],
      sessionId,
      confidence: 1,
    };
  }

  // Rechercher dans la base de connaissances
  let bestMatch: { topic: string; score: number } | null = null;
  let maxScore = 0;

  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (userMessage.includes(keyword)) {
        score += keyword.length; // Les mots plus longs ont plus de poids
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = { topic, score };
    }
  }

  // Si on a trouvé une correspondance
  if (bestMatch && maxScore > 0) {
    const response = KNOWLEDGE_BASE[bestMatch.topic as keyof typeof KNOWLEDGE_BASE].response;
    return {
      message: response,
      sessionId,
      confidence: Math.min(maxScore / 10, 1),
    };
  }

  // Réponse par défaut si aucune correspondance
  return {
    message: `Désolé, je n'ai pas bien compris votre question. 🤔

Voici ce que je peux vous expliquer:
- ℹ️ Informations sur M2H2
- 💰 Comment faire un don
- 🙋 Devenir bénévole
- 🎓 Programmes pour jeunes
- 👴 Programmes pour seniors
- 📞 Nous contacter

Ou contactez-nous directement à **contact@m2h2.org** ! 📧`,
    sessionId,
    confidence: 0,
  };
}

/**
 * Détection rapide de FAQ (pour compatibilité)
 */
export function detectFAQ(question: string): string | null {
  // La logique est maintenant intégrée dans generateChatResponse
  return null;
}
