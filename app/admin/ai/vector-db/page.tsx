"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Database, Activity, Clock, HardDrive, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const statusConfig = {
  connected: { icon: Wifi, color: "text-success", bg: "bg-success/10", label: "Connected" },
  disconnected: { icon: WifiOff, color: "text-text-tertiary", bg: "bg-surface-hover", label: "Disconnected" },
  error: { icon: WifiOff, color: "text-error", bg: "bg-error/10", label: "Error" },
};

export default function VectorDBPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "ai/vector-db" });
  const databases = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Vector Database</h1>
          <p className="text-sm text-text-secondary mt-1">Manage vector database connections and indexes</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Database
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Vectors", value: "2.55M", icon: Database, color: "text-accent" },
          { label: "Storage Used", value: "5.1 GB", icon: HardDrive, color: "text-success" },
          { label: "Avg Query", value: "25ms", icon: Clock, color: "text-amber-500" },
          { label: "Queries/sec", value: "142", icon: Activity, color: "text-purple-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border-subtle bg-surface">
            <CardContent className="p-4">
              <stat.icon className={cn("h-4 w-4", stat.color)} />
              <p className="text-lg font-bold text-text-primary mt-2">{stat.value}</p>
              <p className="text-[10px] text-text-tertiary">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : databases.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-text-tertiary">No vector databases configured yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {databases.map((db: any, i: number) => {
            const status = statusConfig[db.status as keyof typeof statusConfig] ?? statusConfig.disconnected;
            const StatusIcon = status.icon;
            return (
              <motion.div key={db.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border-subtle bg-surface hover:border-border transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={cn("p-2.5 rounded-xl", status.bg)}>
                          <StatusIcon className={cn("h-5 w-5", status.color)} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-text-primary">{db.name}</h3>
                            <Badge className={cn("text-[9px] px-1.5 py-0 rounded-full border-0 font-medium", status.color, status.bg)}>{status.label}</Badge>
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">{db.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1.5 text-[11px] text-text-tertiary font-mono">
                            <span>{db.vectors} vectors</span>
                            <span>{db.dimensions}d</span>
                            <span>{db.size}</span>
                            <span>⚡ {db.latency}</span>
                            <span>📈 {db.uptime}</span>
                          </div>
                          <p className="text-[10px] text-text-tertiary/60 mt-1">{db.endpoint}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
