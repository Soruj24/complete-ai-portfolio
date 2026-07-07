import type { IProject } from "@/types";

export const eCommercePlatform: IProject = {
  id: "e-commerce-platform",
  title: "Full-Stack E-Commerce Platform",
  description:
    "Production-grade e-commerce platform with payment processing, inventory management, and real-time order tracking.",
  fullDescription:
    "A comprehensive e-commerce solution built with Next.js 15, featuring Stripe payment integration, real-time inventory tracking, admin dashboard, and analytics.",
  image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  technologies: [
    "Next.js 15",
    "TypeScript",
    "Stripe",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Docker",
    "AWS S3",
  ],
  features: [
    "Stripe payment integration with webhook handling",
    "Real-time inventory management",
    "Admin dashboard with sales analytics",
    "Order tracking and notifications",
    "Search with Algolia integration",
  ],
  githubUrl: "https://github.com/Soruj24/ecommerce",
  category: "Full Stack",
  featured: true,
  stats: {
    completionTime: "3 months",
    teamSize: "2 developers",
    complexity: "High",
    views: 1800,
    likes: 134,
  },
  architecture: "Next.js full-stack with Prisma ORM, PostgreSQL database, Redis caching, Stripe payments",
  developmentHighlights: [
    {
      title: "Payment Orchestration",
      description: "Stripe integration with webhook idempotency, refund handling, and subscription management",
    },
    {
      title: "Real-Time Inventory",
      description: "Redis-backed inventory tracking with race-condition prevention using atomic operations",
    },
    {
      title: "Search Architecture",
      description: "Algolia-powered search with faceted filtering, typo tolerance, and instant results",
    },
  ],
  screenshots: [],
  challenges: [
    "Handling payment race conditions during high-traffic flash sales",
    "Maintaining inventory consistency across distributed sessions",
  ],
  solutions: [
    "Implemented Redis distributed locks with TTL for inventory operations",
    "Used Stripe webhooks with idempotency keys for reliable payment processing",
  ],
  difficulty: "advanced",
  duration: "3 months",
  teamSize: "2 developers",
  completionDate: "2024-01-15",
  createdAt: "2023-10-01",
  updatedAt: "2024-02-01",
  tags: ["ecommerce", "full-stack", "payments", "nextjs"],
  emoji: "🛒",
  status: "completed",
  lessonsLearned: [
    "Idempotency keys are non-negotiable for payment processing — they prevent double charges even under network failures",
    "Redis distributed locks require careful TTL tuning: too short causes race conditions, too long creates bottlenecks",
    "Product search relevance needs continuous tuning — Algolia ranking rules require iteration based on click-through data",
  ],
  futureImprovements: [
    "Implement marketplace mode with multi-vendor support and commission splitting",
    "Add AI-powered product recommendations based on browsing history",
    "Build mobile app using React Native with shared API layer",
  ],
  caseStudy: {
    problem:
      "Small-to-medium businesses needed an affordable, scalable e-commerce solution with modern features like real-time inventory, payment processing, and analytics.",
    solution:
      "Built a monolithic Next.js application with Prisma ORM and PostgreSQL. Stripe handles payments with webhook-based idempotency.",
    results: [
      { metric: "Checkout Time", value: "<5s", label: "Average checkout completion" },
      { metric: "Concurrency", value: "10K+", label: "Peak concurrent users" },
      { metric: "Accuracy", value: "99.99%", label: "Inventory accuracy" },
      { metric: "Payment Success", value: "99.5%", label: "Successful transactions" },
    ],
  },
  performance: {
    loadTime: 1.5,
    accessibility: 94,
    bestPractices: 96,
    seo: 97,
  },
  overview:
    "A production-grade e-commerce platform designed for SMBs requiring modern commerce capabilities without enterprise overhead.",
};
