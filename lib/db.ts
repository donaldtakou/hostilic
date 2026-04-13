// Mini base de données en mémoire
// Note: Les données seront perdues lors du redémarrage du serveur

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

interface Donation {
  _id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  status: string;
  paymentMethod: string;
  createdAt: Date;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
}

interface Newsletter {
  _id: string;
  email: string;
  active: boolean;
  createdAt: Date;
  save?: () => Promise<Newsletter>;
}

interface Feedback {
  _id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: Date;
}

interface ChatMessage {
  _id: string;
  message: string;
  response: string;
  sessionId?: string;
  createdAt: Date;
}

// Stockage en mémoire
const db = {
  users: [] as User[],
  donations: [] as Donation[],
  contactMessages: [] as ContactMessage[],
  newsletters: [] as Newsletter[],
  feedbacks: [] as Feedback[],
  chatMessages: [] as ChatMessage[],
};

// Générer un ID unique
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Utilisateur par défaut admin
const adminUser: User = {
  _id: 'admin-001',
  name: 'Admin',
  email: 'admin@m2hc.org',
  password: '$2b$10$wKUJe2G5SW..Iz2BGOzo2eGrQDHtj0DUz/v.5J6wZ7DHcoePUXR8u', // Admin@M2HC2024
  role: 'admin',
  createdAt: new Date(),
};

// Initialiser avec l'admin
if (db.users.length === 0) {
  db.users.push(adminUser);
}

// Témoignages par défaut approuvés
const defaultFeedbacks: Feedback[] = [
  {
    _id: 'feedback-001',
    name: 'Marie Dupont',
    email: 'marie@example.com',
    rating: 5,
    message: "L'accompagnement holistique de M2HC m'a permis de retrouver un équilibre de vie. L'équipe est à l'écoute et professionnelle. Je recommande vivement leurs services.",
    approved: true,
    createdAt: new Date('2024-11-15'),
  },
  {
    _id: 'feedback-002',
    name: 'Jean Kouam',
    email: 'jean@example.com',
    rating: 5,
    message: "Grâce aux ateliers de M2HC, j'ai pu développer mes compétences et ma confiance en moi. Un grand merci à toute l'équipe pour leur dévouement.",
    approved: true,
    createdAt: new Date('2024-11-20'),
  },
  {
    _id: 'feedback-003',
    name: 'Aïssatou Sow',
    email: 'aissatou@example.com',
    rating: 5,
    message: "Les campagnes de santé holistique ont changé ma vie. J'ai appris à prendre soin de ma santé mentale et physique. Merci M2HC !",
    approved: true,
    createdAt: new Date('2024-12-01'),
  },
  {
    _id: 'feedback-004',
    name: 'Paul Nkeng',
    email: 'paul@example.com',
    rating: 4,
    message: "Excellent accompagnement, équipe professionnelle et bienveillante. Les formations sont de grande qualité et très enrichissantes.",
    approved: true,
    createdAt: new Date('2024-12-05'),
  },
  {
    _id: 'feedback-005',
    name: 'Sophie Mbarga',
    email: 'sophie@example.com',
    rating: 5,
    message: "M2HC m'a aidée à traverser une période difficile. Leur approche holistique prend vraiment en compte tous les aspects de notre bien-être.",
    approved: true,
    createdAt: new Date('2024-12-08'),
  },
  {
    _id: 'feedback-006',
    name: 'David Essomba',
    email: 'david@example.com',
    rating: 5,
    message: "Les programmes jeunesse de M2HC sont exceptionnels. Ils ont permis à mes enfants de s'épanouir et de développer leur potentiel.",
    approved: true,
    createdAt: new Date('2024-12-10'),
  },
];

// Initialiser avec les feedbacks par défaut
if (db.feedbacks.length === 0) {
  db.feedbacks.push(...defaultFeedbacks);
}

// API pour les Users
export const UserModel = {
  findOne: async (query: { email?: string; _id?: string }) => {
    if (query.email) {
      return db.users.find(u => u.email === query.email) || null;
    }
    if (query._id) {
      return db.users.find(u => u._id === query._id) || null;
    }
    return null;
  },
  
  create: async (data: Omit<User, '_id' | 'createdAt'>) => {
    const newUser: User = {
      ...data,
      _id: generateId(),
      createdAt: new Date(),
    };
    db.users.push(newUser);
    return newUser;
  },
  
  findAll: async () => db.users,
};

// API pour les Donations
export const DonationModel = {
  create: async (data: Omit<Donation, '_id' | 'createdAt'>) => {
    const newDonation: Donation = {
      ...data,
      _id: generateId(),
      createdAt: new Date(),
    };
    db.donations.push(newDonation);
    return newDonation;
  },
  
  findOne: async (query: { _id: string }) => {
    return db.donations.find(d => d._id === query._id) || null;
  },
  
  findAll: async () => db.donations,
  
  updateOne: async (query: { _id: string }, update: Partial<Donation>) => {
    const index = db.donations.findIndex(d => d._id === query._id);
    if (index !== -1) {
      db.donations[index] = { ...db.donations[index], ...update };
      return db.donations[index];
    }
    return null;
  },
};

// API pour les Contact Messages
export const ContactMessageModel = {
  create: async (data: Omit<ContactMessage, '_id' | 'createdAt'>) => {
    const newMessage: ContactMessage = {
      ...data,
      _id: generateId(),
      status: 'new',
      createdAt: new Date(),
    };
    db.contactMessages.push(newMessage);
    return newMessage;
  },
  
  findAll: async () => db.contactMessages,
};

// API pour les Newsletters
export const NewsletterModel = {
  create: async (data: { email: string }) => {
    const newSubscriber: Newsletter = {
      ...data,
      _id: generateId(),
      active: true,
      createdAt: new Date(),
      save: async function() {
        const index = db.newsletters.findIndex(n => n._id === this._id);
        if (index !== -1) {
          db.newsletters[index] = this;
        }
        return this;
      }
    };
    db.newsletters.push(newSubscriber);
    return newSubscriber;
  },
  
  findOne: async (query: { email: string }) => {
    const subscriber = db.newsletters.find(n => n.email === query.email);
    if (subscriber) {
      // Ajouter la méthode save
      subscriber.save = async function() {
        const index = db.newsletters.findIndex(n => n._id === this._id);
        if (index !== -1) {
          db.newsletters[index] = this;
        }
        return this;
      };
    }
    return subscriber || null;
  },
  
  findAll: async () => db.newsletters.filter(n => n.active),
  
  countActive: async () => db.newsletters.filter(n => n.active).length,
};

// API pour les Feedbacks
export const FeedbackModel = {
  create: async (data: Omit<Feedback, '_id' | 'createdAt'>) => {
    const newFeedback: Feedback = {
      ...data,
      _id: generateId(),
      approved: false,
      createdAt: new Date(),
    };
    db.feedbacks.push(newFeedback);
    return newFeedback;
  },
  
  findAll: async (query?: { approved?: boolean }) => {
    if (query?.approved !== undefined) {
      return db.feedbacks.filter(f => f.approved === query.approved);
    }
    return db.feedbacks;
  },
  
  updateOne: async (query: { _id: string }, update: Partial<Feedback>) => {
    const index = db.feedbacks.findIndex(f => f._id === query._id);
    if (index !== -1) {
      db.feedbacks[index] = { ...db.feedbacks[index], ...update };
      return db.feedbacks[index];
    }
    return null;
  },
  
  deleteOne: async (query: { _id: string }) => {
    const index = db.feedbacks.findIndex(f => f._id === query._id);
    if (index !== -1) {
      const deleted = db.feedbacks[index];
      db.feedbacks.splice(index, 1);
      return deleted;
    }
    return null;
  },
};

// API pour les Chat Messages
export const ChatMessageModel = {
  create: async (data: Omit<ChatMessage, '_id' | 'createdAt'>) => {
    const newMessage: ChatMessage = {
      ...data,
      _id: generateId(),
      createdAt: new Date(),
    };
    db.chatMessages.push(newMessage);
    return newMessage;
  },

  findAll: async () => db.chatMessages,

  deleteBySessionId: async (sessionId: string): Promise<number> => {
    const before = db.chatMessages.length;
    db.chatMessages = db.chatMessages.filter(m => m.sessionId !== sessionId);
    return before - db.chatMessages.length;
  },
};

// Fonction pour réinitialiser la DB (utile pour les tests)
export const resetDatabase = () => {
  db.users = [adminUser];
  db.donations = [];
  db.contactMessages = [];
  db.newsletters = [];
  db.feedbacks = [];
  db.chatMessages = [];
};

export default db;
