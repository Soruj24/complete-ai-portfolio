import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/achievements", {
  name: "Achievements",
  nameSingular: "Achievement",
  description: "Highlight your key accomplishments",
  icon: "Star",
  path: "/admin/achievements",
  endpoint: "/api/admin/achievements",
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true, validation: { required: true } },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "date", label: "Date", type: "date", sortable: true },
    { key: "category", label: "Category", type: "select", filterable: true, options: [] },
    { key: "icon", label: "Icon", type: "text", description: "Lucide icon name" },
    { key: "url", label: "URL", type: "url", showInTable: false },
    { key: "order", label: "Order", type: "number", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
