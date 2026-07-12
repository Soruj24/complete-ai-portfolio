import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/projects", {
  name: "Projects",
  nameSingular: "Project",
  description: "Manage your portfolio projects",
  icon: "FolderKanban",
  path: "/admin/projects",
  endpoint: "/api/admin/projects",
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true, validation: { required: true }, width: "200px" },
    { key: "slug", label: "Slug", type: "slug", sortable: true, showInForm: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "content", label: "Content", type: "richtext", showInTable: false },
    { key: "category", label: "Category", type: "select", filterable: true, options: [] },
    { key: "techStack", label: "Tech Stack", type: "text", showInTable: false, description: "Comma-separated" },
    { key: "liveUrl", label: "Live URL", type: "url", showInTable: false },
    { key: "repoUrl", label: "Repository URL", type: "url", showInTable: false },
    { key: "image", label: "Image", type: "image", showInTable: false },
    { key: "featured", label: "Featured", type: "toggle", sortable: true },
    { key: "status", label: "Status", type: "select", sortable: true, options: [
      { label: "Draft", value: "draft" }, { label: "Published", value: "published" }, { label: "Archived", value: "archived" },
    ]},
    { key: "order", label: "Order", type: "number", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  tabs: [
    { label: "All", value: "all", filter: {} },
    { label: "Published", value: "published", filter: { status: "published" } },
    { label: "Drafts", value: "draft", filter: { status: "draft" } },
    { label: "Archived", value: "archived", filter: { status: "archived" } },
  ],
  features: { create: true, update: true, del: true, archive: true, restore: true, bulkDelete: true, bulkArchive: true, export: true, import: true, history: true },
});
