import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/social-links", {
  name: "Social Links",
  nameSingular: "Social Link",
  description: "Manage social media and contact links",
  icon: "Share2",
  path: "/admin/social-links",
  endpoint: "/api/admin/social-links",
  fields: [
    { key: "platform", label: "Platform", type: "text", sortable: true, validation: { required: true } },
    { key: "label", label: "Label", type: "text", sortable: true, validation: { required: true } },
    { key: "url", label: "URL", type: "url", sortable: true, validation: { required: true } },
    { key: "icon", label: "Icon", type: "text", description: "Lucide icon name" },
    { key: "handle", label: "Handle", type: "text" },
    { key: "order", label: "Order", type: "number", sortable: true },
    { key: "isActive", label: "Active", type: "toggle", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
