import { registerResource } from "@/lib/admin/registry";

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
    { key: "size", label: "Size", type: "text", sortable: true, render: (v: unknown) => { const n = Number(v); return n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : n > 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`; }},
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
