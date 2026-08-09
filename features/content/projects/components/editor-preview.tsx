"use client";

import { ExternalLink, Github, Star, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectFormData } from "../types";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from "../types";

interface Props {
  form: ProjectFormData;
}

export function EditorPreview({ form }: Props) {
  const colors = PROJECT_STATUS_COLORS[form.status] || PROJECT_STATUS_COLORS.draft;

  return (
    <div className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
      {/* Header */}
      {form.image ? (
        <div className="h-48 overflow-hidden">
          <img src={form.image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
          <span className="text-4xl font-bold text-accent/20">{form.title?.charAt(0) || "P"}</span>
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Title & Badges */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-text-primary">
              {form.title || "Project Title"}
            </h2>
            {form.featured && (
              <Star className="h-4 w-4 fill-amber-500 text-amber-500 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium", colors.bg, colors.text)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
              {PROJECT_STATUS_LABELS[form.status]}
            </span>
            {form.category && (
              <Badge variant="secondary" className="text-[11px]">{form.category}</Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-text-secondary leading-relaxed">
          {form.description || "No description provided."}
        </p>

        {/* Long Description */}
        {form.fullDescription && (
          <div className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-wrap">
            {form.fullDescription}
          </div>
        )}

        {/* Technologies */}
        {form.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {form.techStack.map((tech) => (
              <span key={tech} className="inline-flex items-center rounded bg-background px-2 py-0.5 text-[11px] text-text-secondary border border-border-subtle">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Features */}
        {form.features.length > 0 && form.features.some((f) => f.trim()) && (
          <div>
            <h3 className="text-[12px] font-semibold text-text-primary mb-1.5">Features</h3>
            <ul className="space-y-1">
              {form.features.filter((f) => f.trim()).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Problem & Solution */}
        {(form.caseStudyProblem || form.caseStudySolution) && (
          <div className="space-y-3">
            {form.caseStudyProblem && (
              <div>
                <h3 className="text-[12px] font-semibold text-text-primary mb-1">Problem</h3>
                <p className="text-[13px] text-text-secondary">{form.caseStudyProblem}</p>
              </div>
            )}
            {form.caseStudySolution && (
              <div>
                <h3 className="text-[12px] font-semibold text-text-primary mb-1">Solution</h3>
                <p className="text-[13px] text-text-secondary">{form.caseStudySolution}</p>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {form.caseStudyResults.length > 0 && form.caseStudyResults.some((r) => r.metric || r.value) && (
          <div>
            <h3 className="text-[12px] font-semibold text-text-primary mb-1.5">Results</h3>
            <div className="grid grid-cols-3 gap-2">
              {form.caseStudyResults.filter((r) => r.metric || r.value).map((result, i) => (
                <div key={i} className="rounded-lg bg-background border border-border-subtle p-2.5 text-center">
                  <p className="text-[14px] font-bold text-accent">{result.value}</p>
                  <p className="text-[11px] text-text-tertiary">{result.metric}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
          {form.liveUrl && (
            <a href={form.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-accent hover:text-accent/80 transition-colors">
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          )}
          {form.githubUrl && (
            <a href={form.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-text-secondary hover:text-text-primary transition-colors">
              <Github className="h-3.5 w-3.5" /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
