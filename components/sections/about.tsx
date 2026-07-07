"use client";

import { Code2, Brain, Server, Shield } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";

const highlights = [
  {
    icon: Brain,
    title: "AI & LangChain Engineering",
    description: "Architect intelligent systems using LangChain, MCP servers, vector databases, and multi-agent workflows.",
    tags: ["LangChain", "MCP", "RAG", "Vector DBs", "OpenAI"],
  },
  {
    icon: Server,
    title: "Full-Stack Development",
    description: "Build production-grade applications with Next.js, TypeScript, MongoDB, and real-time infrastructure.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Redis"],
  },
  {
    icon: Shield,
    title: "System Architecture",
    description: "Design clean, maintainable systems using microservices patterns and event-driven architectures.",
    tags: ["Microservices", "Docker", "CI/CD", "AWS", "System Design"],
  },
];

export function About() {
  return (
    <Section id="about">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--accent-subtle),transparent_50%)] pointer-events-none" />

      <div className="container relative">
        <SectionHeader
          label="About"
          title="Building Intelligent Systems That Scale"
          description={`I'm ${SITE.name}, an AI Engineer and Full-Stack Developer based in ${SITE.location}. I specialize in production AI systems using LangChain, MCP servers, and modern web infrastructure.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <GlassCard variant="interactive" className="p-6 md:p-7 h-full">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[17px] font-semibold mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/10 text-accent border border-accent/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
