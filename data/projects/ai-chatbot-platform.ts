import type { IProject } from "@/types";

export const aiChatbotPlatform: IProject = {
  id: "ai-chatbot-platform",
  title: "AI-Powered Chatbot Platform",
  description:
    "Enterprise chatbot platform with NLP, multi-channel support, real-time analytics, and custom model training.",
  fullDescription:
    "A sophisticated AI chatbot platform that leverages advanced NLP to provide intelligent conversational experiences across website, WhatsApp, and Messenger.",
  image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
  technologies: [
    "Next.js 15",
    "TypeScript",
    "Python",
    "FastAPI",
    "OpenAI GPT-4",
    "LangChain",
    "Pinecone",
    "Redis",
    "Docker",
    "PostgreSQL",
  ],
  features: [
    "Multi-channel NLU with context retention",
    "Real-time analytics dashboard",
    "Custom fine-tuned AI models",
    "Vector-based knowledge retrieval",
    "Sentiment analysis engine",
    "Multi-language support",
  ],
  githubUrl: "https://github.com/Soruj24/ai-chatbot",
  liveUrl: "https://ai-chatbot-soruj.vercel.app",
  category: "AI",
  featured: true,
  stats: {
    completionTime: "4 months",
    teamSize: "3 developers",
    complexity: "Very High",
    views: 2100,
    likes: 156,
  },
  architecture:
    "Microservices: Next.js frontend, FastAPI backend, Python AI services, Pinecone vector DB, Redis cache",
  developmentHighlights: [
    {
      title: "Contextual Memory System",
      description: "Hierarchical memory architecture with short-term and long-term context retention using LangChain",
    },
    {
      title: "Multi-Channel Architecture",
      description: "Unified message protocol across web, WhatsApp, and Messenger with consistent UX",
    },
    {
      title: "Real-Time Processing",
      description: "WebSocket-based streaming with sub-200ms response latency for natural conversations",
    },
  ],
  screenshots: [],
  challenges: [
    "Achieving sub-200ms response latency across multiple channels",
    "Maintaining conversation context across sessions and channels",
    "Fine-tuning models for domain-specific accuracy",
  ],
  solutions: [
    "Implemented Redis pub/sub for real-time message routing",
    "Built hierarchical memory system with vector-based retrieval",
    "Used prompt engineering + fine-tuning with domain datasets",
  ],
  difficulty: "advanced",
  duration: "4 months",
  teamSize: "3 developers",
  completionDate: "2024-04-20",
  createdAt: "2024-01-10",
  updatedAt: "2024-05-01",
  tags: ["ai", "chatbot", "nlp", "machine-learning", "automation"],
  emoji: "🤖",
  status: "completed",
  lessonsLearned: [
    "Streaming-first architecture is critical for perceived responsiveness in AI applications",
    "Vector search quality depends more on chunking strategy than embedding model choice",
    "WebSocket reconnection with exponential backoff is essential for production reliability",
  ],
  futureImprovements: [
    "Add voice channel support with speech-to-text and text-to-speech pipelines",
    "Implement A/B testing framework for prompt versioning",
    "Build automated fine-tuning pipeline using production conversation logs",
  ],
  caseStudy: {
    problem:
      "Businesses needed a unified AI communication platform that could handle customer support across multiple channels with context awareness and analytics.",
    solution:
      "Built a modular AI chatbot platform with a microservices architecture. LangChain powers the conversation chains with contextual memory.",
    results: [
      { metric: "Response Latency", value: "<200ms", label: "Average response time" },
      { metric: "Channels", value: "3", label: "Integrated communication channels" },
      { metric: "Accuracy", value: "94%", label: "Intent recognition accuracy" },
      { metric: "Uptime", value: "99.9%", label: "Platform availability" },
    ],
  },
  performance: {
    loadTime: 1.2,
    accessibility: 96,
    bestPractices: 94,
    seo: 98,
  },
  overview:
    "An enterprise-grade AI chatbot platform designed for businesses requiring intelligent, multi-channel customer communication. The platform unifies web chat, WhatsApp, and Messenger under a single AI-powered engine with context retention, sentiment analysis, and real-time analytics.",
};
