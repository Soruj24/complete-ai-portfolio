"use client";

import {
  Layers,
  Blocks,
  Cloud,
  ShoppingCart,
  Brain,
  Plug,
  Radio,
  LayoutDashboard,
  Database,
  Paintbrush,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  technologies: string[];
  cta: string;
}

const SERVICES: Service[] = [
  {
    icon: Layers,
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications with modern frameworks, clean architecture, and production-ready deployment. From database design to responsive UI.",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
    cta: "Let's build",
  },
  {
    icon: Blocks,
    title: "Next.js Development",
    description:
      "Server-rendered, statically generated, and edge-compatible applications using the App Router, Server Components, and streaming.",
    technologies: ["Next.js 15", "App Router", "Server Components", "Vercel"],
    cta: "Start a project",
  },
  {
    icon: Cloud,
    title: "SaaS Development",
    description:
      "Multi-tenant applications with authentication, billing, role-based access, and scalable infrastructure. Built for growth from day one.",
    technologies: ["NextAuth", "Stripe", "RBAC", "PostgreSQL", "Redis"],
    cta: "Discuss your SaaS",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description:
      "Custom e-commerce platforms with product management, cart/checkout, payment processing, and order tracking. Not template-based.",
    technologies: ["Stripe", "Next.js", "MongoDB", "Tailwind", "Webhooks"],
    cta: "Build your store",
  },
  {
    icon: Brain,
    title: "AI Application Development",
    description:
      "LLM-powered applications with RAG pipelines, conversational interfaces, tool calling, and streaming responses. Using existing foundation models.",
    technologies: ["LangChain", "OpenAI", "Pinecone", "MCP", "LangGraph"],
    cta: "Explore AI options",
  },
  {
    icon: Plug,
    title: "REST API Development",
    description:
      "Clean, documented, and tested REST APIs with proper authentication, rate limiting, error handling, and versioning.",
    technologies: ["Node.js", "Express", "JWT", "Swagger", "Zod"],
    cta: "Design your API",
  },
  {
    icon: Radio,
    title: "Real-time Application Development",
    description:
      "WebSocket-based features — live notifications, collaborative editing, chat systems, and real-time dashboards with minimal latency.",
    technologies: ["WebSockets", "Socket.io", "Redis", "Server-Sent Events"],
    cta: "Add real-time",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Admin Panel Development",
    description:
      "Data-driven admin interfaces with charts, tables, filters, role-based access, and real-time data synchronization.",
    technologies: ["Next.js", "Recharts", "shadcn/ui", "Tailwind", "Zod"],
    cta: "Build your dashboard",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description:
      "Schema design, indexing strategies, query optimization, and migration planning for MongoDB, PostgreSQL, and Redis.",
    technologies: ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Mongoose"],
    cta: "Plan your data layer",
  },
  {
    icon: Paintbrush,
    title: "UI/UX Implementation",
    description:
      "Pixel-perfect, accessible, and responsive interfaces built from designs or wireframes. Component systems, design tokens, and motion design.",
    technologies: ["Tailwind CSS", "Framer Motion", "shadcn/ui", "Radix"],
    cta: "Implement your design",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <AnimatedSection delay={index * 0.04}>
      <div className="group h-full p-5 md:p-6 rounded-2xl bg-surface border border-border-subtle hover:border-border transition-all duration-200">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-accent/8 text-accent group-hover:bg-accent/12 transition-colors duration-200">
            <Icon className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em]">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[12.5px] text-text-secondary leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-background text-text-tertiary border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-tertiary group-hover:text-accent transition-colors duration-200">
            {service.cta}
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function Services() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="services">
      <div className="container">
        <SectionHeader
          label="Services"
          title="What I Can Build"
          description="Technical services focused on delivering production-grade applications. Every service uses modern tools and follows engineering best practices."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-10 text-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              Start a Conversation
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}
