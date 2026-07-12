import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/experience", {
  name: "Experience",
  nameSingular: "Experience",
  description: "Manage your work history",
  icon: "Briefcase",
  path: "/admin/experience",
  endpoint: "/api/admin/experience",
  fields: [
    { key: "company", label: "Company", type: "text", sortable: true, validation: { required: true } },
    { key: "role", label: "Role", type: "text", sortable: true, validation: { required: true } },
    { key: "description", label: "Description", type: "richtext", showInTable: false },
    { key: "startDate", label: "Start Date", type: "date", sortable: true },
    { key: "endDate", label: "End Date", type: "date", sortable: true },
    { key: "current", label: "Current Position", type: "toggle", sortable: true },
    { key: "location", label: "Location", type: "text", sortable: true },
    { key: "companyUrl", label: "Company URL", type: "url", showInTable: false },
    { key: "technologies", label: "Technologies", type: "text", showInTable: false, description: "Comma-separated" },
    { key: "order", label: "Order", type: "number", sortable: true },
  ],
  tabs: [
    { label: "All", value: "all", filter: {} },
    { label: "Current", value: "current", filter: { current: true } },
    { label: "Past", value: "past", filter: { current: false } },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, history: true },
});
