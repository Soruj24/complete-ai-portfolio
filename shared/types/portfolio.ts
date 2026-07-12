export interface ProjectStats {
  completionTime: string;
  teamSize: string;
  complexity: string;
  views: number;
  likes: number;
}

export interface DevelopmentHighlight {
  title: string;
  description: string;
}

export interface CaseStudyResult {
  metric: string;
  value: string;
  label: string;
}

export interface CaseStudySection {
  title: string;
  content: string;
  items?: string[];
}

export interface ImplementationPhase {
  phase: string;
  tasks: string[];
}

export interface ProjectPerformance {
  loadTime: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  results: CaseStudyResult[];
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
  tags: string[];
  emoji: string;
  stats: ProjectStats;
  architecture: string;
  developmentHighlights: DevelopmentHighlight[];
  lessonsLearned: string[];
  futureImprovements?: string[];
  metaDescription?: string;
  seoTitle?: string;
  performance?: ProjectPerformance;
  caseStudy?: ProjectCaseStudy;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface ISkill {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  level: number;
  icon?: string;
  color?: string;
  description?: string;
  category: string;
  yearsOfExperience?: number;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IExperience {
  _id?: string;
  id?: string;
  year?: string;
  role?: string;
  position?: string;
  company: string;
  location?: string;
  employmentType?: string;
  description?: string;
  technologies?: string[];
  techStack?: string[];
  highlights?: string[];
  icon?: string;
  color?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISocialLink {
  _id?: string;
  id?: string;
  platform: string;
  label: string;
  url: string;
  icon?: string;
  handle?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISettings {
  _id?: string;
  id?: string;
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
