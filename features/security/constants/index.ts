export const PERMISSION_ACTIONS = ["read", "write", "create", "delete", "manage"] as const;
export const PERMISSION_RESOURCES = ["users", "content", "media", "analytics", "settings", "security", "roles", "audit"] as const;

export const ALERT_COLORS = {
  critical: "text-error bg-error/10 border-error/20",
  high: "text-warning bg-warning/10 border-warning/20",
  medium: "text-accent bg-accent/10 border-accent/20",
  low: "text-info bg-info/10 border-info/20",
  info: "text-text-tertiary bg-surface-hover border-border-subtle",
} as const;

export const STATUS_CONFIG = {
  active: { color: "text-success bg-success/10", label: "Active" },
  expired: { color: "text-text-tertiary bg-surface-hover", label: "Expired" },
  revoked: { color: "text-error bg-error/10", label: "Revoked" },
} as const;

export const SECURITY_TABS = [
  { value: "overview", label: "Overview" },
  { value: "authentication", label: "Authentication" },
  { value: "access-control", label: "Access Control" },
  { value: "monitoring", label: "Monitoring" },
  { value: "secrets", label: "Secrets" },
  { value: "data-protection", label: "Data Protection" },
] as const;


