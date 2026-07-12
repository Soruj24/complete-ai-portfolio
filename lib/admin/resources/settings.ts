import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/environment", {
  name: "Environment Variables",
  nameSingular: "Variable",
  description: "Manage environment configuration",
  icon: "Server",
  path: "/admin/environment",
  endpoint: "/api/admin/environment",
  features: { create: false, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "key", label: "Key", type: "text", sortable: true },
    { key: "value", label: "Value", type: "password", showInTable: false },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/notifications", {
  name: "Notification Center",
  nameSingular: "Notification",
  description: "View and manage system notifications",
  icon: "Bell",
  path: "/admin/notifications",
  endpoint: "/api/admin/notifications",
  features: { create: false, update: true, del: true, archive: false, export: false },
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true },
    { key: "message", label: "Message", type: "textarea", showInTable: false },
    { key: "read", label: "Read", type: "toggle", sortable: true },
    { key: "createdAt", label: "Received", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/appearance", {
  name: "Appearance",
  nameSingular: "Setting",
  description: "Customize the look and feel",
  icon: "Palette",
  path: "/admin/appearance",
  endpoint: "/api/admin/appearance",
  features: { create: false, update: true, del: false, archive: false, export: false, import: true },
  fields: [
    { key: "key", label: "Setting", type: "text", sortable: true },
    { key: "value", label: "Value", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/appearance/themes", {
  name: "Themes",
  nameSingular: "Theme",
  description: "Manage visual themes",
  icon: "Palette",
  path: "/admin/appearance/themes",
  endpoint: "/api/admin/themes",
  features: { create: true, update: true, del: true, archive: false, export: true, import: true },
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "isActive", label: "Active", type: "toggle", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/settings/general", {
  name: "General Settings",
  nameSingular: "Setting",
  description: "General application settings",
  icon: "Settings2",
  path: "/admin/settings/general",
  endpoint: "/api/admin/settings",
  features: { create: false, update: true, del: false, archive: false, export: false },
  fields: [
    { key: "key", label: "Setting", type: "text", sortable: true },
    { key: "value", label: "Value", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/profile", {
  name: "Profile",
  nameSingular: "Profile",
  description: "Manage your admin profile",
  icon: "UserCog",
  path: "/admin/profile",
  endpoint: "/api/admin/profile",
  features: { create: false, update: true, del: false, archive: false, export: false, history: true },
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "email", label: "Email", type: "email", sortable: true },
    { key: "image", label: "Avatar", type: "image", showInTable: false },
    { key: "bio", label: "Bio", type: "textarea", showInTable: false },
  ],
});
