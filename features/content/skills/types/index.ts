export type SkillCategory = "frontend" | "backend" | "database" | "ai" | "devops" | "tools";

export interface Skill {
  _id: string;
  id?: string;
  name: string;
  slug?: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  color?: string;
  description?: string;
  technologies: string[];
  yearsOfExperience?: number;
  order: number;
  featured: boolean;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillFormData {
  name: string;
  slug: string;
  category: SkillCategory;
  level: number;
  icon: string;
  color: string;
  description: string;
  technologies: string[];
  yearsOfExperience: number;
  order: number;
  featured: boolean;
  enabled: boolean;
}

export const EMPTY_SKILL_FORM: SkillFormData = {
  name: "",
  slug: "",
  category: "frontend",
  level: 75,
  icon: "",
  color: "#3b82f6",
  description: "",
  technologies: [],
  yearsOfExperience: 0,
  order: 0,
  featured: false,
  enabled: true,
};

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  ai: "AI",
  devops: "DevOps",
  tools: "Tools",
};

export const SKILL_CATEGORIES: SkillCategory[] = ["frontend", "backend", "database", "ai", "devops", "tools"];

export const SKILL_COLORS = [
  "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b",
  "#ec4899", "#06b6d4", "#ef4444", "#84cc16",
];
