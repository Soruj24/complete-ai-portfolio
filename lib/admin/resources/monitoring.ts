import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/system/backup", {
  name: "Backups",
  nameSingular: "Backup",
  description: "Manage system backups",
  icon: "Database",
  path: "/admin/system/backup",
  endpoint: "/api/admin/backups",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "type", label: "Type", type: "select", options: [{ label: "Full", value: "full" }, { label: "Partial", value: "partial" }] },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "status", label: "Status", type: "select", options: [
      { label: "Completed", value: "completed" }, { label: "Failed", value: "failed" }, { label: "In Progress", value: "in_progress" },
    ]},
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: false, del: true, archive: false, export: true },
});

registerResource("/admin/system/logs", {
  name: "System Logs",
  nameSingular: "Log",
  description: "View system log entries",
  icon: "ScrollText",
  path: "/admin/system/logs",
  endpoint: "/api/admin/logs",
  features: { create: false, update: false, del: true, archive: false, export: true },
  fields: [
    { key: "level", label: "Level", type: "select", filterable: true, options: [
      { label: "Info", value: "info" }, { label: "Warning", value: "warning" },
      { label: "Error", value: "error" }, { label: "Debug", value: "debug" },
    ]},
    { key: "message", label: "Message", type: "text", sortable: true },
    { key: "source", label: "Source", type: "text", sortable: true },
    { key: "timestamp", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/activity", {
  name: "Activity History",
  nameSingular: "Activity",
  description: "Track user activity on the platform",
  icon: "History",
  path: "/admin/system/activity",
  endpoint: "/api/admin/activity",
  features: { create: false, update: false, del: true, archive: false, export: true },
  fields: [
    { key: "user", label: "User", type: "text", sortable: true },
    { key: "action", label: "Action", type: "text", sortable: true },
    { key: "entity", label: "Entity", type: "text", sortable: true },
    { key: "timestamp", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/audit", {
  name: "Audit Logs",
  nameSingular: "Audit Entry",
  description: "Detailed audit trail for compliance",
  icon: "UserCog",
  path: "/admin/system/audit",
  endpoint: "/api/admin/audit",
  features: { create: false, update: false, del: false, archive: false, export: true },
  fields: [
    { key: "action", label: "Action", type: "text", sortable: true },
    { key: "entity", label: "Entity", type: "text", sortable: true },
    { key: "userName", label: "User", type: "text", sortable: true },
    { key: "ip", label: "IP", type: "text", sortable: true },
    { key: "timestamp", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/database", {
  name: "Database Health",
  nameSingular: "Metric",
  description: "Monitor database performance and health",
  icon: "Database",
  path: "/admin/system/database",
  endpoint: "/api/admin/database",
  features: { create: false, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Metric", type: "text" },
    { key: "value", label: "Value", type: "text" },
    { key: "status", label: "Status", type: "select", options: [{ label: "Healthy", value: "healthy" }, { label: "Warning", value: "warning" }, { label: "Critical", value: "critical" }] },
  ],
});

registerResource("/admin/system/storage", {
  name: "Storage",
  nameSingular: "Storage Entry",
  description: "Monitor storage usage",
  icon: "Server",
  path: "/admin/system/storage",
  endpoint: "/api/admin/storage",
  features: { create: false, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Name", type: "text" },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "type", label: "Type", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/restore", {
  name: "Restore",
  nameSingular: "Restore Point",
  description: "Restore system from backups",
  icon: "RefreshCw",
  path: "/admin/system/restore",
  endpoint: "/api/admin/restore",
  features: { create: true, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Backup", type: "text", sortable: true },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "status", label: "Status", type: "select", options: [{ label: "Available", value: "available" }, { label: "Restoring", value: "restoring" }] },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true },
  ],
});
