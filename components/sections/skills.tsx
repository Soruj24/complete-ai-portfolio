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
    <Section id="skills">
      <div className="container">
        <SectionHeader
          label="Skills"
          title="Technologies & Expertise"
          description="Core technologies I use to build production-grade applications."
        />

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200",
                activeCategory === i
                  ? "text-text-primary bg-surface border border-border-subtle"
                  : "text-text-tertiary hover:text-text-secondary",
              )}
            >
              {categoryIcons[cat?.title] ?? "💻"} {cat.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
          >
            {skillCategories[activeCategory]?.skills.map(
              (skill: any, i: number) => (
                <AnimatedSection key={skill?.name} delay={i * 0.03}>
                  <GlassCard variant="interactive" className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="text-base shrink-0"
                        role="img"
                        aria-label={skill?.name}
                      >
                        {skill?.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-medium truncate">
                          {skill?.name}
                        </h3>
                        {skill?.description && (
                          <p className="text-[11px] text-text-tertiary leading-relaxed mt-0.5 line-clamp-1">
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
