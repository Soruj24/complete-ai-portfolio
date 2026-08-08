"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types";

interface TocItem {
  id: string;
  label: string;
}

function buildToc(p: IProject): TocItem[] {
  const items: TocItem[] = [{ id: "overview", label: "Overview" }];

  if (p.caseStudy?.problem) items.push({ id: "problem", label: "Problem" });
  if (p.caseStudy?.solution) items.push({ id: "solution", label: "Solution" });
  if (p.features?.length) items.push({ id: "features", label: "Key Features" });
  if (p.architecture) items.push({ id: "architecture", label: "Architecture" });
  if (p.technologies?.length) items.push({ id: "tech-decisions", label: "Tech Decisions" });
  if (p.challenges?.length) items.push({ id: "challenges", label: "Challenges" });
  if (p.solutions?.length) items.push({ id: "solutions", label: "Solutions" });
  if (p.screenshots?.length) items.push({ id: "screenshots", label: "Screenshots" });
  if (p.caseStudy?.results?.length || p.businessImpact) items.push({ id: "results", label: "Results" });
  if (p.futureImprovements?.length) items.push({ id: "future", label: "Future" });
  if (p.lessonsLearned?.length) items.push({ id: "lessons", label: "Lessons" });

  return items;
}

export function TableOfContents({ project }: { project: IProject }) {
  const [activeId, setActiveId] = useState("");
  const toc = buildToc(project);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-3">
        On this page
      </p>
      {toc.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "block py-1 text-[12.5px] font-medium border-l-2 pl-3 transition-all duration-200",
            activeId === id
              ? "border-accent text-text-primary"
              : "border-transparent text-text-tertiary hover:text-text-secondary"
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
