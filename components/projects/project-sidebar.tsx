import {
  Github,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  BarChart3,
  Tag,
} from "lucide-react";
import { DetailBlock } from "./section-card";
import type { IProject } from "@/types";
import Link from "next/link";
import { TechBadge } from "@/components/ui/tech-icon";

interface Props {
  project: IProject;
}

export function ProjectSidebar({ project: p }: Props) {
  return (
    <div className="space-y-4">
      {/* Links */}
      <div className="flex flex-col gap-2">
        {p.liveUrl && (
          <Link
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </Link>
        )}
        {p.githubUrl && (
          <Link
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            Source Code
          </Link>
        )}
      </div>

      {/* Project Details */}
      <div className="p-5 rounded-2xl bg-surface border border-border-subtle space-y-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
          Details
        </h3>
        <div className="space-y-3">
          <DetailBlock icon={Calendar} label="Completed" value={p.completionDate} />
          <DetailBlock icon={Clock} label="Duration" value={p.duration} />
          <DetailBlock icon={Users} label="Team" value={p.teamSize} />
          <DetailBlock
            icon={BarChart3}
            label="Complexity"
            value={p.stats?.complexity ?? p.difficulty}
          />
        </div>
      </div>

      {/* Tech Stack */}
      {p.technologies?.length > 0 && (
        <div className="p-5 rounded-2xl bg-surface border border-border-subtle">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {p.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {p.tags?.length > 0 && (
        <div className="p-5 rounded-2xl bg-surface border border-border-subtle">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md bg-background text-text-tertiary border border-border-subtle"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Performance */}
      {p.performance && (
        <div className="p-5 rounded-2xl bg-surface border border-border-subtle">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-3">
            Performance
          </h3>
          <div className="space-y-2">
            {[
              { label: "Load Time", value: p.performance.loadTime, unit: "s" },
              { label: "Accessibility", value: p.performance.accessibility, unit: "/100" },
              { label: "Best Practices", value: p.performance.bestPractices, unit: "/100" },
              { label: "SEO", value: p.performance.seo, unit: "/100" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[12px] text-text-secondary">{item.label}</span>
                <span className="text-[12px] font-medium text-text-primary">
                  {item.value}{item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
