"use client";

import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  MoreHorizontal,
  ExternalLink,
  Pencil,
  Copy,
  Star,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { FilteredEmptyState } from "@/components/admin/shared-states";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "../types";
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from "../types";

interface Props {
  projects: Project[];
  loading: boolean;
  selected: string[];
  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: Project) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onToggleStatus: (id: string, status: ProjectStatus) => void;
  sortKey: string;
  sortDir: "asc" | "desc";
  onSort: (key: string) => void;
}

function SortableHeader({
  label,
  field,
  sortKey,
  sortDir,
  onSort,
  className,
}: {
  label: string;
  field: string;
  sortKey: string;
  sortDir: "asc" | "desc";
  onSort: (key: string) => void;
  className?: string;
}) {
  const isActive = sortKey === field;
  return (
    <TableHead
      className={cn(
        "text-[11px] font-medium text-text-tertiary uppercase tracking-wider h-9 cursor-pointer select-none hover:text-text-primary",
        className
      )}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive ? (
          sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </div>
    </TableHead>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const colors = PROJECT_STATUS_COLORS[status] || PROJECT_STATUS_COLORS.draft;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium", colors.bg, colors.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}

function ActionDropdown({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFeatured,
  onToggleStatus,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (p: Project) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onToggleStatus: (id: string, status: ProjectStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => setOpen(!open)}
      >
        <MoreHorizontal className="h-3.5 w-3.5 text-text-tertiary" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-border-subtle bg-background py-1 shadow-lg">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              <ExternalLink className="h-3.5 w-3.5" /> View Live
            </a>
          )}
          <button
            onClick={() => { setOpen(false); onEdit(project); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={() => { setOpen(false); onDuplicate(project); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
          >
            <Copy className="h-3.5 w-3.5" /> Duplicate
          </button>
          <button
            onClick={() => { setOpen(false); onToggleFeatured(project.id, !project.featured); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
          >
            <Star className={cn("h-3.5 w-3.5", project.featured ? "fill-amber-500 text-amber-500" : "")} />
            {project.featured ? "Unfeature" : "Feature"}
          </button>
          <button
            onClick={() => {
              setOpen(false);
              const nextStatus: ProjectStatus = project.status === "published" ? "draft" : "published";
              onToggleStatus(project.id, nextStatus);
            }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
          >
            {project.status === "published" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {project.status === "published" ? "Unpublish" : "Publish"}
          </button>
          <DropdownMenuSeparator className="my-0.5" />
          <button
            onClick={() => { setOpen(false); onDelete(project.id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[13px] text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function ProjectsTable({
  projects,
  loading,
  selected,
  onSelectAll,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFeatured,
  onToggleStatus,
  sortKey,
  sortDir,
  onSort,
}: Props) {
  const allSelected = projects.length > 0 && selected.length === projects.length;

  if (loading) {
    return (
      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
              <TableHead className="w-9 px-3"><Skeleton className="h-3.5 w-3.5" /></TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Project</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Category</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Technologies</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Status</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Featured</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-b border-border-subtle">
                <TableCell className="px-3"><Skeleton className="h-3.5 w-3.5" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-48" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-5" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-7" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <FilteredEmptyState />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-subtle overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
              <TableHead className="w-9 px-3">
                <Checkbox checked={allSelected} onCheckedChange={onSelectAll} aria-label="Select all" />
              </TableHead>
              <SortableHeader label="Project" field="title" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <SortableHeader label="Category" field="category" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider h-9">Technologies</TableHead>
              <SortableHeader label="Status" field="status" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <SortableHeader label="Featured" field="featured" sortKey={sortKey} sortDir={sortDir} onSort={onSort} className="w-20" />
              <SortableHeader label="Updated" field="updatedAt" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="group border-b border-border-subtle last:border-0 hover:bg-surface/50"
              >
                <TableCell className="px-3">
                  <Checkbox
                    checked={selected.includes(project.id)}
                    onCheckedChange={() => onSelect(project.id)}
                    aria-label={`Select ${project.title}`}
                  />
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="h-8 w-8 rounded-md object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-md bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-accent">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-text-primary truncate">{project.title}</p>
                      <p className="text-[11px] text-text-tertiary truncate max-w-[300px]">{project.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  {project.category ? (
                    <Badge variant="secondary" className="text-[11px]">{project.category}</Badge>
                  ) : (
                    <span className="text-[11px] text-text-tertiary">—</span>
                  )}
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="inline-flex items-center rounded bg-surface px-1.5 py-0.5 text-[10px] text-text-secondary">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="inline-flex items-center rounded bg-surface px-1.5 py-0.5 text-[10px] text-text-tertiary">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell className="py-2.5 w-20">
                  <Star
                    className={cn(
                      "h-4 w-4 cursor-pointer transition-colors",
                      project.featured
                        ? "fill-amber-500 text-amber-500"
                        : "text-text-tertiary hover:text-amber-500"
                    )}
                    onClick={() => onToggleFeatured(project.id, !project.featured)}
                  />
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-[12px] text-text-tertiary">
                    {project.updatedAt
                      ? formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })
                      : "—"}
                  </span>
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionDropdown
                    project={project}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
                    onToggleFeatured={onToggleFeatured}
                    onToggleStatus={onToggleStatus}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        <div className="p-2 border-b border-border-subtle bg-surface/50">
          <label className="flex items-center gap-2 px-2 py-1 text-[12px] text-text-secondary">
            <Checkbox checked={allSelected} onCheckedChange={onSelectAll} aria-label="Select all" />
            Select all ({projects.length})
          </label>
        </div>
        <div className="divide-y divide-border-subtle">
          {projects.map((project) => (
            <div key={project.id} className="p-3 space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox checked={selected.includes(project.id)} onCheckedChange={() => onSelect(project.id)} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-text-primary truncate">{project.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {project.category && <span className="text-[11px] text-text-secondary">{project.category}</span>}
                    <StatusBadge status={project.status} />
                  </div>
                </div>
                <ActionDropdown project={project} onEdit={onEdit} onDelete={onDelete} onDuplicate={onDuplicate} onToggleFeatured={onToggleFeatured} onToggleStatus={onToggleStatus} />
              </div>
              <div className="flex items-center gap-2 ml-7">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <span key={tech} className="inline-flex items-center rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-text-secondary">{tech}</span>
                ))}
                {project.technologies && project.technologies.length > 3 && (
                  <span className="text-[10px] text-text-tertiary">+{project.technologies.length - 3}</span>
                )}
                <Star className={cn("h-3.5 w-3.5 cursor-pointer ml-auto", project.featured ? "fill-amber-500 text-amber-500" : "text-text-tertiary")} onClick={() => onToggleFeatured(project.id, !project.featured)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
