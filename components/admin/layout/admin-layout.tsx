"use client";

import type { ReactNode } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { CommandPalette } from "../command-palette";
import { NotificationCenter } from "../notification-center";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: ReactNode }) {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <AdminTopbar />
      <CommandPalette />
      <NotificationCenter />

      <main
        className={cn(
          "pt-14 min-h-screen transition-all duration-300",
          collapsed ? "pl-[68px]" : "pl-60",
        )}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
