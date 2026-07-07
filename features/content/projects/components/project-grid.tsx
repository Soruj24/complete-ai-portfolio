"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { List, Layout, ExternalLink, Github, Star, Eye, Clock4, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Project } from "../types";
import { VIEW_OPTIONS } from "../constants";
import { STATUS_COLORS, PRIORITY_COLORS } from "../constants";
import { PROJECT_STATUS_LABELS, PROJECT_PRIORITY_LABELS } from "../types";
import { ProjectCard } from "./project-card";

export type ViewMode = "grid" | "list" | "kanban";

interface Props {
  projects: Project[];
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  loading: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

function ListRow({ project, onEdit, onDelete }: { project: Project; onEdit?: Props["onEdit"]; onDelete?: Props["onDelete"] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 rounded-lg border border-border-primary bg-surface-primary p-4 transition-colors hover:border-accent/30"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div>
          <h3 className="font-medium text-text-primary">{project.title}</h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-text-tertiary">{project.description}</p>
        </div>
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <div className="flex flex-wrap gap-1">
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[project.status]}`}>
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[project.priority]}`}>
            {PROJECT_PRIORITY_LABELS[project.priority]}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1"><Eye size={14} />{project.views?.toLocaleString() ?? 0}</span>
          <span className="flex items-center gap-1"><Star size={14} />{project.rating?.toFixed(1) ?? "0.0"}</span>
          <span className="flex items-center gap-1"><Clock4 size={14} />{project.hoursSpent ?? 0}h</span>
        </div>
      </div>
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary">
          <MoreHorizontal size={14} />
        </button>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-border-primary bg-surface-primary py-1 shadow-lg"
          >
            <button onClick={() => { setMenuOpen(false); onEdit?.(project); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary">
              <Pencil size={14} /> Edit
            </button>
            <button onClick={() => { setMenuOpen(false); onDelete?.(project.id); }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-error transition-colors hover:bg-error/10">
              <Trash2 size={14} /> Delete
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectGrid({ projects, view, onViewChange, loading, onEdit, onDelete }: Props) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-surface-hover" />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <Layout size={48} className="mb-4 opacity-40" />
        <p className="text-lg font-medium">No projects found</p>
        <p className="mt-1 text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-text-tertiary">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        <div className="flex rounded-lg border border-border-primary bg-surface-primary p-0.5">
          {VIEW_OPTIONS.slice(0, 2).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onViewChange(opt.value as ViewMode)}
              className={`rounded-md p-1.5 transition-colors ${
                view === opt.value ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              <opt.icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.id ?? i} project={p} index={i} onEdit={onEdit} onDelete={onDelete} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {projects.map((p, i) => <ListRow key={p.id ?? i} project={p} onEdit={onEdit} onDelete={onDelete} />)}
        </div>
      )}
    </div>
  );
}
