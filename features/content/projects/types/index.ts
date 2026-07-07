export type ProjectStatus = "draft" | "in-progress" | "review" | "published" | "archived";
export type ProjectPriority = "low" | "medium" | "high" | "critical";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  techStack: string[];
  status: ProjectStatus;
  priority: ProjectPriority;
  featured: boolean;
  order: number;
  image: string;
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  startDate: string;
  endDate?: string;
  teamSize: number;
  client?: string;
  budget?: string;
  hoursSpent: number;
  views: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
}

export interface ProjectTag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface ProjectStats {
  total: number;
  published: number;
  draft: number;
  inProgress: number;
  archived: number;
  featured: number;
  totalViews: number;
  avgRating: number;
  totalHours: number;
}

export interface KanbanColumn {
  id: ProjectStatus;
  title: string;
  items: Project[];
}

export interface ProjectFilterState {
  search: string;
  status: ProjectStatus | "all";
  category: string;
  priority: ProjectPriority | "all";
  sort: "title" | "date" | "views" | "rating";
  order: "asc" | "desc";
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  "in-progress": "In Progress",
  review: "In Review",
  published: "Published",
  archived: "Archived",
};

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};
