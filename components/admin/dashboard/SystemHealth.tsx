"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Database, Cpu, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemStatus {
  mongodb: string;
  redis: string;
  cpu: string;
  memory: string;
  uptime: string;
}

const defaultStatus: SystemStatus = {
  mongodb: "checking...",
  redis: "checking...",
  cpu: "-",
  memory: "-",
  uptime: "-",
};

export function SystemHealth() {
  const [status, setStatus] = useState<SystemStatus>(defaultStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/admin/system-health");
        const data = await res.json();
        if (mounted) {
          setStatus({
            mongodb: data.mongodb || "disconnected",
            redis: data.redis || "disconnected",
            cpu: data.cpu || "-",
            memory: data.memory || "-",
            uptime: data.uptime || "-",
          });
        }
      } catch {
        if (mounted) setStatus((s) => ({ ...s, mongodb: "error", redis: "error" }));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const statusDot = (val: string) => {
    if (val === "connected" || val === "healthy") return "bg-success";
    if (val === "checking..." || val === "-") return "bg-text-tertiary/30";
    return "bg-error";
  };

  const items = [
    { label: "MongoDB", value: status.mongodb, icon: Database },
    { label: "CPU", value: status.cpu, icon: Cpu },
    { label: "Memory", value: status.memory, icon: Activity },
    { label: "Uptime", value: status.uptime, icon: Clock },
  ];

  return (
    <Card className="border border-border-subtle shadow-none rounded-xl bg-surface">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Activity className="h-4 w-4 text-text-tertiary" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 shimmer rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-surface-hover transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-text-tertiary" />
                  <span className="text-xs font-medium text-text-secondary">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-primary font-mono">{item.value}</span>
                  <span className={cn("h-2 w-2 rounded-full", statusDot(item.value))} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
