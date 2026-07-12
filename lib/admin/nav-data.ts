import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, FolderKanban, Code2, Briefcase, GraduationCap, Award, Star,
  MessageSquare, FileText, Users2, Shield, BarChart3, Brain, Settings2,
  BookOpen, Image, Download, Mail, Newspaper,
  UserCog, LockKeyhole, Activity, SearchIcon, Map, ScrollText, History,
  Bell, Palette, Link2, Key, Database, RefreshCw, Server, Webhook,
  MessageCircle, Sparkles, Library, Workflow, Cable, Phone,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      { label: "Command Center", icon: LayoutDashboard, href: "/admin/dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Projects", icon: FolderKanban, href: "/admin/projects" },
      { label: "Categories", icon: FolderKanban, href: "/admin/project-categories" },
      { label: "Tags", icon: FolderKanban, href: "/admin/project-tags" },
      { label: "Skills", icon: Code2, href: "/admin/skills" },
      { label: "Experience", icon: Briefcase, href: "/admin/experience" },
      { label: "Education", icon: GraduationCap, href: "/admin/education" },
      { label: "Certificates", icon: Award, href: "/admin/certificates" },
      { label: "Achievements", icon: Star, href: "/admin/achievements" },
      { label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
      { label: "Blogs", icon: BookOpen, href: "/admin/blogs" },
      { label: "Blog Categories", icon: BookOpen, href: "/admin/blog-categories" },
      { label: "Media Library", icon: Image, href: "/admin/media" },
      { label: "Resume", icon: FileText, href: "/admin/resume" },
      { label: "Downloads", icon: Download, href: "/admin/downloads" },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", icon: Mail, href: "/admin/messages" },
      { label: "Contact Requests", icon: MessageCircle, href: "/admin/contact-requests" },
      { label: "Newsletter", icon: Newspaper, href: "/admin/newsletter" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Users", icon: Users2, href: "/admin/users" },
      { label: "Roles", icon: Shield, href: "/admin/roles" },
      { label: "Permissions", icon: LockKeyhole, href: "/admin/permissions" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Traffic", icon: Activity, href: "/admin/analytics/traffic" },
      { label: "Search Analytics", icon: SearchIcon, href: "/admin/analytics/search" },
      { label: "Visitor Map", icon: Map, href: "/admin/analytics/visitors" },
      { label: "GitHub Stats", icon: BarChart3, href: "/admin/analytics/github" },
      { label: "AI Analytics", icon: Brain, href: "/admin/analytics/ai" },
    ],
  },
  {
    label: "System Logs",
    items: [
      { label: "System Logs", icon: ScrollText, href: "/admin/system/logs" },
      { label: "Activity History", icon: History, href: "/admin/system/activity" },
      { label: "Audit Logs", icon: UserCog, href: "/admin/system/audit" },
      { label: "Database Health", icon: Database, href: "/admin/system/database" },
      { label: "Storage", icon: Server, href: "/admin/system/storage" },
    ],
  },
  {
    label: "AI",
    items: [
      { label: "AI Settings", icon: Brain, href: "/admin/ai/settings" },
      { label: "Prompt Library", icon: Library, href: "/admin/ai/prompts" },
      { label: "LLM Providers", icon: Sparkles, href: "/admin/ai/providers" },
      { label: "Embeddings", icon: Database, href: "/admin/ai/embeddings" },
      { label: "Vector Database", icon: Database, href: "/admin/ai/vector-db" },
      { label: "Workflows", icon: Workflow, href: "/admin/ai/workflows" },
      { label: "MCP Servers", icon: Cable, href: "/admin/ai/mcp" },
      { label: "WebRTC", icon: Phone, href: "/admin/webrtc" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Profile", icon: UserCog, href: "/admin/profile" },
      { label: "SEO", icon: SearchIcon, href: "/admin/seo" },
      { label: "Appearance", icon: Palette, href: "/admin/appearance" },
      { label: "Themes", icon: Palette, href: "/admin/appearance/themes" },
      { label: "Integrations", icon: Link2, href: "/admin/integrations" },
      { label: "API Keys", icon: Key, href: "/admin/api-keys" },
      { label: "Environment", icon: Server, href: "/admin/environment" },
      { label: "Backup", icon: Database, href: "/admin/system/backup" },
      { label: "Restore", icon: RefreshCw, href: "/admin/system/restore" },
      { label: "Notifications", icon: Bell, href: "/admin/notifications" },
      { label: "General", icon: Settings2, href: "/admin/settings/general" },
      { label: "Security", icon: LockKeyhole, href: "/admin/security" },
      { label: "Sessions", icon: Activity, href: "/admin/security/sessions" },
      { label: "Login History", icon: History, href: "/admin/security/login-history" },
    ],
  },
];
