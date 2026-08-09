"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border-subtle bg-surface transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[240px]",
      )}
    >
      {/* Logo */}
      <div className="flex h-12 items-center gap-2.5 border-b border-border-subtle px-3 shrink-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground text-xs font-bold">
          A
        </div>
        {!collapsed && (
          <span className="text-[13px] font-semibold text-text-primary tracking-[-0.01em] truncate">
            Admin Hub
          </span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-2 px-2">
        {navSections.map((section) => (
          <div key={section.label} className="mb-3">
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-medium text-text-tertiary uppercase tracking-[0.1em]">
                {section.label}
              </p>
            )}
            <div className="space-y-px">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150",
                      collapsed && "justify-center px-2",
                      active
                        ? "bg-accent/10 text-accent"
                        : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="relative z-10 h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <span className="relative z-10 truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge !== undefined && (
                      <span className="relative z-10 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent/10 px-1 text-[9px] font-bold text-accent">
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

      {/* Collapse toggle */}
      <div className="border-t border-border-subtle p-2 shrink-0">
        <button
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <><ChevronLeft className="h-3.5 w-3.5" /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
