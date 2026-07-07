import type { IProject } from "@/types";

export const realTimeChat: IProject = {
  id: "real-time-chat",
  title: "Real-Time Chat Application",
  description:
    "Scalable chat platform with WebSocket communication, Redis pub/sub, and MongoDB persistence.",
  fullDescription:
    "A real-time messaging platform built with Socket.io, Redis, and MongoDB. Features include typing indicators, read receipts, file sharing, and group chats.",
  image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&fit=crop",
  technologies: [
    "Next.js 15",
    "TypeScript",
    "Socket.io",
    "Redis",
    "MongoDB",
    "Docker",
    "AWS EC2",
  ],
  features: [
    "Real-time messaging with WebSocket",
    "Typing indicators and read receipts",
    "File and image sharing",
    "Group chats with admin controls",
    "Message search and history",
  ],
  githubUrl: "https://github.com/Soruj24/realtime-chat",
  category: "Full Stack",
  featured: false,
  stats: {
    completionTime: "6 weeks",
    teamSize: "1 developer",
    complexity: "High",
    views: 1200,
    likes: 89,
  },
  architecture: "Socket.io server with Redis pub/sub, MongoDB persistence, Next.js frontend",
  developmentHighlights: [
    {
      title: "Horizontal Scaling",
      description: "Redis pub/sub enables horizontal scaling across multiple Socket.io nodes",
    },
    {
      title: "Message Persistence",
      description: "MongoDB with TTL indexes for efficient message storage and retrieval",
    },
  ],
  screenshots: [],
  challenges: [
    "Ensuring message delivery ordering across distributed Socket.io nodes",
    "Handling reconnection and state synchronization after network interruptions",
    "Managing file upload reliability and CDN cache invalidation",
  ],
  solutions: [
    "Implemented Redis-based message queue with sequence numbers per conversation",
    "Built session store with last-seen timestamp for incremental sync on reconnect",
    "Used signed S3 URLs for direct client-to-storage uploads with background processing",
  ],
  difficulty: "intermediate",
  duration: "6 weeks",
  teamSize: "1 developer",
  completionDate: "2023-08-20",
  createdAt: "2023-07-01",
  updatedAt: "2023-09-01",
  tags: ["chat", "websocket", "realtime", "socketio"],
  emoji: "💬",
  status: "completed",
  lessonsLearned: [
    "Message ordering requires a distributed sequence number system, not timestamps — clock skew breaks timestamp ordering",
    "WebSocket reconnection must be idempotent: clients should fetch missed messages via REST fallback",
    "File uploads should use presigned URLs to avoid tying up Socket.io event loop with binary transfers",
  ],
  futureImprovements: [
    "Add end-to-end encryption with the Signal Protocol",
    "Implement voice and video calls using WebRTC with TURN server fallback",
    "Build message threads and reactions for rich conversations",
  ],
  caseStudy: {
    problem:
      "Teams needed a lightweight, self-hosted chat solution with real-time messaging, file sharing, and group conversations.",
    solution:
      "Built a horizontally scalable chat platform using Socket.io with Redis pub/sub for cross-node message broadcasting.",
    results: [
      { metric: "Latency", value: "<50ms", label: "Message delivery P99" },
      { metric: "Concurrency", value: "5K+", label: "Simultaneous connections per node" },
      { metric: "Uptime", value: "99.95%", label: "Platform availability" },
      { metric: "Recovery", value: "<2s", label: "Reconnection time after network drop" },
    ],
  },
  performance: {
    loadTime: 1.8,
    accessibility: 92,
    bestPractices: 93,
    seo: 90,
  },
  overview:
    "A horizontally scalable real-time chat application designed for teams needing a self-hosted messaging solution.",
};
