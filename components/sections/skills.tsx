"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";

const categoryIcons: Record<string, string> = {
  "AI & LangChain Specialist": "🤖",
  "Frontend Development": "🎨",
  "Backend & Database": "⚙️",
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [skillCategories, setSkillCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        const skills = data.data ?? [];
        const grouped: Record<string, any[]> = {};
        for (const s of skills) {
          const cat = s.category || "Other";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(s);
        }
        setSkillCategories(
          Object.entries(grouped).map(([title, skills]) => ({ title, skills })),
        );
      })
      .catch(() => setSkillCategories([]));
  }, []);

  return (
    <Section id="skills" variant="alt">
      <div className="container">
        <SectionHeader
          label="Skills"
          title="Technologies & Expertise"
          description="Core technologies I use to build production-grade applications."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === i
                  ? "text-accent-foreground"
                  : "text-text-secondary hover:text-text-primary border border-border bg-surface",
              )}
              style={
                activeCategory === i
                  ? { background: "var(--accent)" }
                  : undefined
              }
            >
              {categoryIcons[cat?.title] ?? "💻"} {cat.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {skillCategories[activeCategory]?.skills.map(
              (skill: any, i: number) => (
                <AnimatedSection key={skill?.name} delay={i * 0.04}>
                  <GlassCard variant="interactive" className="p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-lg shrink-0"
                        role="img"
                        aria-label={skill?.name}
                      >
                        {skill?.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold truncate">
                          {skill?.name}
                        </h3>
                        {skill?.description && (
                          <p className="text-xs text-text-tertiary leading-relaxed mt-0.5 line-clamp-1">
                            {skill?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ),
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
