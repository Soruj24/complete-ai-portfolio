import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/testimonials", {
  name: "Testimonials",
  nameSingular: "Testimonial",
  description: "Client and colleague testimonials",
  icon: "MessageSquare",
  path: "/admin/testimonials",
  endpoint: "/api/admin/testimonials",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "role", label: "Role", type: "text", sortable: true },
    { key: "company", label: "Company", type: "text", sortable: true },
    { key: "content", label: "Content", type: "textarea", showInTable: false, validation: { required: true } },
    { key: "avatar", label: "Avatar", type: "image", showInTable: false },
    { key: "rating", label: "Rating", type: "number", sortable: true, validation: { min: 1, max: 5 } },
    { key: "featured", label: "Featured", type: "toggle", sortable: true },
    { key: "order", label: "Order", type: "number", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
