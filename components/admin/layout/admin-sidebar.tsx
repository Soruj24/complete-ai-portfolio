"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSidebarCollapsed } from "@/lib/store/slices/ui-slice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navSections } from "@/lib/admin/nav-data";

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
