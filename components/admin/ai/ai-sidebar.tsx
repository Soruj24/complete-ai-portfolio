"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Brain, Settings2, Sparkles, BookOpen, Play, MessageSquare, Library,
  Database, Network, Cable, Workflow, Radio, BarChart3, Server,
  ChevronLeft, ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
}

const sections: { label: string; items: NavItem[] }[] = [
  {
    label: "Control Center",
    items: [
      { label: "Overview", icon: Brain, href: "/admin/ai" },
      { label: "Model Settings", icon: Settings2, href: "/admin/ai/settings" },
      { label: "Providers", icon: Server, href: "/admin/ai/providers" },
    ],
  },
  {
    label: "Prompts",
    items: [
      { label: "Prompt Library", icon: BookOpen, href: "/admin/ai/prompts" },
      { label: "Playground", icon: Play, href: "/admin/ai/playground" },
    ],
  },
  {
    label: "Memory & RAG",
    items: [
      { label: "Chat History", icon: MessageSquare, href: "/admin/ai/memory" },
      { label: "Knowledge Base", icon: Library, href: "/admin/ai/rag" },
      { label: "Embeddings", icon: Database, href: "/admin/ai/embeddings" },
      { label: "Vector Database", icon: Network, href: "/admin/ai/vector-db" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { label: "MCP Servers", icon: Cable, href: "/admin/ai/mcp" },
      { label: "Workflows", icon: Workflow, href: "/admin/ai/workflows" },
      { label: "Streaming", icon: Radio, href: "/admin/ai/streaming" },
      { label: "SDK Config", icon: Sparkles, href: "/admin/ai/sdk" },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Analytics", icon: BarChart3, href: "/admin/ai/monitoring" },
    ],
  },
];

export function AISidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin/ai") return pathname === "/admin/ai";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border-subtle bg-background transition-all duration-300",
        collapsed ? "w-[68px]" : "w-56",
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center gap-3 border-b border-border-subtle px-4 shrink-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-accent text-white text-sm font-bold shadow-lg shadow-purple-500/20">
          AI
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-text-primary truncate">
            AI Control Center
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-3">
        {sections.map((section) => (
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
                        layoutId="ai-sidebar-active"
                        className="absolute inset-0 rounded-lg bg-accent/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <item.icon className="relative z-10 h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <span className="relative z-10 truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="relative z-10 flex h-5 items-center rounded-full bg-accent/10 px-1.5 text-[9px] font-bold text-accent">
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

      {/* Toggle */}
      <div className="border-t border-border-subtle p-3 shrink-0">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
