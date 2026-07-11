import { LayoutDashboard, ListChecks, Kanban } from "lucide-react";
import type { ProjectStatus, ProjectPriority } from "../types";

export const VIEW_OPTIONS = [
  { value: "grid", label: "Grid", icon: LayoutDashboard },
  { value: "list", label: "List", icon: ListChecks },
  { value: "kanban", label: "Kanban", icon: Kanban },
] as const;

export const STATUS_OPTIONS: { value: ProjectStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "text-text-primary" },
  { value: "published", label: "Published", color: "text-success" },
  { value: "in-progress", label: "In Progress", color: "text-accent" },
  { value: "review", label: "In Review", color: "text-warning" },
  { value: "draft", label: "Draft", color: "text-text-tertiary" },
  { value: "archived", label: "Archived", color: "text-error" },
];

export const PRIORITY_OPTIONS: { value: ProjectPriority | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const PRIORITY_COLORS: Record<ProjectPriority, string> = {
  low: "text-text-tertiary bg-surface-hover",
  medium: "text-accent bg-accent/10",
  high: "text-warning bg-warning/10",
  critical: "text-error bg-error/10",
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  draft: "text-text-tertiary bg-surface-hover",
  "in-progress": "text-accent bg-accent/10",
  review: "text-warning bg-warning/10",
  published: "text-success bg-success/10",
  archived: "text-error bg-error/10",
};

export const CATEGORIES: string[] = [];
export const TAGS: string[] = [];
export const TECH_STACKS: string[] = [];

