import type { ResourceConfig } from "@/types/admin";

const configs = new Map<string, ResourceConfig>();

export function registerResource(path: string, config: ResourceConfig) {
  configs.set(path, config);
}

export function getResourceConfig(path: string): ResourceConfig | undefined {
  // Exact match first, then try parent paths
  if (configs.has(path)) return configs.get(path);
  for (const [key, cfg] of configs) {
    if (path.startsWith(key)) return cfg;
  }
  return undefined;
}

export function getAllResources(): ResourceConfig[] {
  return Array.from(configs.values());
}

// ======================== REGISTER ALL RESOURCES ========================

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

registerResource("/admin/blogs", {
  name: "Blogs",
  nameSingular: "Blog Post",
  description: "Manage blog content",
  icon: "BookOpen",
  path: "/admin/blogs",
  endpoint: "/api/admin/blogs",
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true, validation: { required: true }, width: "250px" },
    { key: "slug", label: "Slug", type: "slug", showInForm: true },
    { key: "excerpt", label: "Excerpt", type: "textarea", showInTable: false },
    { key: "content", label: "Content", type: "richtext", showInTable: false },
    { key: "category", label: "Category", type: "select", filterable: true, sortable: true, options: [] },
    { key: "tags", label: "Tags", type: "text", showInTable: false, description: "Comma-separated" },
    { key: "coverImage", label: "Cover Image", type: "image", showInTable: false },
    { key: "status", label: "Status", type: "select", sortable: true, options: [
      { label: "Draft", value: "draft" }, { label: "Published", value: "published" }, { label: "Archived", value: "archived" },
    ]},
    { key: "featured", label: "Featured", type: "toggle", sortable: true },
    { key: "views", label: "Views", type: "number", sortable: true, showInForm: false },
    { key: "publishedAt", label: "Published", type: "datetime", sortable: true },
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

registerResource("/admin/blog-categories", {
  name: "Blog Categories",
  nameSingular: "Category",
  description: "Organize blog posts by category",
  icon: "BookOpen",
  path: "/admin/blog-categories",
  endpoint: "/api/admin/blog-categories",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "postCount", label: "Posts", type: "number", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});

registerResource("/admin/media", {
  name: "Media Library",
  nameSingular: "Media Item",
  description: "Manage images, documents, and other files",
  icon: "Image",
  path: "/admin/media",
  endpoint: "/api/admin/media",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "type", label: "Type", type: "select", filterable: true, sortable: true, options: [
      { label: "Image", value: "image" }, { label: "Document", value: "document" },
      { label: "Video", value: "video" }, { label: "Audio", value: "audio" }, { label: "Other", value: "other" },
    ]},
    { key: "size", label: "Size", type: "text", sortable: true, render: (v) => { const n = Number(v); return n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : n > 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`; }},
    { key: "url", label: "URL", type: "url", showInTable: false },
    { key: "alt", label: "Alt Text", type: "text", showInTable: false },
    { key: "folder", label: "Folder", type: "text", filterable: true, sortable: true },
    { key: "createdAt", label: "Uploaded", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true },
});

registerResource("/admin/resume", {
  name: "Resumes",
  nameSingular: "Resume",
  description: "Manage resume versions",
  icon: "FileText",
  path: "/admin/resume",
  endpoint: "/api/admin/resume",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "title", label: "Title", type: "text", sortable: true },
    { key: "summary", label: "Summary", type: "textarea", showInTable: false },
    { key: "version", label: "Version", type: "text", sortable: true },
    { key: "file", label: "File", type: "file", showInTable: false },
    { key: "isActive", label: "Active", type: "toggle", sortable: true },
    { key: "downloads", label: "Downloads", type: "number", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true, history: true },
});

registerResource("/admin/downloads", {
  name: "Downloads",
  nameSingular: "Download",
  description: "Manage downloadable resources",
  icon: "Download",
  path: "/admin/downloads",
  endpoint: "/api/admin/downloads",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "file", label: "File", type: "file", showInTable: false },
    { key: "type", label: "Type", type: "text", sortable: true },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "downloads", label: "Downloads", type: "number", sortable: true, showInForm: false },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "isPublic", label: "Public", type: "toggle", sortable: true },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});

registerResource("/admin/messages", {
  name: "Messages",
  nameSingular: "Message",
  description: "User messages from the chat system",
  icon: "Mail",
  path: "/admin/messages",
  endpoint: "/api/admin/messages",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "email", label: "Email", type: "email", sortable: true },
    { key: "subject", label: "Subject", type: "text", sortable: true },
    { key: "message", label: "Message", type: "textarea", showInTable: false },
    { key: "read", label: "Read", type: "toggle", sortable: true },
    { key: "replied", label: "Replied", type: "toggle", sortable: true },
    { key: "createdAt", label: "Received", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: false, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/contact-requests", {
  name: "Contact Requests",
  nameSingular: "Request",
  description: "Incoming contact form submissions",
  icon: "MessageCircle",
  path: "/admin/contact-requests",
  endpoint: "/api/admin/contact-requests",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "email", label: "Email", type: "email", sortable: true },
    { key: "phone", label: "Phone", type: "text", sortable: true },
    { key: "company", label: "Company", type: "text", sortable: true },
    { key: "subject", label: "Subject", type: "text", sortable: true },
    { key: "status", label: "Status", type: "select", filterable: true, sortable: true, options: [
      { label: "New", value: "new" }, { label: "Read", value: "read" },
      { label: "Replied", value: "replied" }, { label: "Closed", value: "closed" },
    ]},
    { key: "message", label: "Message", type: "textarea", showInTable: false },
    { key: "createdAt", label: "Received", type: "datetime", sortable: true, showInForm: false },
  ],
  tabs: [
    { label: "New", value: "new", filter: { status: "new" } },
    { label: "Read", value: "read", filter: { status: "read" } },
    { label: "Replied", value: "replied", filter: { status: "replied" } },
    { label: "Closed", value: "closed", filter: { status: "closed" } },
    { label: "All", value: "all", filter: {} },
  ],
  features: { create: false, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/newsletter", {
  name: "Newsletter",
  nameSingular: "Subscriber",
  description: "Manage newsletter subscribers",
  icon: "Newspaper",
  path: "/admin/newsletter",
  endpoint: "/api/admin/newsletter",
  fields: [
    { key: "email", label: "Email", type: "email", sortable: true, validation: { required: true } },
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "subscribed", label: "Subscribed", type: "toggle", sortable: true },
    { key: "source", label: "Source", type: "text", filterable: true, sortable: true },
    { key: "subscribedAt", label: "Subscribed At", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true },
});

registerResource("/admin/users", {
  name: "Users",
  nameSingular: "User",
  description: "Manage system users",
  icon: "Users2",
  path: "/admin/users",
  endpoint: "/api/admin/users",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "email", label: "Email", type: "email", sortable: true, validation: { required: true } },
    { key: "role", label: "Role", type: "select", filterable: true, sortable: true, options: [] },
    { key: "status", label: "Status", type: "select", filterable: true, sortable: true, options: [
      { label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }, { label: "Banned", value: "banned" },
    ]},
    { key: "lastLogin", label: "Last Login", type: "datetime", sortable: true, showInForm: false },
    { key: "createdAt", label: "Joined", type: "datetime", sortable: true, showInForm: false },
  ],
  tabs: [
    { label: "All", value: "all", filter: {} },
    { label: "Active", value: "active", filter: { status: "active" } },
    { label: "Inactive", value: "inactive", filter: { status: "inactive" } },
    { label: "Banned", value: "banned", filter: { status: "banned" } },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true, history: true },
});

registerResource("/admin/roles", {
  name: "Roles",
  nameSingular: "Role",
  description: "Manage user roles and permissions",
  icon: "Shield",
  path: "/admin/roles",
  endpoint: "/api/admin/roles",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
    { key: "userCount", label: "Users", type: "number", sortable: true, showInForm: false },
    { key: "isSystem", label: "System Role", type: "toggle", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/permissions", {
  name: "Permissions",
  nameSingular: "Permission",
  description: "Manage granular permissions",
  icon: "LockKeyhole",
  path: "/admin/permissions",
  endpoint: "/api/admin/permissions",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "slug", label: "Slug", type: "slug", sortable: true },
    { key: "group", label: "Group", type: "select", filterable: true, sortable: true, options: [] },
    { key: "description", label: "Description", type: "textarea", showInTable: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true },
});

registerResource("/admin/seo", {
  name: "SEO",
  nameSingular: "SEO Entry",
  description: "Manage search engine optimization for pages",
  icon: "SearchIcon",
  path: "/admin/seo",
  endpoint: "/api/admin/seo",
  fields: [
    { key: "page", label: "Page", type: "text", sortable: true, validation: { required: true } },
    { key: "title", label: "Meta Title", type: "text", sortable: true },
    { key: "description", label: "Meta Description", type: "textarea", showInTable: false },
    { key: "keywords", label: "Keywords", type: "text", showInTable: false, description: "Comma-separated" },
    { key: "ogImage", label: "OG Image", type: "image", showInTable: false },
    { key: "ogTitle", label: "OG Title", type: "text", showInTable: false },
    { key: "canonical", label: "Canonical URL", type: "url", showInTable: false },
    { key: "robots", label: "Robots", type: "select", options: [
      { label: "Index, Follow", value: "index,follow" },
      { label: "No Index, Follow", value: "noindex,follow" },
      { label: "Index, No Follow", value: "index,nofollow" },
      { label: "No Index, No Follow", value: "noindex,nofollow" },
    ]},
    { key: "sitemapPriority", label: "Sitemap Priority", type: "number", validation: { min: 0, max: 1 } },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true, import: true },
});

registerResource("/admin/api-keys", {
  name: "API Keys",
  nameSingular: "API Key",
  description: "Manage API access keys",
  icon: "Key",
  path: "/admin/api-keys",
  endpoint: "/api/admin/api-keys",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "key", label: "Key", type: "text", sortable: true, showInForm: false },
    { key: "active", label: "Active", type: "toggle", sortable: true },
    { key: "lastUsed", label: "Last Used", type: "datetime", sortable: true, showInForm: false },
    { key: "expiresAt", label: "Expires", type: "datetime", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/integrations", {
  name: "Integrations",
  nameSingular: "Integration",
  description: "Manage third-party integrations",
  icon: "Link2",
  path: "/admin/integrations",
  endpoint: "/api/admin/integrations",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "provider", label: "Provider", type: "text", sortable: true },
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "status", label: "Status", type: "select", sortable: true, options: [
      { label: "Connected", value: "connected" }, { label: "Disconnected", value: "disconnected" }, { label: "Error", value: "error" },
    ]},
    { key: "lastSync", label: "Last Sync", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/system/backup", {
  name: "Backups",
  nameSingular: "Backup",
  description: "Manage system backups",
  icon: "Database",
  path: "/admin/system/backup",
  endpoint: "/api/admin/backups",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "type", label: "Type", type: "select", options: [{ label: "Full", value: "full" }, { label: "Partial", value: "partial" }] },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "status", label: "Status", type: "select", options: [
      { label: "Completed", value: "completed" }, { label: "Failed", value: "failed" }, { label: "In Progress", value: "in_progress" },
    ]},
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: false, del: true, archive: false, export: true },
});

registerResource("/admin/ai/prompts", {
  name: "Prompt Library",
  nameSingular: "Prompt",
  description: "Manage AI prompts and templates",
  icon: "Library",
  path: "/admin/ai/prompts",
  endpoint: "/api/admin/ai/prompts",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "content", label: "Content", type: "richtext", showInTable: false, validation: { required: true } },
    { key: "category", label: "Category", type: "select", filterable: true, options: [] },
    { key: "model", label: "Model", type: "text", sortable: true },
    { key: "temperature", label: "Temperature", type: "number", validation: { min: 0, max: 2 } },
    { key: "maxTokens", label: "Max Tokens", type: "number" },
    { key: "isActive", label: "Active", type: "toggle", sortable: true },
    { key: "version", label: "Version", type: "number", sortable: true, showInForm: false },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, bulkDelete: true, export: true, import: true, history: true },
});

registerResource("/admin/ai/llm-providers", {
  name: "LLM Providers",
  nameSingular: "Provider",
  description: "Configure large language model providers",
  icon: "Sparkles",
  path: "/admin/ai/llm-providers",
  endpoint: "/api/admin/ai/llm-providers",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "provider", label: "Provider", type: "select", options: [
      { label: "OpenAI", value: "openai" }, { label: "Anthropic", value: "anthropic" },
      { label: "Google", value: "google" }, { label: "Ollama", value: "ollama" }, { label: "Custom", value: "custom" },
    ]},
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "configured", label: "Configured", type: "toggle", sortable: true, showInForm: false },
    { key: "defaultModel", label: "Default Model", type: "text", sortable: true },
    { key: "createdAt", label: "Added", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/ai/mcp-servers", {
  name: "MCP Servers",
  nameSingular: "MCP Server",
  description: "Manage MCP (Model Context Protocol) servers",
  icon: "Cable",
  path: "/admin/ai/mcp-servers",
  endpoint: "/api/admin/ai/mcp-servers",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "type", label: "Type", type: "select", options: [
      { label: "STDIO", value: "stdio" }, { label: "SSE", value: "sse" }, { label: "Streamable HTTP", value: "streamable-http" },
    ]},
    { key: "command", label: "Command", type: "text", showInTable: false },
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "status", label: "Status", type: "select", options: [
      { label: "Connected", value: "connected" }, { label: "Disconnected", value: "disconnected" }, { label: "Error", value: "error" },
    ]},
    { key: "lastSeen", label: "Last Seen", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/webrtc", {
  name: "WebRTC Settings",
  nameSingular: "Configuration",
  description: "Manage WebRTC configurations",
  icon: "Phone",
  path: "/admin/webrtc",
  endpoint: "/api/admin/webrtc",
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "enabled", label: "Enabled", type: "toggle", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
  features: { create: true, update: true, del: true, archive: false, export: true },
});

registerResource("/admin/environment", {
  name: "Environment Variables",
  nameSingular: "Variable",
  description: "Manage environment configuration",
  icon: "Server",
  path: "/admin/environment",
  endpoint: "/api/admin/environment",
  features: { create: false, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "key", label: "Key", type: "text", sortable: true },
    { key: "value", label: "Value", type: "password", showInTable: false },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/notifications", {
  name: "Notification Center",
  nameSingular: "Notification",
  description: "View and manage system notifications",
  icon: "Bell",
  path: "/admin/notifications",
  endpoint: "/api/admin/notifications",
  features: { create: false, update: true, del: true, archive: false, export: false },
  fields: [
    { key: "title", label: "Title", type: "text", sortable: true },
    { key: "message", label: "Message", type: "textarea", showInTable: false },
    { key: "read", label: "Read", type: "toggle", sortable: true },
    { key: "createdAt", label: "Received", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/security", {
  name: "Security",
  nameSingular: "Setting",
  description: "General security settings",
  icon: "LockKeyhole",
  path: "/admin/security",
  endpoint: "/api/admin/security",
  features: { create: false, update: true, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Setting", type: "text", sortable: true },
    { key: "value", label: "Value", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/security/sessions", {
  name: "Active Sessions",
  nameSingular: "Session",
  description: "Monitor active user sessions",
  icon: "Activity",
  path: "/admin/security/sessions",
  endpoint: "/api/admin/sessions",
  features: { create: false, update: false, del: true, archive: false, export: false },
  fields: [
    { key: "user", label: "User", type: "text", sortable: true },
    { key: "ip", label: "IP Address", type: "text", sortable: true },
    { key: "device", label: "Device", type: "text", sortable: true },
    { key: "createdAt", label: "Started", type: "datetime", sortable: true },
    { key: "expiresAt", label: "Expires", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/security/login-history", {
  name: "Login History",
  nameSingular: "Login",
  description: "View login attempt history",
  icon: "History",
  path: "/admin/security/login-history",
  endpoint: "/api/admin/login-history",
  features: { create: false, update: false, del: true, archive: false, export: true },
  fields: [
    { key: "user", label: "User", type: "text", sortable: true },
    { key: "ip", label: "IP Address", type: "text", sortable: true },
    { key: "success", label: "Success", type: "toggle", sortable: true },
    { key: "createdAt", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/logs", {
  name: "System Logs",
  nameSingular: "Log",
  description: "View system log entries",
  icon: "ScrollText",
  path: "/admin/system/logs",
  endpoint: "/api/admin/logs",
  features: { create: false, update: false, del: true, archive: false, export: true },
  fields: [
    { key: "level", label: "Level", type: "select", filterable: true, options: [
      { label: "Info", value: "info" }, { label: "Warning", value: "warning" },
      { label: "Error", value: "error" }, { label: "Debug", value: "debug" },
    ]},
    { key: "message", label: "Message", type: "text", sortable: true },
    { key: "source", label: "Source", type: "text", sortable: true },
    { key: "timestamp", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/activity", {
  name: "Activity History",
  nameSingular: "Activity",
  description: "Track user activity on the platform",
  icon: "History",
  path: "/admin/system/activity",
  endpoint: "/api/admin/activity",
  features: { create: false, update: false, del: true, archive: false, export: true },
  fields: [
    { key: "user", label: "User", type: "text", sortable: true },
    { key: "action", label: "Action", type: "text", sortable: true },
    { key: "entity", label: "Entity", type: "text", sortable: true },
    { key: "timestamp", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/audit", {
  name: "Audit Logs",
  nameSingular: "Audit Entry",
  description: "Detailed audit trail for compliance",
  icon: "UserCog",
  path: "/admin/system/audit",
  endpoint: "/api/admin/audit",
  features: { create: false, update: false, del: false, archive: false, export: true },
  fields: [
    { key: "action", label: "Action", type: "text", sortable: true },
    { key: "entity", label: "Entity", type: "text", sortable: true },
    { key: "userName", label: "User", type: "text", sortable: true },
    { key: "ip", label: "IP", type: "text", sortable: true },
    { key: "timestamp", label: "Time", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/system/database", {
  name: "Database Health",
  nameSingular: "Metric",
  description: "Monitor database performance and health",
  icon: "Database",
  path: "/admin/system/database",
  endpoint: "/api/admin/database",
  features: { create: false, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Metric", type: "text" },
    { key: "value", label: "Value", type: "text" },
    { key: "status", label: "Status", type: "select", options: [{ label: "Healthy", value: "healthy" }, { label: "Warning", value: "warning" }, { label: "Critical", value: "critical" }] },
  ],
});

registerResource("/admin/system/storage", {
  name: "Storage",
  nameSingular: "Storage Entry",
  description: "Monitor storage usage",
  icon: "Server",
  path: "/admin/system/storage",
  endpoint: "/api/admin/storage",
  features: { create: false, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Name", type: "text" },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "type", label: "Type", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/appearance", {
  name: "Appearance",
  nameSingular: "Setting",
  description: "Customize the look and feel",
  icon: "Palette",
  path: "/admin/appearance",
  endpoint: "/api/admin/appearance",
  features: { create: false, update: true, del: false, archive: false, export: false, import: true },
  fields: [
    { key: "key", label: "Setting", type: "text", sortable: true },
    { key: "value", label: "Value", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/appearance/themes", {
  name: "Themes",
  nameSingular: "Theme",
  description: "Manage visual themes",
  icon: "Palette",
  path: "/admin/appearance/themes",
  endpoint: "/api/admin/themes",
  features: { create: true, update: true, del: true, archive: false, export: true, import: true },
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true, validation: { required: true } },
    { key: "isActive", label: "Active", type: "toggle", sortable: true },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/settings/general", {
  name: "General Settings",
  nameSingular: "Setting",
  description: "General application settings",
  icon: "Settings2",
  path: "/admin/settings/general",
  endpoint: "/api/admin/settings",
  features: { create: false, update: true, del: false, archive: false, export: false },
  fields: [
    { key: "key", label: "Setting", type: "text", sortable: true },
    { key: "value", label: "Value", type: "text" },
    { key: "updatedAt", label: "Updated", type: "datetime", sortable: true, showInForm: false },
  ],
});

registerResource("/admin/system/restore", {
  name: "Restore",
  nameSingular: "Restore Point",
  description: "Restore system from backups",
  icon: "RefreshCw",
  path: "/admin/system/restore",
  endpoint: "/api/admin/restore",
  features: { create: true, update: false, del: false, archive: false, export: false },
  fields: [
    { key: "name", label: "Backup", type: "text", sortable: true },
    { key: "size", label: "Size", type: "text", sortable: true },
    { key: "status", label: "Status", type: "select", options: [{ label: "Available", value: "available" }, { label: "Restoring", value: "restoring" }] },
    { key: "createdAt", label: "Created", type: "datetime", sortable: true },
  ],
});

registerResource("/admin/profile", {
  name: "Profile",
  nameSingular: "Profile",
  description: "Manage your admin profile",
  icon: "UserCog",
  path: "/admin/profile",
  endpoint: "/api/admin/profile",
  features: { create: false, update: true, del: false, archive: false, export: false, history: true },
  fields: [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "email", label: "Email", type: "email", sortable: true },
    { key: "image", label: "Avatar", type: "image", showInTable: false },
    { key: "bio", label: "Bio", type: "textarea", showInTable: false },
  ],
});

// Analytics pages (read-only views)
const analyticsFields: import("@/types/admin").FieldDef[] = [
  { key: "metric", label: "Metric", type: "text", sortable: true },
  { key: "value", label: "Value", type: "text", sortable: true },
  { key: "change", label: "Change", type: "text", sortable: true },
  { key: "date", label: "Date", type: "datetime", sortable: true },
];

const analyticsConfig = (path: string, name: string, desc: string, icon: string) => ({
  name, nameSingular: "Entry", description: desc, icon, path,
  endpoint: `/api/admin/analytics${path.replace("/admin/analytics", "")}`,
  features: { create: false, update: false, del: false, archive: false, export: true } as const,
  fields: analyticsFields,
});

registerResource("/admin/analytics/traffic", analyticsConfig("/admin/analytics/traffic", "Traffic Analytics", "Website traffic and page views", "Activity"));
registerResource("/admin/analytics/search", analyticsConfig("/admin/analytics/search", "Search Analytics", "Internal search queries and results", "SearchIcon"));
registerResource("/admin/analytics/visitors", analyticsConfig("/admin/analytics/visitors", "Visitor Map", "Geographic visitor data", "Map"));
registerResource("/admin/analytics/github", analyticsConfig("/admin/analytics/github", "GitHub Stats", "GitHub repository statistics", "BarChart3"));
registerResource("/admin/analytics/ai", analyticsConfig("/admin/analytics/ai", "AI Analytics", "AI feature usage metrics", "Brain"));
