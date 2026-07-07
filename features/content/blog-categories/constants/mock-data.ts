import type { BlogCategory } from "../types";

export const MOCK_BLOG_CATEGORIES: BlogCategory[] = [
  { id: "bc-1", name: "Technology", slug: "technology", description: "General technology topics and industry trends", color: "#3b82f6", postCount: 12, createdAt: "2026-01-10" },
  { id: "bc-2", name: "Web Development", slug: "web-development", description: "Frontend and backend web development techniques", color: "#10b981", postCount: 18, createdAt: "2026-01-10" },
  { id: "bc-3", name: "AI & ML", slug: "ai-ml", description: "Artificial intelligence, machine learning, and data science", color: "#8b5cf6", postCount: 8, createdAt: "2026-01-15" },
  { id: "bc-4", name: "DevOps", slug: "devops", description: "CI/CD, infrastructure, and deployment strategies", color: "#f59e0b", postCount: 6, createdAt: "2026-02-01" },
  { id: "bc-5", name: "Career", slug: "career", description: "Software engineering career advice and insights", color: "#ec4899", postCount: 5, createdAt: "2026-02-10" },
  { id: "bc-6", name: "Tutorial", slug: "tutorial", description: "Step-by-step guides and how-to articles", color: "#06b6d4", postCount: 15, createdAt: "2026-02-20" },
  { id: "bc-7", name: "Performance", slug: "performance", description: "Performance optimization and best practices", color: "#ef4444", postCount: 4, createdAt: "2026-03-01" },
  { id: "bc-8", name: "Security", slug: "security", description: "Web security, encryption, and secure coding", color: "#84cc16", postCount: 3, createdAt: "2026-03-15" },
];
