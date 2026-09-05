import type { ResumeData } from "./resume-types";

export const resumeData: ResumeData = {
  contact: {
    name: "Soruj Mahmud",
    title: "AI Engineer & Full-Stack Developer",
    email: "sorujmahmudb2h@gmail.com",
    phone: "+8801795397598",
    location: "Tangail, Dhaka, Bangladesh",
    github: "https://github.com/Soruj24",
    linkedin: "https://linkedin.com/in/soruj-mahmud",
  },
  summary:
    "Aspiring Full-Stack Developer with a strong focus on building scalable, AI-powered web applications. Proficient in Next.js, React, TypeScript, and Node.js. Experienced in integrating advanced AI solutions using LangChain and developing MCP Servers. Dedicated to creating high-impact digital experiences with clean, maintainable code.",
  skills: [
    {
      category: "Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js (App Router)", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "PostgreSQL", "Redis", "Pinecone (Vector DB)"],
    },
    {
      category: "AI & ML",
      items: ["LangChain", "OpenAI API", "MCP Server Development", "AI Agents"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Docker", "Vercel", "Postman", "JWT", "OAuth"],
    },
  ],
  experience: [
    {
      role: "Full-Stack Project Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      highlights: [
        "Built and deployed multiple end-to-end web applications demonstrating technical capabilities.",
        "Focused on full-stack development with AI integration through rigorous project work.",
        "Contributed to open-source prototypes and demo applications.",
      ],
    },
  ],
  education: [
    {
      degree: "HSC in Science",
      institution: "Self-taught Developer",
      location: "Tangail, Dhaka, Bangladesh",
      details: [
        "Comprehensive project-based learning in modern web technologies and AI applications.",
      ],
    },
  ],
  projects: [
    {
      name: "AI-Powered Chatbot Platform",
      tech: "Next.js, FastAPI, OpenAI, Pinecone",
      highlights: [
        "Developed a sophisticated AI chatbot platform with natural language processing and multi-channel support.",
        "Integrated LangChain for advanced conversation memory and context retention.",
        "Utilized Pinecone for efficient vector similarity search in large knowledge bases.",
      ],
    },
    {
      name: "E-Commerce Ecosystem",
      tech: "Next.js, Stripe, MongoDB, Tailwind",
      highlights: [
        "Built a high-performance e-commerce platform with real-time inventory management and secure payments.",
        "Implemented complex state management for a seamless shopping experience.",
        "Designed a mobile-first, responsive UI with modern design principles.",
      ],
    },
    {
      name: "Crypto Analytics Dashboard",
      tech: "Next.js, Recharts, CoinGecko API",
      highlights: [
        "Created a real-time cryptocurrency tracking dashboard with interactive data visualizations.",
        "Integrated multiple third-party APIs for live market data and news updates.",
        "Optimized performance for handling large-scale real-time data streams.",
      ],
    },
  ],
  certifications: [
    { name: "Full-Stack Web Development (Project-based)" },
    { name: "Advanced AI Application Development with LangChain" },
    { name: "Modern UI/UX Design Principles" },
  ],
  languages: [
    { name: "Bengali", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};
