"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Database, Globe, Clock } from "lucide-react";

export function SystemStatusCard() {
  const items = [
    { label: "Database", value: "Connected", icon: Database, color: "bg-success" },
    { label: "Environment", value: "Production", icon: Globe, color: "bg-info" },
    { label: "Last Backup", value: "2 hours ago", icon: Clock, color: "bg-text-tertiary" },
  ];

  return (
    <Card className="border border-border-subtle rounded-xl shadow-none bg-surface">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-text-tertiary" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2.5">
              <item.icon className="h-3.5 w-3.5 text-text-tertiary" />
              <span className="text-xs text-text-secondary">{item.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-text-primary">{item.value}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
