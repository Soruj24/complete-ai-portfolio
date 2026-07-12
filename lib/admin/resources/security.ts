import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/security", {
  name: "Security",
  nameSingular: "Setting",
  description: "General security settings",
  icon: "LockKeyhole",
  path: "/admin/security",
  endpoint: "/api/admin/security",
  features: { create: false, update: true, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Setting", type: "text", sortable: true },
    { key: "value", label: "Value", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/security/sessions", {
  name: "Active Sessions",
  nameSingular: "Session",
  description: "Monitor active user sessions",
  icon: "Activity",
  path: "/admin/security/sessions",
  endpoint: "/api/admin/sessions",
  features: { create: false, update: false, del: true, archive: false, export: false },
  fields: [
    { key: "user", label: "User", type: "text", sortable: true },
    { key: "ip", label: "IP Address", type: "text", sortable: true },
    { key: "device", label: "Device", type: "text", sortable: true },
    { key: "createdAt", label: "Started", type: "datetime", sortable: true },
    { key: "expiresAt", label: "Expires", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/security/login-history", {
  name: "Login History",
  nameSingular: "Login",
  description: "View login attempt history",
  icon: "History",
  path: "/admin/security/login-history",
  endpoint: "/api/admin/login-history",
  features: { create: false, update: false, del: true, archive: false, export: true },
  fields: [
    { key: "user", label: "User", type: "text", sortable: true },
    { key: "ip", label: "IP Address", type: "text", sortable: true },
    { key: "success", label: "Success", type: "toggle", sortable: true },
    { key: "createdAt", label: "Time", type: "datetime", sortable: true },
  ],
});
