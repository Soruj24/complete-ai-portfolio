"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSidebarCollapsed } from "@/lib/store/slices/ui-slice";
import {
  LayoutDashboard, FolderKanban, Code2, Briefcase, GraduationCap, Award, Star,
  MessageSquare, FileText, Users2, Shield, BarChart3, Brain, Settings2,
  ChevronLeft, ChevronRight, BookOpen, Image, Download, Mail, Newspaper,
  UserCog, LockKeyhole, Activity, SearchIcon, Map, ScrollText, History,
  Bell, Palette, Link2, Key, Database, RefreshCw, Server, Webhook,
  MessageCircle, Sparkles, Library, Workflow, Cable, Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavSection {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
}

const navSections: NavSection[] = [
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

export function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  const toggleCollapsed = useCallback(() => {
    dispatch(setSidebarCollapsed(!collapsed));
  }, [dispatch, collapsed]);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard" || pathname.startsWith("/admin/dashboard");
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border-subtle bg-background transition-all duration-300",
        collapsed ? "w-[68px]" : "w-60",
      )}
    >
      <div className="flex h-14 items-center gap-3 border-b border-border-subtle px-4 shrink-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm font-bold">
          A
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold text-text-primary truncate"
          >
            Admin Hub
          </motion.span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <p className="px-4 mb-1 text-[10px] font-semibold text-text-tertiary uppercase tracking-[0.15em]">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5 px-2">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      collapsed && "justify-center px-2",
                      active
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-lg bg-accent/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <item.icon className="relative z-10 h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <span className="relative z-10 truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge !== undefined && (
                      <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent/10 px-1.5 text-[9px] font-bold text-accent">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border-subtle p-3 shrink-0">
        <button
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
