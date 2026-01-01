export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  isActive: boolean;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  requiresTwoFactor?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface TwoFactorSetupResponse {
  success: boolean;
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
  message?: string;
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }

  interface User {
    id: string;
    role: string;
    email: string;
    status: string;
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    role: string;
    email: string;
    status: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  status: string;
  screenshots: string[];
  challenges: string[];
  solutions: string[];
  featured: boolean;
  difficulty: string;
  duration: string;
  teamSize: string;
  completionDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  emoji: string;
  stats: {
    completionTime: string;
    teamSize: string;
    complexity: string;
    views: number;
    likes: number;
  };
  architecture: string;
  developmentHighlights: {
    title: string;
    description: string;
  }[];
  lessonsLearned: string[];
  futureImprovements: string[];
  metaDescription?: string;
  seoTitle?: string;
  performance?: {
    loadTime: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

export interface IExperience {
  _id?: string;
  id?: string;
  year: string;
  role: string;
  company: string;
  description?: string;
  technologies?: string[];
  icon?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISkill {
  _id?: string;
  id?: string;
  name: string;
  level: number;
  icon?: string;
  color?: string;
  description?: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ISettings {
  _id?: string;
  siteName: string;
  contactEmail: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
  fullName: string;
  professionalTitle: string;
  bio: string;
  location: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  specializations: string[];
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPersonalInfo {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  profilePicture: string;
  createdAt?: string;
  updatedAt?: string;
}