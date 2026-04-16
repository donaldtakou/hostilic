// Chatbot intelligent M2HC basé sur pattern matching

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
 * Base de connaissances M2HC (Marguerita Holistic Health Center)
 */
const KNOWLEDGE_BASE = {
  about: {
    keywords: ['qui', 'quoi', 'c\'est quoi', 'présentation', 'about', 'm2hc', 'marguerita', 'holistic', 'health', 'organisation'],
    response: `**M2HC - Marguerita Holistic Health Center**

Organisation de santé holistique au Cameroun dédiée au bien-être global.

**Notre Mission**:
Accompagnement holistique des personnes pour leur bien-être physique, mental, émotionnel et social.

**Nos Valeurs**:
- Dignité humaine
- Approche holistique
- Autonomisation
- Empathie et écoute
- Équité et inclusion
- Intégrité et professionnalisme

**Chiffres clés**:
- 1000+ personnes accompagnées
- 4.8/5 satisfaction client
- 10+ partenaires actifs

Pour en savoir plus, visitez [notre page À propos](/about).`,
  },
  
  donation: {
    keywords: ['don', 'donner', 'donation', 'aider financièrement', 'contribuer', 'soutenir', 'argent', 'compte', 'bancaire'],
    response: `**Comment faire un don à M2HC**

**Via le site web**:
1. Rendez-vous sur [/donate](/donate)
2. Choisissez votre montant
3. Paiement en ligne sécurisé
4. Reçu par email

**Virement bancaire**:
Compte: **679 012 650 01**
Ecobank Cameroun

**Mobile Money**:
Orange Money / MTN Mobile Money
(Disponible sur demande)

**Options de don**:
- Don ponctuel
- Don mensuel
- Parrainage de programme

Tous les dons contribuent directement à nos actions de santé holistique.`,
  },

  payment: {
    keywords: ['paiement', 'payer', 'orange', 'mtn', 'carte', 'visa', 'mastercard', 'moyens de paiement', 'ecobank'],
    response: `**Moyens de paiement acceptés**

**Virement Bancaire**:
Compte: **679 012 650 01**
Ecobank Cameroun

**Mobile Money**:
- Orange Money
- MTN Mobile Money
- Paiement instantané et sécurisé

**Paiement en ligne** (via le site):
Traitement sécurisé avec reçu automatique

**Sécurité**:
- Transactions cryptées
- Reçu fiscal automatique
- Aucune donnée bancaire stockée

Tous nos paiements sont traités de manière sécurisée.`,
  },

  youth_programs: {
    keywords: ['jeune', 'jeunes', 'formation', 'adolescent', 'étudiant', 'youth', 'santé mentale', 'ados'],
    response: `**Programmes pour les jeunes**

**Santé Holistique Jeunesse**:
- Accompagnement psychologique
- Gestion du stress et des émotions
- Développement personnel
- Leadership et confiance en soi

**Éducation et Sensibilisation**:
- Santé reproductive
- Prévention des violences
- Droits des jeunes
- Hygiène de vie

**Ateliers Pratiques**:
- Art-thérapie
- Sport et bien-être
- Méditation et relaxation
- Groupes de parole

Journée Internationale de la Jeunesse organisée chaque année.

Plus d'infos: [/programs](/programs)
Email: mholistichealthcenter@gmail.com`,
  },

  health_programs: {
    keywords: ['santé', 'holistique', 'campagne', 'consultation', 'médical', 'soins', 'handicap', 'déplacés', 'noso', 'covid'],
    response: `**Programmes de Santé Holistique**

**Campagnes de Santé**:
- Interventions en zones rurales et urbaines
- Consultations médicales gratuites
- Dépistage et prévention
- Distribution de médicaments

**Accompagnement Spécialisé**:
- Personnes en situation de handicap
- Personnes déplacées internes (NOSO)
- Santé mentale et psychologique
- Soutien nutritionnel
- Réarmement moral du personnel de santé

**Prévention et Sensibilisation**:
- Hygiène et assainissement
- Maladies chroniques
- Santé reproductive
- Premiers secours

**Chiffres**:
- 7+ zones d'intervention
- 1000+ personnes accompagnées

Plus d'infos: [/programs](/programs)`,
  },

  women_programs: {
    keywords: ['femme', 'femmes', 'woman', 'genre', 'violences', 'autonomisation', 'empowerment', '16 jours'],
    response: `**Programmes pour les femmes**

**Journées Thématiques**:
- Journée Internationale de la Femme
- Journée de la Femme Africaine
- 16 Jours d'Activisme contre les Violences Basées sur le Genre

**Accompagnement**:
- Autonomisation économique
- Santé reproductive
- Lutte contre les violences
- Leadership féminin

**Sensibilisation**:
- Droits des femmes
- Égalité de genre
- Empowerment
- Santé holistique

Célébration et autonomisation des femmes.

Voir nos actions: [Galerie](/gallery)
Plus d'infos: [/programs](/programs)`,
  },

  family_programs: {
    keywords: ['famille', 'enfant', 'enfants', 'parents', 'familial', 'scolaire', 'éducation'],
    response: `**Programmes Famille et Enfants**

**Journées Thématiques**:
- Journée Internationale de la Famille
- Journée de l'Enfant Africain
- Remise de Dons Scolaires

**Soutien Familial**:
- Accompagnement parental
- Cohésion familiale
- Médiation familiale
- Santé holistique de la famille

**Éducation des Enfants**:
- Fournitures scolaires
- Soutien éducatif
- Droits de l'enfant
- Bien-être des enfants

Célébration des liens familiaux.

Voir nos actions: [Galerie](/gallery)`,
  },

  events: {
    keywords: ['événement', 'journée', 'célébration', 'activité', 'programme', 'action'],
    response: `**Événements et Journées Thématiques**

**Femmes**:
- Journée Internationale de la Femme
- Journée de la Femme Africaine
- 16 Jours d'Activisme contre les VBG

**Famille**:
- Journée Internationale de la Famille
- Journée de l'Enfant Africain

**Droits Humains**:
- Journée des Droits de l'Homme
- Journée des Personnes en Situation de Handicap

**Jeunesse**:
- Journée Internationale de la Jeunesse

Voir toutes nos photos: [Galerie](/gallery)
Plus d'infos: [/programs](/programs)`,
  },

  contact: {
    keywords: ['contact', 'joindre', 'appeler', 'email', 'téléphone', 'adresse', 'bureau', 'localisation'],
    response: `**Contactez M2HC**

**Email**:
mholistichealthcenter@gmail.com

**Compte Bancaire**:
679 012 650 01
Ecobank Cameroun

**Adresse**:
Cameroun

**Liens utiles**:
- Nos [Programmes](/programs)
- Notre [Galerie](/gallery)
- [Témoignages](/testimonials)
- [Formulaire de contact](/contact)

Nous répondons sous 24-48h.`,
  },

  help: {
    keywords: ['aide', 'aider', 'help', 'comment', 'puis-je', 'participer', 'soutenir', 'bénévole', 'volontaire'],
    response: `**Comment soutenir M2HC**

**Faire un Don**:
Contribuez financièrement via [/donate](/donate)
Compte: 679 012 650 01

**Parrainer un Programme**:
- Campagnes de santé
- Journées thématiques
- Dons scolaires

**Partager nos Actions**:
Parlez de M2HC sur les réseaux sociaux
Consultez notre [Galerie](/gallery)

**Don en Nature**:
- Matériel médical
- Fournitures scolaires
- Vêtements et couvertures

**Partenariat Institutionnel**:
Collaborations avec organisations
Voir nos [Partenaires](/about)

Chaque geste compte.

Contact: mholistichealthcenter@gmail.com`,
  },

  navigation: {
    keywords: ['page', 'site', 'trouver', 'où', 'navigation', 'menu', 'galerie', 'témoignage', 'blog'],
    response: `**Navigation du site M2HC**

**Pages principales**:
- [Accueil](/) - Présentation et actualités
- [À propos](/about) - Notre mission et valeurs
- [Programmes](/programs) - Nos 5 axes stratégiques
- [Faire un don](/donate) - Soutenir nos actions
- [Blog](/blog) - Actualités et articles
- [Galerie](/gallery) - Photos de nos interventions
- [Témoignages](/testimonials) - Retours d'expérience
- [Contact](/contact) - Nous joindre

**Chiffres clés**:
- 1000+ personnes accompagnées
- 10+ partenaires actifs
- 7+ zones d'intervention
- 4.8/5 satisfaction

Besoin d'aide? Posez votre question.`,
  },

  gallery: {
    keywords: ['photo', 'photos', 'image', 'images', 'galerie', 'voir', 'album'],
    response: `**Galerie M2HC** - Découvrez nos actions en images

**Collections disponibles**:
- Événements & Journées thématiques
- Campagnes de Santé Holistique
- Actions Communautaires
- M2HC et les Institutions
- Présentation de M2HC au GFAC à Istanbul
- Programmes Jeunesse et Famille

**Événements récents**:
- 16 Jours d'Activisme contre les VBG
- Journée de la Femme
- Prise en charge personnes déplacées NOSO
- Remise de dons scolaires

Visitez la [Galerie complète](/gallery) pour voir toutes nos photos.`,
  },

  testimonials: {
    keywords: ['témoignage', 'témoignages', 'avis', 'expérience', 'retour', 'satisfaction'],
    response: `**Témoignages M2HC**

**Satisfaction client**:
- 4.8/5 de satisfaction
- 95% de clients satisfaits
- 1000+ personnes accompagnées

**Ce que disent nos bénéficiaires**:
- Accompagnement professionnel et bienveillant
- Approche holistique efficace
- Équipe à l'écoute
- Impact réel sur le bien-être

**Partagez votre expérience**:
Laissez un témoignage et inspirez d'autres personnes dans leur parcours de guérison.

Consultez les [Témoignages](/testimonials) et laissez le vôtre.`,
  },
};

/**
 * Réponses pour salutations
 */
const GREETINGS = {
  keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'hi', 'hey', 'coucou'],
  responses: [
    "Bonjour. Bienvenue sur M2HC. Comment puis-je vous aider aujourd'hui?",
    "Bonjour et bienvenue sur M2HC - Marguerita Holistic Health Center. Comment puis-je vous assister?",
    "Salut. Je suis là pour répondre à vos questions sur M2HC. Que voulez-vous savoir?",
  ],
};

/**
 * Réponses pour remerciements
 */
const THANKS = {
  keywords: ['merci', 'thanks', 'thank you', 'cool', 'super', 'génial', 'parfait'],
  responses: [
    "Avec plaisir. N'hésitez pas si vous avez d'autres questions sur M2HC.",
    "De rien. Je suis là pour vous aider.",
    "Ravi d'avoir pu vous aider. À votre service.",
    "Content que ça vous aide. Besoin d'autre chose?",
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
        score += keyword.length;
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
    message: `Désolé, je n'ai pas bien compris votre question.

Voici ce que je peux vous expliquer sur M2HC:
- Informations sur M2HC
- Comment faire un don
- Programmes de santé holistique
- Programmes pour femmes
- Programmes famille et enfants
- Programmes jeunesse
- Galerie et événements
- Témoignages
- Nous contacter

Ou contactez-nous directement: mholistichealthcenter@gmail.com`,
    sessionId,
    confidence: 0,
  };
}

/**
 * Détection rapide de FAQ (pour compatibilité)
 */
export function detectFAQ(question: string): string | null {
  return null;
}
