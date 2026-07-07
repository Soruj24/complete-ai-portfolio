import { Github, ExternalLink, CheckCircle2 } from "lucide-react";
import { DetailBlock } from "./section-card";
import type { IProject } from "@/types";
import Link from "next/link";

interface Props {
  project: IProject;
}

export function ProjectSidebar({ project: p }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {p.liveUrl && (
          <Link href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all">
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Link>
        )}
        {p.githubUrl && (
          <Link href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-medium hover:bg-surface hover:text-text-primary transition-all">
            <Github className="w-4 h-4" />
            View Source
          </Link>
        )}
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-border space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">Project Specs</h3>
        <DetailBlock label="Completed" value={p.completionDate} />
        <DetailBlock label="Duration" value={p.duration} />
        <DetailBlock label="Team" value={p.teamSize} />
        <DetailBlock label="Complexity" value={p.stats?.complexity ?? p.difficulty} />
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-border">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {p.technologies.map((tech, i) => (
            <span key={i} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/10 text-accent border border-accent/15">{tech}</span>
          ))}
        </div>
      </div>

      {p.features && p.features.length > 0 && (
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-4">Features</h3>
          <ul className="space-y-2">
            {p.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
