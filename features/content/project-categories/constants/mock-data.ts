import type { ProjectCategory } from "../types";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444", "#84cc16"];
const ICONS = ["folder", "code", "database", "globe", "smartphone", "brain", "shield", "palette"];

export const MOCK_CATEGORIES: ProjectCategory[] = [
  { id: "pc-1", name: "Web Application", slug: "web-app", description: "Full-stack web applications built with modern frameworks", color: "#3b82f6", icon: "globe", projectCount: 8, createdAt: "2026-01-10", updatedAt: "2026-06-15" },
  { id: "pc-2", name: "Mobile App", slug: "mobile-app", description: "Cross-platform and native mobile applications", color: "#10b981", icon: "smartphone", projectCount: 4, createdAt: "2026-01-15", updatedAt: "2026-06-10" },
  { id: "pc-3", name: "AI/ML", slug: "ai-ml", description: "Artificial intelligence and machine learning projects", color: "#8b5cf6", icon: "brain", projectCount: 6, createdAt: "2026-02-01", updatedAt: "2026-07-01" },
  { id: "pc-4", name: "Dashboard", slug: "dashboard", description: "Analytics dashboards and data visualization tools", color: "#f59e0b", icon: "folder", projectCount: 5, createdAt: "2026-02-20", updatedAt: "2026-06-28" },
  { id: "pc-5", name: "API", slug: "api", description: "RESTful and GraphQL API services", color: "#06b6d4", icon: "code", projectCount: 3, createdAt: "2026-03-05", updatedAt: "2026-06-20" },
  { id: "pc-6", name: "Library", slug: "library", description: "Reusable libraries, SDKs, and packages", color: "#ec4899", icon: "database", projectCount: 2, createdAt: "2026-03-15", updatedAt: "2026-05-30" },
  { id: "pc-7", name: "DevOps", slug: "devops", description: "CI/CD, infrastructure, and deployment tooling", color: "#ef4444", icon: "shield", projectCount: 3, createdAt: "2026-04-01", updatedAt: "2026-06-25" },
  { id: "pc-8", name: "Design System", slug: "design-system", description: "UI component libraries and design systems", color: "#84cc16", icon: "palette", projectCount: 1, createdAt: "2026-04-20", updatedAt: "2026-05-15" },
];

export { COLORS, ICONS };
