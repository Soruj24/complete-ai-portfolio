"use client";

import {
  Layout,
  Server,
  Database,
  Brain,
  Wrench,
  Layers,
  Component,
  Paintbrush,
  RefreshCw,
  Cog,
  Workflow,
  Globe,
  Radio,
  HardDrive,
  Table2,
  MemoryStick,
  Bot,
  Network,
  Plug,
  Boxes,
  Cloud,
  Container,
  GitBranch,
  Github,
  CloudCog,
  Blocks,
} from "lucide-react";
import { useRef } from "react";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";

interface TechItem {
  name: string;
  icon: React.ElementType;
  description: string;
  context?: string;
}

interface Category {
  title: string;
  icon: React.ElementType;
  description: string;
  items: TechItem[];
}

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    icon: Layout,
    description: "Building responsive, performant user interfaces",
    items: [
      {
        name: "Next.js",
        icon: Blocks,
        description: "React framework for production apps with SSR, SSG, and App Router",
        context: "Primary framework",
      },
      {
        name: "React",
        icon: Component,
        description: "Component-based UI library for building interactive interfaces",
        context: "Core expertise",
      },
      {
        name: "TypeScript",
        icon: Layers,
        description: "Static type system for scalable, maintainable codebases",
        context: "Daily driver",
      },
      {
        name: "Tailwind CSS",
        icon: Paintbrush,
        description: "Utility-first CSS framework for rapid UI development",
        context: "Styling standard",
      },
      {
        name: "Redux Toolkit",
        icon: RefreshCw,
        description: "Predictable state management for complex application logic",
        context: "When needed",
      },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Building APIs and server-side logic",
    items: [
      {
        name: "Node.js",
        icon: Cog,
        description: "JavaScript runtime for scalable network applications",
        context: "Primary runtime",
      },
      {
        name: "Express.js",
        icon: Workflow,
        description: "Minimal web framework for building REST APIs and middleware",
        context: "API development",
      },
      {
        name: "REST API",
        icon: Globe,
        description: "Architecting clean, documented RESTful interfaces",
        context: "API design",
      },
      {
        name: "WebSockets",
        icon: Radio,
        description: "Real-time bidirectional communication for live features",
        context: "Real-time apps",
      },
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Data modeling, storage, and retrieval",
    items: [
      {
        name: "MongoDB",
        icon: HardDrive,
        description: "Document database for flexible, schema-less data storage",
        context: "Primary database",
      },
      {
        name: "PostgreSQL",
        icon: Table2,
        description: "Relational database for complex queries and data integrity",
        context: "When relational needed",
      },
      {
        name: "Redis",
        icon: MemoryStick,
        description: "In-memory store for caching, sessions, and queuing",
        context: "Caching layer",
      },
    ],
  },
  {
    title: "AI Engineering",
    icon: Brain,
    description: "Building intelligent systems with LLMs and agents",
    items: [
      {
        name: "LangChain",
        icon: Bot,
        description: "Framework for building context-aware AI applications with LLMs",
        context: "Core AI tool",
      },
      {
        name: "LangGraph",
        icon: Network,
        description: "Stateful, multi-agent orchestration for complex AI workflows",
        context: "Agent systems",
      },
      {
        name: "MCP",
        icon: Plug,
        description: "Model Context Protocol for connecting AI models to external tools",
        context: "Tool integration",
      },
      {
        name: "Vector Databases",
        icon: Boxes,
        description: "Semantic search and retrieval for RAG applications",
        context: "RAG pipelines",
      },
      {
        name: "LLM APIs",
        icon: Cloud,
        description: "Integration with OpenAI, Anthropic, and other LLM providers",
        context: "API integration",
      },
    ],
  },
  {
    title: "DevOps / Tools",
    icon: Wrench,
    description: "Development workflow and infrastructure",
    items: [
      {
        name: "Docker",
        icon: Container,
        description: "Containerization for consistent development and deployment",
        context: "Containerization",
      },
      {
        name: "Git",
        icon: GitBranch,
        description: "Version control for collaborative development workflows",
        context: "Daily workflow",
      },
      {
        name: "GitHub",
        icon: Github,
        description: "Code hosting, CI/CD pipelines, and project management",
        context: "Collaboration",
      },
      {
        name: "Cloud Platforms",
        icon: CloudCog,
        description: "Deployment and infrastructure on AWS and Vercel",
        context: "Deployment",
      },
    ],
  },
];

function TechCard({ item }: { item: TechItem }) {
  const Icon = item.icon;

  return (
    <div className="group p-3.5 rounded-xl bg-surface border border-border-subtle hover:border-border hover:bg-surface-hover transition-all duration-200 cursor-default">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-accent/8 text-accent shrink-0 group-hover:bg-accent/12 transition-colors duration-200">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-[13px] font-medium text-text-primary truncate">
              {item.name}
            </h4>
            {item.context && (
              <span className="text-[10px] font-medium text-text-tertiary bg-surface-hover px-1.5 py-0.5 rounded shrink-0 hidden group-hover:inline-block transition-all duration-200">
                {item.context}
              </span>
            )}
          </div>
          <p className="text-[11.5px] text-text-tertiary leading-relaxed mt-1 line-clamp-2 group-hover:text-text-secondary transition-colors duration-200">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef, (tl) => {
    tl.from(".skills-heading", { y: 10, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(".skills-category", { y: 12, opacity: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.3");
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border-subtle"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-14 skills-heading">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Skills
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Technologies &amp; Tools
          </h2>
          <p className="text-[14px] text-text-secondary mt-2">
            Organized by engineering domain. Every tool here is used in production-level projects.
          </p>
        </div>

        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="skills-category space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface border border-border-subtle">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">
                      {category.title}
                    </h3>
                    <p className="text-[12px] text-text-tertiary">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.items.map((item) => (
                    <TechCard key={item.name} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
