export type ProjectStatus = "draft" | "in-progress" | "review" | "published" | "archived";

export type ProjectPriority = "low" | "medium" | "high" | "critical";

export type SortOption = "newest" | "oldest" | "name-asc" | "name-desc" | "views" | "updated";

export interface Project {
  id: string;
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  content?: string;
  category: string;
  tags: string[];
  techStack: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  featured: boolean;
  order?: number;
  image?: string;
  images?: string[];
  demoUrl?: string;
  repoUrl?: string;
  startDate?: string;
  endDate?: string;
  teamSize?: number;
  client?: string;
  budget?: number;
  hoursSpent?: number;
  views?: number;
  rating?: number;
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
