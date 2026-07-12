"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

export function getAlertColor(severity: string) {
  const colors: Record<string, string> = {
    critical: "text-error bg-error/10 border-error/20",
    high: "text-warning bg-warning/10 border-warning/20",
    medium: "text-accent bg-accent/10 border-accent/20",
    low: "text-info bg-info/10 border-info/20",
    info: "text-text-tertiary bg-surface-hover border-border-subtle",
  };
  return colors[severity] || colors.info;
}

export function useSecurityQuery<T = any>(resource: string): { data: T; loading: boolean } {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource });
  return { data: (response?.data ?? {}) as T, loading: isLoading };
}

interface TabDef {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SecurityInnerTabs({ tabs, children, value, onValueChange }: {
  tabs: TabDef[];
  children: ReactNode;
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="space-y-4">
      <TabsList className="bg-surface-hover p-0.5 rounded-xl flex-wrap">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}
            className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm"
          >
            <tab.icon className="h-3.5 w-3.5" /> {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabsContent };
