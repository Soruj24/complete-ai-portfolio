import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/users", {
  name: "Users",
  nameSingular: "User",
  description: "Manage system users",
  icon: "Users2",
  path: "/admin/users",
  endpoint: "/api/admin/users",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "email", label: "Email", type: "email", sortable: true, validation: { required: true } },
    { key: "role", label: "Role", type: "select", filterable: true, sortable: true, options: [] },
    { key: "status", label: "Status", type: "select", filterable: true, sortable: true, options: [
      { label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }, { label: "Banned", value: "banned" },
    ]},
    { key: "lastLogin", label: "Last Login", type: "datetime", sortable: true, showInForm: false },
    { key: "createdAt", label: "Joined", type: "datetime", sortable: true, showInForm: false },
  ],
  tabs: [
    { label: "All", value: "all", filter: {} },
    { label: "Active", value: "active", filter: { status: "active" } },
    { label: "Inactive", value: "inactive", filter: { status: "inactive" } },
    { label: "Banned", value: "banned", filter: { status: "banned" } },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true, history: true },
});

registerResource("/admin/roles", {
  name: "Roles",
  nameSingular: "Role",
  description: "Manage user roles and permissions",
  icon: "Shield",
  path: "/admin/roles",
  endpoint: "/api/admin/roles",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "userCount", label: "Users", type: "number", sortable: true, showInForm: false },
    { key: "isSystem", label: "System Role", type: "toggle", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/permissions", {
  name: "Permissions",
  nameSingular: "Permission",
  description: "Manage granular permissions",
  icon: "LockKeyhole",
  path: "/admin/permissions",
  endpoint: "/api/admin/permissions",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "group", label: "Group", type: "select", filterable: true, sortable: true, options: [] },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});

registerResource("/admin/seo", {
  name: "SEO",
  nameSingular: "SEO Entry",
  description: "Manage search engine optimization for pages",
  icon: "SearchIcon",
  path: "/admin/seo",
  endpoint: "/api/admin/seo",
  fields: [
    { key: "page", label: "Page", type: "text", sortable: true, validation: { required: true } },
    { key: "title", label: "Meta Title", type: "text", sortable: true },
    { key: "description", label: "Meta Description", type: "textarea", showInTable: false },
    { key: "keywords", label: "Keywords", type: "text", showInTable: false, description: "Comma-separated" },
    { key: "ogImage", label: "OG Image", type: "image", showInTable: false },
    { key: "ogTitle", label: "OG Title", type: "text", showInTable: false },
    { key: "canonical", label: "Canonical URL", type: "url", showInTable: false },
    { key: "robots", label: "Robots", type: "select", options: [
      { label: "Index, Follow", value: "index,follow" },
      { label: "No Index, Follow", value: "noindex,follow" },
      { label: "Index, No Follow", value: "index,nofollow" },
      { label: "No Index, No Follow", value: "noindex,nofollow" },
    ]},
    { key: "sitemapPriority", label: "Sitemap Priority", type: "number", validation: { min: 0, max: 1 } },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true, import: true },
});

registerResource("/admin/api-keys", {
  name: "API Keys",
  nameSingular: "API Key",
  description: "Manage API access keys",
  icon: "Key",
  path: "/admin/api-keys",
  endpoint: "/api/admin/api-keys",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "key", label: "Key", type: "text", sortable: true, showInForm: false },
    { key: "active", label: "Active", type: "toggle", sortable: true },
    { key: "lastUsed", label: "Last Used", type: "datetime", sortable: true, showInForm: false },
    { key: "expiresAt", label: "Expires", type: "datetime", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/integrations", {
  name: "Integrations",
  nameSingular: "Integration",
  description: "Manage third-party integrations",
  icon: "Link2",
  path: "/admin/integrations",
  endpoint: "/api/admin/integrations",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "provider", label: "Provider", type: "text", sortable: true },
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "status", label: "Status", type: "select", sortable: true, options: [
      { label: "Connected", value: "connected" }, { label: "Disconnected", value: "disconnected" }, { label: "Error", value: "error" },
    ]},
    { key: "lastSync", label: "Last Sync", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});
