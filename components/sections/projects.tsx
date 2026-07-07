"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { TechStack } from "@/components/ui/tech-icon";

const categories = ["All", "AI", "Full Stack", "Frontend"] as const;

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <Section id="projects">
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Selected Work"
          description="Production-grade applications demonstrating AI engineering, full-stack development, and system architecture."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "text-accent-foreground"
                  : "text-text-secondary hover:text-text-primary border border-border bg-surface"
              )}
              style={activeCategory === cat ? { background: "var(--accent)" } : undefined}
            >
              {cat}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {filtered.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.04}>
                <a href={`/projects/${project.id}`} className="block group">
                  <GlassCard variant="interactive" className="overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      <ProjectImage src={project.image} alt={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                        {project.githubUrl && (
                          <span className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white">
                            <Github className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {project.liveUrl && (
                          <span className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">{project.emoji}</span>
                        <h3 className="text-[15px] font-semibold line-clamp-1">{project.title}</h3>
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
                        {project.description}
                      </p>
                      <TechStack technologies={project.technologies} limit={4} />
                      {project.caseStudy?.results && (
                        <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
                          {project.caseStudy.results.slice(0, 2).map((r) => (
                            <div key={r.metric} className="text-center">
                              <div className="text-xs font-semibold text-accent">{r.value}</div>
                              <div className="text-[10px] text-text-tertiary">{r.metric}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </a>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface text-text-tertiary">
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <Loader2 className="w-4 h-4 animate-spin text-text-tertiary" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}
