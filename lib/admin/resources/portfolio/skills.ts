import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/skills", {
  name: "Skills",
  nameSingular: "Skill",
  description: "Manage your technical skills",
  icon: "Code2",
  path: "/admin/skills",
  endpoint: "/api/admin/skills",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "icon", label: "Icon", type: "text", description: "Lucide icon name or URL" },
    { key: "category", label: "Category", type: "select", filterable: true, options: [
      { label: "Frontend", value: "frontend" }, { label: "Backend", value: "backend" },
      { label: "DevOps", value: "devops" }, { label: "AI", value: "ai" },
      { label: "Tools", value: "tools" }, { label: "Other", value: "other" },
    ]},
    { key: "proficiency", label: "Proficiency", type: "number", sortable: true, validation: { min: 0, max: 100 } },
    { key: "order", label: "Order", type: "number", sortable: true },
    { key: "featured", label: "Featured", type: "toggle", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true, history: true },
});
