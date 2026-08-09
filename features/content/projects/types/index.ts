export type ProjectStatus = "draft" | "in-progress" | "review" | "published" | "archived";

export type ProjectPriority = "low" | "medium" | "high" | "critical";

export type SortOption = "newest" | "oldest" | "name-asc" | "name-desc" | "views" | "updated";

export interface Project {
  id: string;
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  fullDescription?: string;
  content?: string;
  category: string;
  tags: string[];
  techStack: string[];
  technologies?: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  featured: boolean;
  order?: number;
  image?: string;
  images?: string[];
  screenshots?: string[];
  demoUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  teamSize?: number | string;
  client?: string;
  budget?: number;
  hoursSpent?: number;
  views?: number;
  rating?: number;
  difficulty?: string;
  duration?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  caseStudy?: {
    problem?: string;
    solution?: string;
    results?: { metric: string; value: string; label: string }[];
  };
  seoTitle?: string;
  metaDescription?: string;
  architecture?: string;
  developmentHighlights?: { title: string; description: string }[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectCategory {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  projectCount?: number;
}

export interface ProjectStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  status: ProjectStatus;
  featured: boolean;
  image: string;
  techStack: string[];
  demoUrl: string;
  repoUrl: string;
  githubUrl: string;
  liveUrl: string;
  client: string;
  difficulty: string;
  duration: string;
  teamSize: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  caseStudyProblem: string;
  caseStudySolution: string;
  caseStudyResults: { metric: string; value: string; label: string }[];
  seoTitle: string;
  metaDescription: string;
  tags: string[];
}

export const EMPTY_PROJECT_FORM: ProjectFormData = {
  title: "",
  slug: "",
  description: "",
  fullDescription: "",
  category: "",
  status: "draft",
  featured: false,
  image: "",
  techStack: [],
  demoUrl: "",
  repoUrl: "",
  githubUrl: "",
  liveUrl: "",
  client: "",
  difficulty: "",
  duration: "",
  teamSize: "",
  features: [],
  challenges: [],
  solutions: [],
  caseStudyProblem: "",
  caseStudySolution: "",
  caseStudyResults: [],
  seoTitle: "",
  metaDescription: "",
  tags: [],
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  "in-progress": "In Progress",
  review: "Review",
  published: "Published",
  archived: "Archived",
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-slate-500/10", text: "text-slate-500", dot: "bg-slate-500" },
  "in-progress": { bg: "bg-blue-500/10", text: "text-blue-500", dot: "bg-blue-500" },
  review: { bg: "bg-amber-500/10", text: "text-amber-500", dot: "bg-amber-500" },
  published: { bg: "bg-emerald-500/10", text: "text-emerald-500", dot: "bg-emerald-500" },
  archived: { bg: "bg-red-500/10", text: "text-red-500", dot: "bg-red-500" },
};
