import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/education", {
  name: "Education",
  nameSingular: "Education",
  description: "Manage your educational background",
  icon: "GraduationCap",
  path: "/admin/education",
  endpoint: "/api/admin/education",
  fields: [
    { key: "institution", label: "Institution", type: "text", sortable: true, validation: { required: true } },
    { key: "degree", label: "Degree", type: "text", sortable: true },
    { key: "field", label: "Field of Study", type: "text", sortable: true },
    { key: "startDate", label: "Start Date", type: "date", sortable: true },
    { key: "endDate", label: "End Date", type: "date", sortable: true },
    { key: "gpa", label: "GPA", type: "text", sortable: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "order", label: "Order", type: "number", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
