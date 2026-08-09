"use client";

import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Pencil, Copy, Star, Trash2, ExternalLink } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "../types";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from "../types";
import { Search } from "lucide-react";

interface Props {
  projects: Project[];
  selected: string[];
  onSelect: (id: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: Project) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
}

function ProjectCard({
  project,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFeatured,
}: {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleFeatured: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const colors = PROJECT_STATUS_COLORS[project.status] || PROJECT_STATUS_COLORS.draft;

  return (
    <div className="group relative rounded-lg border border-border-subtle bg-surface hover:border-border transition-colors">
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} aria-label={`Select ${project.title}`} />
      </div>

      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-6 w-6 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm border border-border-subtle text-text-tertiary hover:text-text-primary transition-colors"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-border-subtle bg-background py-1 shadow-lg">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <ExternalLink className="h-3 w-3" /> View Live
              </a>
            )}
            <button
              onClick={() => { setMenuOpen(false); onEdit(); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              <Pencil className="h-3 w-3" /> Edit
            </button>
            <button
              onClick={() => { setMenuOpen(false); onDuplicate(); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              <Copy className="h-3 w-3" /> Duplicate
            </button>
            <button
              onClick={() => { setMenuOpen(false); onToggleFeatured(); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              <Star className={cn("h-3 w-3", project.featured ? "fill-amber-500 text-amber-500" : "")} />
              {project.featured ? "Unfeature" : "Feature"}
            </button>
            <div className="my-0.5 h-px bg-border-subtle" />
            <button
              onClick={() => { setMenuOpen(false); onDelete(); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </button>
          </div>
        )}
      </div>

      {project.image ? (
        <div className="h-32 rounded-t-lg overflow-hidden bg-surface">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-32 rounded-t-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
          <span className="text-2xl font-bold text-accent/30">{project.title.charAt(0)}</span>
        </div>
      )}

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-[13px] font-medium text-text-primary truncate">{project.title}</h3>
          <Star
            className={cn(
              "h-3.5 w-3.5 shrink-0 cursor-pointer transition-colors",
              project.featured ? "fill-amber-500 text-amber-500" : "text-text-tertiary hover:text-amber-500"
            )}
            onClick={onToggleFeatured}
          />
        </div>

        <p className="text-[11px] text-text-tertiary line-clamp-2 mb-2.5">{project.description}</p>

        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium", colors.bg, colors.text)}>
            <span className={cn("h-1 w-1 rounded-full", colors.dot)} />
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
          {project.category && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface text-text-secondary">
              {project.category}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-2.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="inline-flex items-center rounded bg-background px-1.5 py-0.5 text-[10px] text-text-secondary border border-border-subtle">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="inline-flex items-center rounded bg-background px-1.5 py-0.5 text-[10px] text-text-tertiary border border-border-subtle">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <p className="text-[10px] text-text-tertiary">
          {project.updatedAt
            ? `Updated ${formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}`
            : ""}
        </p>
      </div>
    </div>
  );
}

export function ProjectsGrid({ projects, selected, onSelect, onEdit, onDelete, onDuplicate, onToggleFeatured }: Props) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border-subtle mb-3">
          <Search className="h-6 w-6 text-text-tertiary" />
        </div>
        <p className="text-[13px] font-medium text-text-primary">No projects found</p>
        <p className="text-[12px] text-text-tertiary mt-0.5">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isSelected={selected.includes(project.id)}
          onSelect={() => onSelect(project.id)}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
          onDuplicate={() => onDuplicate(project)}
          onToggleFeatured={() => onToggleFeatured(project.id, !project.featured)}
        />
      ))}
    </div>
  );
}
