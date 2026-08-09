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
          "pt-12 min-h-screen transition-all duration-200",
          collapsed ? "pl-[60px]" : "pl-[240px]",
        )}
      >
        <div className="p-5 md:p-6 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
