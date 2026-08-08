"use client";

import { Code2, Brain, Server, Shield, Loader2, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { useSiteSettings } from "@/lib/hooks";

const fallbackHighlights = [
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

const valueCategories = [
  { icon: Sparkles, label: "Clean & Maintainable Code" },
  { icon: Sparkles, label: "Performance Optimization" },
  { icon: Sparkles, label: "User-Centric Design" },
  { icon: Sparkles, label: "Scalable Architecture" },
  { icon: Sparkles, label: "Modern Tech Stack" },
  { icon: Sparkles, label: "Agile Methodology" },
];

export function About() {
  const { settings, loading } = useSiteSettings();

  const specializations = settings?.specializations || [];
  const highlights = specializations.length >= 3
    ? specializations.map((spec, i) => ({
        icon: [Brain, Server, Shield][i] || Code2,
        title: spec,
        description: settings?.bio || "Specializing in modern technology solutions.",
        tags: spec.split(" ").filter(Boolean),
      }))
    : fallbackHighlights;

  const coreValues = valueCategories;

  if (loading) {
    return (
      <Section id="about">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" />
        </div>
      </Section>
    );
  }

  return (
    <Section id="about">
      <div className="container">
        <SectionHeader
          label="About"
          title="Building Intelligent Systems That Scale"
          description={`I'm ${settings?.fullName || "Soruj Mahmud"}, an ${settings?.professionalTitle || "AI Engineer"} based in ${settings?.location || "Bangladesh"}. I specialize in production AI systems using LangChain, MCP servers, and modern web infrastructure.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <GlassCard variant="interactive" className="p-5 md:p-6 h-full">
                  <div className="p-2 rounded-lg bg-accent/8 text-accent w-fit mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-1.5 leading-snug tracking-[-0.01em]">{item.title}</h3>
                  <p className="text-[13px] text-text-secondary leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle"
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
