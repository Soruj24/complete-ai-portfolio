import type { ProjectTag } from "../types";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444", "#84cc16", "#f97316", "#6366f1"];

export const MOCK_TAGS: ProjectTag[] = [
  { id: "pt-1", name: "React", slug: "react", color: "#3b82f6", projectCount: 12, createdAt: "2026-01-10" },
  { id: "pt-2", name: "Next.js", slug: "nextjs", color: "#10b981", projectCount: 10, createdAt: "2026-01-10" },
  { id: "pt-3", name: "TypeScript", slug: "typescript", color: "#3b82f6", projectCount: 14, createdAt: "2026-01-10" },
  { id: "pt-4", name: "Node.js", slug: "nodejs", color: "#84cc16", projectCount: 8, createdAt: "2026-01-15" },
  { id: "pt-5", name: "Python", slug: "python", color: "#f59e0b", projectCount: 5, createdAt: "2026-01-20" },
  { id: "pt-6", name: "PostgreSQL", slug: "postgresql", color: "#06b6d4", projectCount: 7, createdAt: "2026-02-01" },
  { id: "pt-7", name: "MongoDB", slug: "mongodb", color: "#10b981", projectCount: 4, createdAt: "2026-02-05" },
  { id: "pt-8", name: "Docker", slug: "docker", color: "#06b6d4", projectCount: 6, createdAt: "2026-02-10" },
  { id: "pt-9", name: "GraphQL", slug: "graphql", color: "#ec4899", projectCount: 3, createdAt: "2026-03-01" },
  { id: "pt-10", name: "Tailwind CSS", slug: "tailwind", color: "#06b6d4", projectCount: 9, createdAt: "2026-03-05" },
  { id: "pt-11", name: "Prisma", slug: "prisma", color: "#6366f1", projectCount: 5, createdAt: "2026-03-10" },
  { id: "pt-12", name: "AWS", slug: "aws", color: "#f59e0b", projectCount: 4, createdAt: "2026-03-15" },
  { id: "pt-13", name: "Redis", slug: "redis", color: "#ef4444", projectCount: 3, createdAt: "2026-04-01" },
  { id: "pt-14", name: "OpenAI", slug: "openai", color: "#10b981", projectCount: 4, createdAt: "2026-04-10" },
  { id: "pt-15", name: "Figma", slug: "figma", color: "#f97316", projectCount: 2, createdAt: "2026-05-01" },
];

export { COLORS };
