"use client";

import { useState, type ReactNode } from "react";
import { AISidebar } from "./ai-sidebar";
import { cn } from "@/lib/utils";
import { Command, Bell } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNotificationsOpen } from "@/lib/store/slices/ui-slice";

export function AILayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector((s) => s.ui.unreadCount);

  return (
    <div className="min-h-screen bg-background">
      <AISidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Topbar */}
      <header
        className={cn(
          "fixed top-0 right-0 z-30 flex h-14 items-center gap-4 border-b border-border-subtle bg-background/80 backdrop-blur-xl px-4 transition-all duration-300",
          collapsed ? "left-[68px]" : "left-56",
        )}
      >
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link href="/admin/dashboard" className="hover:text-text-primary transition-colors">Admin</Link>
          <span>/</span>
          <span className="text-text-primary font-medium">AI Control Center</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <button className="flex h-8 items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 text-xs text-text-tertiary hover:border-border hover:text-text-secondary transition-all w-48">
            <Command className="h-3 w-3" />
            <span className="flex-1 text-left">Search AI settings...</span>
            <kbd className="flex h-5 items-center rounded border border-border-subtle bg-background px-1.5 text-[10px] font-medium text-text-tertiary">/</kbd>
          </button>
          <ModeToggle />
          <button onClick={() => dispatch(setNotificationsOpen(true))}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-surface hover:text-text-primary transition-colors">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main
        className={cn(
          "pt-14 min-h-screen transition-all duration-300",
          collapsed ? "pl-[68px]" : "pl-56",
        )}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
