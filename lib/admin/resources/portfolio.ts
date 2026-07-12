import { registerResource } from "@/lib/admin/registry";

registerResource("/admin/projects", {
  name: "Projects",
  nameSingular: "Project",
  description: "Manage your portfolio projects",
  icon: "FolderKanban",
  path: "/admin/projects",
  endpoint: "/api/admin/projects",
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true, validation: { required: true }, width: "200px" },
    { key: "slug", label: "Slug", type: "slug", sortable: true, showInForm: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "content", label: "Content", type: "richtext", showInTable: false },
    { key: "category", label: "Category", type: "select", filterable: true, options: [] },
    { key: "techStack", label: "Tech Stack", type: "text", showInTable: false, description: "Comma-separated" },
    { key: "liveUrl", label: "Live URL", type: "url", showInTable: false },
    { key: "repoUrl", label: "Repository URL", type: "url", showInTable: false },
    { key: "image", label: "Image", type: "image", showInTable: false },
    { key: "featured", label: "Featured", type: "toggle", sortable: true },
    { key: "status", label: "Status", type: "select", sortable: true, options: [
      { label: "Draft", value: "draft" }, { label: "Published", value: "published" }, { label: "Archived", value: "archived" },
    ]},
    { key: "order", label: "Order", type: "number", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  tabs: [
    { label: "All", value: "all", filter: {} },
    { label: "Published", value: "published", filter: { status: "published" } },
    { label: "Drafts", value: "draft", filter: { status: "draft" } },
    { label: "Archived", value: "archived", filter: { status: "archived" } },
  ],
  features: { create: true, update: true, del: true, archive: true, restore: true, bulkDelete: true, bulkArchive: true, export: true, import: true, history: true },
});

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
