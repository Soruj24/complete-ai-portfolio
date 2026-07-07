export interface CaseStudySection {
  title: string;
  content: string;
  items?: string[];
}

export interface ImplementationPhase {
  phase: string;
  tasks: string[];
}

export interface CaseStudyResult {
  metric: string;
  value: string;
  label: string;
}

export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  fullDescription?: string;
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
  caseStudy?: {
    problem: string;
    solution: string;
    results: CaseStudyResult[];
  };
  overview?: string;
  research?: string;
  planning?: string;
  databaseDesign?: string;
  folderStructure?: string;
  implementation?: ImplementationPhase[];
  optimization?: string[];
  security?: string[];
  deployment?: string;
  businessImpact?: string;
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
  period: string;
  highlights: string[];
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
