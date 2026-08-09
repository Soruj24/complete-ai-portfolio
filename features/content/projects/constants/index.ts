import type { ProjectStatus, SortOption } from "../types";

export const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: "All Status", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "In Progress", value: "in-progress" },
  { label: "Review", value: "review" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name A→Z", value: "name-asc" },
  { label: "Name Z→A", value: "name-desc" },
  { label: "Most Views", value: "views" },
  { label: "Recently Updated", value: "updated" },
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const DEFAULT_PAGE_SIZE = 10;
