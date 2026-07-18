import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/downloads", {
  name: "Downloads",
  nameSingular: "Download",
  description: "Manage downloadable files and resources",
  icon: "Download",
  path: "/admin/downloads",
  endpoint: "/api/admin/downloads",
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true, validation: { required: true } },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "fileName", label: "File Name", type: "text", sortable: true },
    { key: "fileSize", label: "File Size", type: "text", sortable: true },
    { key: "fileUrl", label: "File URL", type: "url", showInTable: false },
    { key: "category", label: "Category", type: "text", filterable: true },
    { key: "downloadCount", label: "Downloads", type: "number", sortable: true, showInForm: false },
    { key: "featured", label: "Featured", type: "toggle", sortable: true },
    { key: "order", label: "Order", type: "number", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
