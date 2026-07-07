export type EntityStatus = "active" | "inactive" | "archived" | "draft" | "published";

export type SeverityLevel = "info" | "warning" | "error" | "critical";

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TabConfig {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}
