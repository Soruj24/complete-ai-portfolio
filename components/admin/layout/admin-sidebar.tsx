"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSidebarCollapsed } from "@/lib/store/slices/ui-slice";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import { navSections } from "@/lib/admin/nav-data";

export function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(navSections.map((s) => s.label))
  );
  const navRef = useRef<HTMLElement>(null);

  const toggleCollapsed = useCallback(() => {
    dispatch(setSidebarCollapsed(!collapsed));
  }, [dispatch, collapsed]);

  const toggleSection = useCallback((label: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Keyboard navigation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-nav-item]"));
      const currentIndex = links.findIndex((l) => l === document.activeElement);
      if (currentIndex === -1) return;

      e.preventDefault();
      const nextIndex = e.key === "ArrowDown"
        ? Math.min(currentIndex + 1, links.length - 1)
        : Math.max(currentIndex - 1, 0);
      links[nextIndex]?.focus();
    };

    nav.addEventListener("keydown", handleKeyDown);
    return () => nav.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border-subtle bg-surface transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]",
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex h-12 items-center gap-2 border-b border-border-subtle px-3 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground text-xs font-bold">
            A
          </div>
          {!collapsed && (
            <span className="text-[13px] font-semibold text-text-primary tracking-[-0.01em] truncate">
              Admin
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="flex-1 overflow-y-auto no-scrollbar py-2 px-2">
        {navSections.map((section) => {
          const isExpanded = expandedSections.has(section.label);
          return (
            <div key={section.label} className="mb-1">
              {/* Section header */}
              {collapsed ? (
                <div className="px-2 py-1.5">
                  <div className="h-px bg-border-subtle" />
                </div>
              ) : (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex w-full items-center justify-between px-2 py-1.5 text-[10px] font-medium text-text-tertiary uppercase tracking-[0.1em] hover:text-text-secondary transition-colors rounded"
                  aria-expanded={isExpanded}
                >
                  {section.label}
                  <ChevronsUpDown className="h-3 w-3 opacity-50" />
                </button>
              )}

              {/* Items */}
              {(collapsed || isExpanded) && (
                <div className="space-y-px">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        data-nav-item
                        className={cn(
                          "group relative flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 outline-none",
                          collapsed && "justify-center px-2",
                          active
                            ? "bg-accent/10 text-accent"
                            : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
                          "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-1 focus-visible:ring-offset-surface",
                        )}
                        title={collapsed ? item.label : undefined}
                        aria-current={active ? "page" : undefined}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full bg-accent" />
                        )}
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
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border-subtle p-2 shrink-0">
        <button
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <>
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
