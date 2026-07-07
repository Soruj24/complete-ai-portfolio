import type { IProject } from "@/types";

export const cryptoDashboard: IProject = {
  id: "crypto-dashboard",
  title: "Cryptocurrency Dashboard",
  description:
    "Real-time crypto tracking dashboard with interactive charts, portfolio management, and alerts.",
  fullDescription:
    "A feature-rich cryptocurrency dashboard with live price tracking, interactive charts using Recharts, portfolio management, price alerts, and news aggregation.",
  image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
  technologies: [
    "Next.js 15",
    "TypeScript",
    "Recharts",
    "WebSocket",
    "Redis",
    "Tailwind CSS",
  ],
  features: [
    "Real-time price tracking via WebSocket",
    "Interactive charts with multiple timeframes",
    "Portfolio tracking with P&L calculation",
    "Price alert system",
    "News aggregation",
  ],
  githubUrl: "https://github.com/Soruj24/crypto-dashboard",
  category: "Frontend",
  featured: false,
  stats: {
    completionTime: "4 weeks",
    teamSize: "1 developer",
    complexity: "Medium",
    views: 850,
    likes: 64,
  },
  architecture: "Next.js with client-side WebSocket connections, Recharts for visualization, Redis caching",
  developmentHighlights: [
    {
      title: "Real-Time Data Pipeline",
      description: "WebSocket connection management with automatic reconnection and backoff strategy",
    },
    {
      title: "Chart Performance",
      description: "Virtualized chart rendering for smooth 60fps updates with thousands of data points",
    },
  ],
  screenshots: [],
  challenges: [
    "Handling WebSocket connection drops and data gaps during reconnection",
    "Rendering thousands of data points at 60fps without jank",
    "Managing portfolio P&L calculations across multiple timeframes and currencies",
  ],
  solutions: [
    "Built reconnection manager with exponential backoff and data gap filling via REST fallback",
    "Implemented canvas-based chart rendering with data decimation for smooth performance",
    "Used Redis for portfolio snapshot storage with TTL-based price history caching",
  ],
  difficulty: "intermediate",
  duration: "4 weeks",
  teamSize: "1 developer",
  completionDate: "2023-06-15",
  createdAt: "2023-05-15",
  updatedAt: "2023-07-01",
  tags: ["crypto", "dashboard", "data-visualization", "realtime"],
  emoji: "📊",
  status: "completed",
  lessonsLearned: [
    "Real-time data visualization requires data decimation: you can't render 100K points at 60fps with SVG",
    "WebSocket connections need dedicated health monitoring — silent disconnects are the hardest bugs to catch",
    "Portfolio calculations must be idempotent: the same inputs should always produce the same P&L",
  ],
  futureImprovements: [
    "Add portfolio rebalancing suggestions based on target allocation",
    "Implement tax lot accounting (FIFO, LIFO, specific identification)",
    "Build mobile app with push notifications for price alerts",
  ],
  caseStudy: {
    problem:
      "Retail crypto investors needed a unified dashboard combining real-time prices, portfolio tracking, and alerts.",
    solution:
      "Built a lightweight, real-time dashboard with WebSocket-powered price updates, Recharts-based interactive visualizations, and Redis-backed portfolio caching.",
    results: [
      { metric: "Refresh Rate", value: "100ms", label: "Price update interval" },
      { metric: "Chart FPS", value: "60", label: "Smooth rendering performance" },
      { metric: "Data Points", value: "50K+", label: "Real-time chart data capacity" },
      { metric: "Alert Latency", value: "<1s", label: "Price alert delivery" },
    ],
  },
  performance: {
    loadTime: 2.1,
    accessibility: 88,
    bestPractices: 91,
    seo: 85,
  },
  overview:
    "A real-time cryptocurrency dashboard designed for retail investors who need live price tracking, portfolio management, and price alerts in a single, lightweight interface.",
};
