"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, MoreHorizontal, Star, Eye, Clock4, Pencil, Trash2 } from "lucide-react";
import type { Project } from "../types";
import { STATUS_COLORS, PRIORITY_COLORS } from "../constants";
import { PROJECT_STATUS_LABELS, PROJECT_PRIORITY_LABELS } from "../types";

interface Props {
  project: Project;
  index: number;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, index, onEdit, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="group relative rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-text-tertiary">{project.description}</p>
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 rounded-lg p-1.5 text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover group-hover:opacity-100">
            <MoreHorizontal size={16} />
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
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[project.status]}`}>
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[project.priority]}`}>
          {PROJECT_PRIORITY_LABELS[project.priority]}
        </span>
        {project.featured && (
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            Featured
          </span>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-tertiary">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-text-tertiary">
        <span className="flex items-center gap-1">
          <Eye size={14} /> {project.views?.toLocaleString() ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} /> {project.rating?.toFixed(1) ?? "0.0"}
        </span>
        <span className="flex items-center gap-1">
          <Clock4 size={14} /> {project.hoursSpent ?? 0}h
        </span>
      </div>

      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-3 flex gap-2 border-t border-border-primary pt-3">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-accent transition-colors hover:text-accent-hover">
              <ExternalLink size={12} /> Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-text-secondary transition-colors hover:text-text-primary">
              <Github size={12} /> Repo
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
