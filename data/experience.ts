export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  technologies: string[];
  icon: string;
  type: "work" | "education" | "project";
}

export const experiences: Experience[] = [
  {
    period: "2023 — Present",
    role: "AI & LangChain Specialist",
    company: "Independent Engineering",
    description:
      "Architecting production-grade AI systems using LangChain, MCP servers, and vector databases. Building intelligent chatbots, RAG pipelines, and multi-agent systems.",
    highlights: [
      "Built AI-powered chatbot platform with multi-channel support and real-time analytics",
      "Developed custom MCP servers for AI tool orchestration and external API integration",
      "Implemented RAG pipelines using vector databases (Pinecone, Chroma) for knowledge retrieval",
      "Created LangGraph-based multi-agent workflows for complex task automation",
    ],
    technologies: ["LangChain", "MCP", "OpenAI", "Vector Databases", "Python", "TypeScript"],
    icon: "🤖",
    type: "work",
  },
  {
    period: "2022 — 2023",
    role: "Full-Stack Developer",
    company: "Independent Engineering",
    description:
      "Built full-stack applications from conception to deployment. Delivered production systems with modern architectures, CI/CD pipelines, and cloud infrastructure.",
    highlights: [
      "Developed a comprehensive LMS platform with real-time collaboration features",
      "Built a real-time chat application with Socket.io, Redis, and MongoDB",
      "Created a fitness tracking app with data visualization and analytics dashboards",
      "Implemented CI/CD pipelines using Docker and GitHub Actions for automated deployments",
    ],
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "Docker"],
    icon: "💻",
    type: "work",
  },
  {
    period: "2021 — 2022",
    role: "Frontend Developer",
    company: "Independent Engineering",
    description:
      "Mastered modern frontend development with a focus on UI/UX, responsive design, and interactive experiences. Built 10+ production-quality interfaces.",
    highlights: [
      "Built responsive, accessible web applications using React and TypeScript",
      "Implemented complex animations with Framer Motion and GSAP",
      "Developed a crypto dashboard with real-time data visualization using Recharts",
      "Created design systems and reusable component libraries",
    ],
    technologies: ["React", "JavaScript", "TypeScript", "CSS", "Tailwind", "Framer Motion"],
    icon: "🎨",
    type: "work",
  },
];
