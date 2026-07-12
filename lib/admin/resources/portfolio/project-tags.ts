import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/project-tags", {
  name: "Project Tags",
  nameSingular: "Tag",
  description: "Manage project tags",
  icon: "FolderKanban",
  path: "/admin/project-tags",
  endpoint: "/api/admin/project-tags",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "projectCount", label: "Projects", type: "number", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
