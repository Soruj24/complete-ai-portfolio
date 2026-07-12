import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/project-categories", {
  name: "Project Categories",
  nameSingular: "Category",
  description: "Organize projects by category",
  icon: "FolderKanban",
  path: "/admin/project-categories",
  endpoint: "/api/admin/project-categories",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "color", label: "Color", type: "color" },
    { key: "projectCount", label: "Projects", type: "number", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, history: true },
});
