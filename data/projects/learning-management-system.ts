import type { IProject } from "@/types";

export const learningManagementSystem: IProject = {
  id: "learning-management-system",
  title: "Learning Management System",
  description:
    "Enterprise LMS with course creation, student enrollment, progress tracking, and assessments.",
  fullDescription:
    "An enterprise LMS platform featuring course creation tools, student management, progress analytics, assessment engine, and certification generation.",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
  technologies: [
    "Next.js 15",
    "TypeScript",
    "MongoDB",
    "Redis",
    "AWS S3",
    "Docker",
    "Stripe",
  ],
  features: [
    "Course creation with rich content editor",
    "Student enrollment and progress tracking",
    "Assessment engine with auto-grading",
    "Certificate generation",
    "Analytics dashboard",
  ],
  category: "Full Stack",
  featured: false,
  stats: {
    completionTime: "3 months",
    teamSize: "2 developers",
    complexity: "High",
    views: 950,
    likes: 72,
  },
  architecture: "Next.js app with MongoDB, Redis caching, AWS S3 for media, Stripe for payments",
  developmentHighlights: [
    {
      title: "Assessment Engine",
      description: "Dynamic quiz generation with adaptive difficulty and auto-grading logic",
    },
    {
      title: "Progress Analytics",
      description: "Real-time student progress tracking with Redis-based session management",
    },
  ],
  screenshots: [],
  challenges: [
    "Designing an adaptive assessment engine that fairly evaluates students at different skill levels",
    "Handling concurrent video streaming for large course cohorts without CDN costs",
    "Building a flexible content editor that non-technical instructors can use effectively",
  ],
  solutions: [
    "Built adaptive difficulty algorithm using Item Response Theory with 3-parameter logistic model",
    "Used HLS video streaming with AWS MediaConvert for adaptive bitrate playback",
    "Created TipTap-based rich text editor with custom course content blocks",
  ],
  difficulty: "advanced",
  duration: "3 months",
  teamSize: "2 developers",
  completionDate: "2023-12-10",
  createdAt: "2023-09-15",
  updatedAt: "2024-01-01",
  tags: ["lms", "education", "full-stack"],
  emoji: "📚",
  status: "completed",
  lessonsLearned: [
    "Adaptive assessments need careful calibration — initial item parameters must be validated with pilot testing",
    "Video streaming infrastructure is complex: HLS transcoding, CDN caching, and DRM require specialized tooling",
    "Content editors should store data as structured JSON (not HTML) to enable multi-format rendering",
  ],
  futureImprovements: [
    "Implement spaced repetition scheduling for optimal learning retention",
    "Add collaborative learning features: discussion boards, peer review, group projects",
    "Build mobile learning app with offline course download support",
  ],
  caseStudy: {
    problem:
      "Educational institutions needed an affordable LMS with adaptive assessments, progress tracking, and certificate generation.",
    solution:
      "Built a modern LMS with adaptive difficulty engine using Item Response Theory, Redis-backed progress tracking, and automated certificate generation.",
    results: [
      { metric: "Course Completion", value: "87%", label: "Student completion rate" },
      { metric: "Scalability", value: "10K+", label: "Concurrent students supported" },
      { metric: "Grading", value: "100%", label: "Automated assessment grading" },
      { metric: "Cost Reduction", value: "60%", label: "Compared to legacy LMS" },
    ],
  },
  performance: {
    loadTime: 1.4,
    accessibility: 95,
    bestPractices: 94,
    seo: 96,
  },
  overview:
    "An enterprise learning management system designed for educational institutions seeking a modern alternative to legacy platforms.",
};
