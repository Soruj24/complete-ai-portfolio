import type { Project, ProjectCategory, ProjectTag } from "../types";

const TECH_STACKS = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "Redis", "Docker", "AWS", "GraphQL", "Tailwind CSS",
  "Prisma", "tRPC", "Stripe", "OpenAI", "LangChain", "Socket.io",
];

const CATEGORIES: ProjectCategory[] = [
  { id: "c1", name: "Web Application", slug: "web-app", color: "#3b82f6", count: 0 },
  { id: "c2", name: "Mobile App", slug: "mobile-app", color: "#10b981", count: 0 },
  { id: "c3", name: "AI/ML", slug: "ai-ml", color: "#8b5cf6", count: 0 },
  { id: "c4", name: "Dashboard", slug: "dashboard", color: "#f59e0b", count: 0 },
  { id: "c5", name: "API", slug: "api", color: "#06b6d4", count: 0 },
  { id: "c6", name: "Library", slug: "library", color: "#ec4899", count: 0 },
];

const TAGS: ProjectTag[] = [
  { id: "t1", name: "Open Source", slug: "open-source", count: 0 },
  { id: "t2", name: "Featured", slug: "featured", count: 0 },
  { id: "t3", name: "Production", slug: "production", count: 0 },
  { id: "t4", name: "Portfolio", slug: "portfolio", count: 0 },
  { id: "t5", name: "Client Work", slug: "client-work", count: 0 },
  { id: "t6", name: "Side Project", slug: "side-project", count: 0 },
];

const PROJECT_TEMPLATES: Partial<Project>[] = [
  { title: "AI-Powered Analytics Dashboard", description: "Real-time analytics platform with AI-driven insights, predictive modeling, and interactive visualizations", category: "Dashboard", status: "published", priority: "high", featured: true, views: 12450, rating: 4.8, teamSize: 4, hoursSpent: 840 },
  { title: "E-Commerce Platform", description: "Full-featured e-commerce solution with payment processing, inventory management, and multi-vendor support", category: "Web Application", status: "published", priority: "high", featured: true, views: 8920, rating: 4.6, teamSize: 6, hoursSpent: 1200 },
  { title: "Real-Time Chat Application", description: "Scalable messaging platform with WebSocket support, file sharing, and end-to-end encryption", category: "Web Application", status: "published", priority: "medium", featured: false, views: 5670, rating: 4.5, teamSize: 3, hoursSpent: 520 },
  { title: "Machine Learning Pipeline", description: "Automated ML pipeline for data preprocessing, model training, and deployment with monitoring", category: "AI/ML", status: "in-progress", priority: "high", featured: true, views: 3400, rating: 4.7, teamSize: 5, hoursSpent: 680 },
  { title: "Portfolio CMS", description: "Headless CMS for developer portfolios with drag-and-drop sections, markdown support, and theme system", category: "Web Application", status: "published", priority: "medium", featured: false, views: 2100, rating: 4.3, teamSize: 2, hoursSpent: 360 },
  { title: "API Gateway Service", description: "Centralized API gateway with rate limiting, authentication, caching, and request transformation", category: "API", status: "published", priority: "high", featured: false, views: 7800, rating: 4.9, teamSize: 3, hoursSpent: 450 },
  { title: "Mobile Fitness Tracker", description: "Cross-platform fitness tracking app with workout plans, nutrition logging, and progress analytics", category: "Mobile App", status: "in-progress", priority: "medium", featured: false, views: 1200, rating: 4.2, teamSize: 4, hoursSpent: 320 },
  { title: "Component Library", description: "React component library with 50+ accessible, customizable UI components and documentation", category: "Library", status: "draft", priority: "low", featured: false, views: 890, rating: 4.1, teamSize: 1, hoursSpent: 240 },
  { title: "Blockchain Explorer", description: "Blockchain explorer with transaction tracking, wallet analysis, and real-time network monitoring", category: "Web Application", status: "review", priority: "high", featured: true, views: 4500, rating: 4.6, teamSize: 5, hoursSpent: 720 },
  { title: "Customer Support Bot", description: "AI-powered customer support chatbot with intent recognition, knowledge base, and human handoff", category: "AI/ML", status: "published", priority: "medium", featured: false, views: 5600, rating: 4.4, teamSize: 3, hoursSpent: 480 },
  { title: "Video Streaming Platform", description: "Video streaming service with adaptive bitrate, transcoding pipeline, and content delivery optimization", category: "Web Application", status: "in-progress", priority: "critical", featured: true, views: 2200, rating: 4.5, teamSize: 8, hoursSpent: 960 },
  { title: "Task Management System", description: "Kanban-style project management tool with sprint planning, time tracking, and team collaboration", category: "Dashboard", status: "published", priority: "medium", featured: false, views: 3400, rating: 4.3, teamSize: 3, hoursSpent: 390 },
  { title: "Social Media Analytics", description: "Social media monitoring and analytics platform with sentiment analysis and competitor tracking", category: "Dashboard", status: "archived", priority: "low", featured: false, views: 1800, rating: 3.9, teamSize: 2, hoursSpent: 280 },
  { title: "Payment Integration SDK", description: "Stripe payment integration SDK with subscription management, invoicing, and webhook handling", category: "Library", status: "draft", priority: "medium", featured: false, views: 450, rating: 4.0, teamSize: 1, hoursSpent: 120 },
  { title: "DevOps Monitoring Tool", description: "Infrastructure monitoring tool with real-time metrics, alerting, and incident management", category: "Dashboard", status: "review", priority: "high", featured: false, views: 2900, rating: 4.7, teamSize: 4, hoursSpent: 550 },
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const MOCK_PROJECTS: Project[] = PROJECT_TEMPLATES.map((t, i) => {
  const slug = t.title!.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const startDate = new Date(Date.now() - (15 - i) * 30 * 86400000);
  const endDate = t.status === "published" || t.status === "archived"
    ? new Date(startDate.getTime() + (200 + Math.random() * 400) * 86400000)
    : undefined;

  return {
    id: `proj-${i + 1}`,
    title: t.title!,
    slug,
    description: t.description!,
    content: `# ${t.title}\n\nDetailed project description and implementation details for ${t.title}.`,
    category: t.category!,
    tags: pickRandom(TAGS, 2 + Math.floor(Math.random() * 3)).map((tg) => tg.name),
    techStack: pickRandom(TECH_STACKS, 3 + Math.floor(Math.random() * 4)),
    status: t.status as Project["status"],
    priority: t.priority as Project["priority"],
    featured: t.featured!,
    order: i,
    image: `/media/images/project-${(i % 5) + 1}.webp`,
    images: [],
    demoUrl: i % 3 === 0 ? `https://${slug}.demo.dev` : undefined,
    repoUrl: i % 2 === 0 ? `https://github.com/portfolio/${slug}` : undefined,
    startDate: startDate.toISOString(),
    endDate: endDate?.toISOString(),
    teamSize: t.teamSize!,
    client: i % 4 === 0 ? `Client ${(i % 3) + 1}` : undefined,
    budget: i % 5 === 0 ? `$${(Math.floor(Math.random() * 90) + 10)}k` : undefined,
    hoursSpent: t.hoursSpent!,
    views: t.views!,
    rating: t.rating!,
    createdAt: startDate.toISOString(),
    updatedAt: new Date(startDate.getTime() + 7 * 86400000).toISOString(),
  };
});

export { CATEGORIES, TAGS, TECH_STACKS };
