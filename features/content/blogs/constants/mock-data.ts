import type { BlogPost, BlogCategory, BlogStatus } from "../types";

const CATEGORIES: BlogCategory[] = [
  { id: "bc1", name: "Technology", slug: "technology", count: 0 },
  { id: "bc2", name: "Web Development", slug: "web-development", count: 0 },
  { id: "bc3", name: "AI & ML", slug: "ai-ml", count: 0 },
  { id: "bc4", name: "DevOps", slug: "devops", count: 0 },
  { id: "bc5", name: "Career", slug: "career", count: 0 },
  { id: "bc6", name: "Tutorial", slug: "tutorial", count: 0 },
];

const TITLES = [
  "Building Scalable Microservices with Node.js",
  "A Practical Guide to React Server Components",
  "Understanding TypeScript Generics: From Zero to Hero",
  "The Complete Guide to Docker for Developers",
  "How to Optimize Next.js Applications for Production",
  "Introduction to LangChain and LLM Orchestration",
  "Modern CSS Techniques Every Developer Should Know",
  "Building Real-Time Applications with WebSockets",
  "The State of AI Development in 2026",
  "Advanced Patterns in React State Management",
  "Implementing CI/CD Pipelines with GitHub Actions",
  "A Deep Dive into PostgreSQL Performance Tuning",
  "Getting Started with GraphQL in Production",
  "Security Best Practices for Web Applications",
  "Building Accessible Web Applications from Scratch",
];

const EXCERPTS = [
  "Learn how to design and implement scalable microservices architecture using Node.js, Docker, and Kubernetes.",
  "Discover the power of React Server Components and how they can dramatically improve your app's performance.",
  "Master TypeScript generics with practical examples and real-world patterns used in production codebases.",
  "A comprehensive guide to containerization, Docker Compose, and deploying multi-service applications.",
  "Explore advanced optimization techniques for Next.js including ISR, streaming, and bundle analysis.",
  "An introduction to building LLM-powered applications using LangChain, vector databases, and prompt engineering.",
  "Explore modern CSS features like container queries, cascade layers, and the new color functions.",
  "Build real-time features with WebSocket protocols, Socket.io, and event-driven architecture patterns.",
  "A comprehensive overview of the AI landscape in 2026, from foundation models to deployment strategies.",
  "Explore advanced state management patterns including Zustand, Jotai, and XState for complex UIs.",
  "Learn how to set up and optimize CI/CD pipelines for faster, more reliable deployments.",
  "Deep dive into PostgreSQL optimization including indexing strategies, query planning, and configuration tuning.",
  "A practical guide to implementing GraphQL APIs with Apollo Server, code generation, and federation.",
  "Essential security practices including OWASP top 10, authentication, encryption, and secure deployment.",
  "Build inclusive web applications following WCAG guidelines with proper semantic HTML and ARIA.",
];

const TAGS = ["react", "typescript", "nodejs", "nextjs", "docker", "ai", "css", "database", "devops", "security", "graphql", "testing", "performance", "architecture", "tutorial"];

export const MOCK_BLOG_POSTS: BlogPost[] = TITLES.map((title, i) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const statuses: BlogStatus[] = ["published", "published", "published", "draft", "review", "published", "archived"];
  const status = statuses[i % statuses.length];
  const daysAgo = Math.floor(Math.random() * 180);
  const created = new Date(Date.now() - daysAgo * 86400000);
  const published = status === "published" ? new Date(created.getTime() + 86400000 * 2).toISOString() : undefined;

  return {
    id: `blog-${i + 1}`,
    title,
    slug,
    excerpt: EXCERPTS[i],
    content: `# ${title}\n\nFull content for ${title}. This article covers everything you need to know about this topic with detailed explanations, code examples, and best practices.`,
    category: CATEGORIES[i % CATEGORIES.length].name,
    tags: [TAGS[i % TAGS.length], TAGS[(i + 3) % TAGS.length], TAGS[(i + 7) % TAGS.length]],
    author: "John Doe",
    status,
    featured: i < 3,
    coverImage: `/media/images/blog-${(i % 5) + 1}.webp`,
    readingTime: 5 + Math.floor(Math.random() * 15),
    views: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 200) + 10,
    comments: Math.floor(Math.random() * 40),
    publishedAt: published,
    createdAt: created.toISOString(),
    updatedAt: new Date(created.getTime() + 3600000 * randomInt(1, 48)).toISOString(),
  };
});

function randomInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export { CATEGORIES, TAGS };
