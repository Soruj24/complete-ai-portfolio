import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/certificates", {
  name: "Certificates",
  nameSingular: "Certificate",
  description: "Manage your certifications and credentials",
  icon: "Award",
  path: "/admin/certificates",
  endpoint: "/api/admin/certificates",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "issuer", label: "Issuer", type: "text", sortable: true },
    { key: "date", label: "Date", type: "date", sortable: true },
    { key: "url", label: "Credential URL", type: "url", showInTable: false },
    { key: "credentialId", label: "Credential ID", type: "text", showInTable: false },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "image", label: "Image", type: "image", showInTable: false },
    { key: "order", label: "Order", type: "number", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});
