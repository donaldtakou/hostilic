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
  status: string;
  createdAt: Date;
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
  password: '$2a$10$YourHashedPasswordHere', // bcrypt hash
  role: 'admin',
  createdAt: new Date(),
};

// Initialiser avec l'admin
if (db.users.length === 0) {
  db.users.push(adminUser);
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
      status: 'active',
      createdAt: new Date(),
    };
    db.newsletters.push(newSubscriber);
    return newSubscriber;
  },
  
  findOne: async (query: { email: string }) => {
    return db.newsletters.find(n => n.email === query.email) || null;
  },
  
  findAll: async () => db.newsletters,
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
