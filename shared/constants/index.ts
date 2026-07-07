export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "",
  DEFAULT_PAGE_SIZE: 15,
  MAX_PAGE_SIZE: 100,
} as const;

export const PAGINATION = {
  pageSizes: [10, 15, 25, 50, 100] as const,
  defaultPageSize: 15,
} as const;

export const UI = {
  sidebarWidth: 240,
  sidebarCollapsedWidth: 68,
  topbarHeight: 56,
  animationDuration: 300,
  toastDuration: 4000,
} as const;

export const DEBOUNCE = {
  search: 300,
  save: 500,
  resize: 200,
} as const;
