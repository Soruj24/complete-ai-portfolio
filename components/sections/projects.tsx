"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { TechStack } from "@/components/ui/tech-icon";

const categories = ["All", "AI", "Full Stack", "Frontend"] as const;

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects?limit=100")
      .then((res) => res.json())
      .then((data) => setProjects(data.data ?? []))
      .catch(() => setProjects([]));
  }, []);

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

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200",
                activeCategory === cat
                  ? "text-text-primary bg-surface border border-border-subtle"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {cat}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {filtered.map((project, i) => (
              <AnimatedSection key={project._id ?? project.id} delay={i * 0.04}>
                <a href={`/projects/${project._id ?? project.id}`} className="block group">
                  <GlassCard variant="interactive" className="overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-background border-b border-border-subtle">
                      <ProjectImage src={project.image} alt={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        {project.githubUrl && (
                          <span className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90">
                            <Github className="w-3 h-3" />
                          </span>
                        )}
                        {project.liveUrl && (
                          <span className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90">
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm">{project.emoji}</span>
                        <h3 className="text-[14px] font-semibold line-clamp-1 tracking-[-0.01em]">{project.title}</h3>
                      </div>
                      <p className="text-[12px] text-text-secondary line-clamp-2 leading-relaxed mb-3">
                        {project.description}
                      </p>
                      <TechStack technologies={project.technologies} limit={4} />
                      {project.caseStudy?.results && (
                        <div className="mt-3 pt-3 border-t border-border-subtle grid grid-cols-2 gap-2">
                          {project.caseStudy.results.slice(0, 2).map((r: any) => (
                            <div key={r.metric} className="text-center">
                              <div className="text-[11px] font-semibold text-accent">{r.value}</div>
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
        <ImageOff className="w-6 h-6" />
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
          "w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}
