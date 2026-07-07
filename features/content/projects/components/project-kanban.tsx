"use client";

import { DragEvent, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { KanbanColumn, Project, ProjectStatus } from "../types";
import { PROJECT_STATUS_LABELS } from "../types";

interface Props {
  columns: KanbanColumn[];
  onStatusChange: (id: string, status: ProjectStatus) => void;
}

function KanbanCard({ project, onDragStart }: { project: Project; onDragStart: (e: DragEvent) => void }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="cursor-grab rounded-lg border border-border-primary bg-surface-primary p-3 transition-shadow hover:shadow-md active:cursor-grabbing"
    >
      <p className="text-sm font-medium text-text-primary">{project.title}</p>
      <p className="mt-1 line-clamp-2 text-xs text-text-tertiary">{project.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {project.techStack.slice(0, 3).map((t) => (
          <span key={t} className="rounded bg-surface-hover px-1.5 py-0.5 text-[10px] text-text-secondary">{t}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-text-tertiary">
        <span>{project.views?.toLocaleString() ?? 0} views</span>
        <span>{project.rating?.toFixed(1) ?? "0.0"} rating</span>
      </div>
    </div>
  );
}

export function ProjectKanban({ columns, onStatusChange }: Props) {
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleDrop = (e: DragEvent, status: ProjectStatus) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("projectId");
    if (id) onStatusChange(id, status);
  };

  const handleDragStart = (e: DragEvent, id: string) => {
    e.dataTransfer.setData("projectId", id);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={(e) => { e.preventDefault(); setDragOver(col.id); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => handleDrop(e, col.id)}
          className={`min-w-[280px] flex-1 rounded-xl border p-3 transition-colors ${
            dragOver === col.id ? "border-accent bg-accent/5" : "border-border-primary bg-surface-secondary"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              {PROJECT_STATUS_LABELS[col.id]}
              <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-tertiary">{col.items.length}</span>
            </h3>
            <button className="rounded-lg p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary">
              <Plus size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {col.items.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <KanbanCard
                  project={project}
                  onDragStart={(e) => handleDragStart(e, project.id)}
                />
              </motion.div>
            ))}
            {col.items.length === 0 && (
              <div className="py-8 text-center text-xs text-text-tertiary">
                Drop projects here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
