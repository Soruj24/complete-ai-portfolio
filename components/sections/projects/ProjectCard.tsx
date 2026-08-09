"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, ImageOff, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TechStack } from "@/components/ui/tech-icon";
import type { Project } from "./types";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface text-text-tertiary">
        <ImageOff className="w-6 h-6" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setError(true)}
      unoptimized={src.startsWith("data:")}
    />
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const projectId = project._id || project.id;

  return (
    <AnimatedSection>
      <div className="block group h-full">
        <div className="h-full rounded-2xl bg-surface border border-border-subtle overflow-hidden hover:border-border transition-all duration-300 flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-background">
            <ProjectImage src={project.image} alt={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label={`View source code for ${project.title}`}
                >
                  <Github className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label={`View live demo for ${project.title}`}
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                {project.emoji && <span className="text-sm">{project.emoji}</span>}
                <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] line-clamp-1">
                  <a
                    href={`/projects/${projectId}`}
                    className="hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    {project.title}
                  </a>
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" aria-hidden="true" />
            </div>

            <p className="text-[12px] text-text-secondary line-clamp-2 leading-relaxed mb-3 flex-1">
              {project.description}
            </p>

            <TechStack technologies={project.technologies} limit={3} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
