import { NextRequest, NextResponse } from "next/server";

const RESOURCE_DEFAULTS: Record<string, Record<string, unknown>> = {
  projects: { title: "Sample Project", slug: "sample-project", description: "A project description", status: "published", featured: false, order: 0 },
  "project-categories": { name: "Web Development", slug: "web-development", description: "Web dev projects", color: "#3b82f6" },
  "project-tags": { name: "React", slug: "react" },
  skills: { name: "TypeScript", icon: "Code2", category: "frontend", proficiency: 90, order: 0, featured: true },
  experience: { company: "Tech Corp", role: "Senior Developer", description: "Led development team", startDate: "2023-01-01", current: true },
  education: { institution: "MIT", degree: "B.S.", field: "Computer Science", startDate: "2018-09-01", endDate: "2022-06-01" },
  certificates: { name: "AWS Certified", issuer: "Amazon", date: "2024-01-15", url: "https://example.com" },
  achievements: { title: "Won Hackathon", description: "First place at national hackathon", date: "2024-03-01" },
  testimonials: { name: "John Doe", role: "CEO", company: "Acme Inc", content: "Excellent work!", rating: 5, featured: true },
  blogs: { title: "Getting Started with Next.js", slug: "getting-started-nextjs", excerpt: "Learn Next.js", status: "published", views: 0 },
  "blog-categories": { name: "Technology", slug: "technology" },
  media: { name: "hero.jpg", url: "/uploads/hero.jpg", type: "image", mimeType: "image/jpeg", size: 102400, folder: "hero" },
  resume: { name: "Main Resume", title: "Software Engineer", version: "1.0", isActive: true, downloads: 0 },
  downloads: { name: "Brochure.pdf", file: "/downloads/brochure.pdf", type: "PDF", size: 2048000, downloads: 0, isPublic: true },
  messages: { name: "Alice", email: "alice@example.com", subject: "Hello", message: "Great portfolio!", read: false, replied: false },
  "contact-requests": { name: "Bob", email: "bob@example.com", phone: "+1234567890", company: "BobCo", subject: "Inquiry", status: "new" },
  newsletter: { email: "user@example.com", name: "User", subscribed: true, source: "homepage" },
  users: { name: "Admin User", email: "admin@example.com", role: "admin", status: "active" },
  roles: { name: "Administrator", slug: "admin", description: "Full access", isSystem: true },
  permissions: { name: "Create Users", slug: "create:users", group: "users", description: "Can create new users" },
  seo: { page: "/home", title: "Home Page", description: "Welcome to my site", keywords: "portfolio, developer", robots: "index,follow", sitemapPriority: 1.0 },
  "api-keys": { name: "Production Key", key: "sk-...****", active: true },
  integrations: { name: "GitHub", provider: "github", enabled: true, status: "connected" },
  backups: { name: "Backup 2024-01-01", type: "full", size: "2.4 GB", status: "completed" },
  "ai/prompts": { name: "Blog Generator", content: "Write a blog post about...", category: "content", model: "gpt-4", temperature: 0.7, maxTokens: 2000, isActive: true, version: 1 },
  "ai/llm-providers": { name: "OpenAI", provider: "openai", enabled: true, configured: true, defaultModel: "gpt-4" },
  "ai/mcp-servers": { name: "File System MCP", type: "stdio", command: "npx", enabled: true, status: "connected" },
  webrtc: { name: "Default Config", enabled: true },
  environment: { key: "DATABASE_URL", value: "postgresql://...", updatedAt: "2024-01-01" },
  notifications: { title: "Welcome!", message: "Thanks for joining", read: false },
  security: { name: "Two-Factor Auth", value: "Enabled", updatedAt: "2024-01-01" },
  sessions: { user: "Admin", ip: "192.168.1.1", device: "Chrome / Windows" },
  "login-history": { user: "Admin", ip: "192.168.1.1", success: true },
  logs: { level: "info", message: "Server started", source: "system" },
  activity: { user: "Admin", action: "Updated project", entity: "Project", timestamp: new Date().toISOString() },
  audit: { action: "user.update", entity: "User:123", userName: "Admin", ip: "192.168.1.1", timestamp: new Date().toISOString() },
  database: { name: "Connection Pool", value: "5 active / 10 max", status: "healthy" },
  storage: { name: "Uploads", size: "1.2 GB", type: "Local" },
  appearance: { key: "primaryColor", value: "#3b82f6", updatedAt: "2024-01-01" },
  themes: { name: "Dark Mode", isActive: true },
  settings: { key: "siteName", value: "My Portfolio", updatedAt: "2024-01-01" },
  restore: { name: "Backup 2024-01-01", size: "2.4 GB", status: "available" },
  profile: { name: "Admin", email: "admin@example.com", image: "", bio: "Full-stack developer" },
};

const ANALYTICS_RESOURCES = ["analytics/traffic", "analytics/search", "analytics/visitors", "analytics/github", "analytics/ai"];

function getResourceKey(pathname: string): string {
  const parts = pathname.replace(/^\/api\/admin\//, "").split("/");
  // Handle nested paths like ai/prompts, analytics/traffic, security/sessions
  if (parts.length >= 2 && (parts[0] === "ai" || parts[0] === "analytics" || parts[0] === "security" || parts[0] === "system")) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0];
}

function generateItems(key: string, count = 15): Record<string, unknown>[] {
  const defaults = RESOURCE_DEFAULTS[key] || { name: `Item` };
  return Array.from({ length: count }, (_, i) => ({
    _id: `mock_${key}_${i + 1}`,
    ...Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, typeof v === "string" ? `${v} ${i + 1}` : v])),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
  }));
}

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const key = getResourceKey(pathname);

  if (ANALYTICS_RESOURCES.includes(key)) {
    return NextResponse.json({
      data: Array.from({ length: 30 }, (_, i) => ({
        _id: `analytics_${i}`,
        metric: ["Page Views", "Unique Visitors", "Bounce Rate", "Avg Session"][i % 4],
        value: String([1500, 850, "32%", "4m 12s"][i % 4]),
        change: ["+12%", "-3%", "+5%", "-1%"][i % 4],
        date: new Date(Date.now() - i * 86400000).toISOString(),
      })),
      total: 30,
      success: true,
    });
  }

  const items = generateItems(key);
  const search = request.nextUrl.searchParams.get("search")?.toLowerCase();
  const filtered = search ? items.filter((item) =>
    Object.values(item).some((v) => String(v).toLowerCase().includes(search))
  ) : items;

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
    totalCount: filtered.length,
    count: filtered.length,
    success: true,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const pathname = request.nextUrl.pathname;
  const key = getResourceKey(pathname);

  const id = `mock_${key}_${Date.now()}`;
  return NextResponse.json({
    success: true,
    data: { _id: id, ...body, createdAt: new Date().toISOString() },
    message: `${key} created successfully`,
  }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({
    success: true,
    data: { ...body, updatedAt: new Date().toISOString() },
    message: "Updated successfully",
  });
}

export async function DELETE(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.endsWith("/bulk")) {
    return NextResponse.json({ success: true, message: "Bulk action completed" });
  }
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}
