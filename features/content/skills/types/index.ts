export type SkillCategory = "frontend" | "backend" | "devops" | "database" | "design" | "tools" | "ai" | "other";

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category: SkillCategory;
  level: number;
  icon: string;
  color: string;
  yearsOfExperience: number;
  order: number;
  createdAt: string;
}

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  database: "Database",
  design: "Design",
  tools: "Tools",
  ai: "AI/ML",
  other: "Other",
};
