"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Plus, Database, Activity, Clock, HardDrive, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VectorDB {
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  vectors: string;
  dimensions: number;
  latency: string;
  uptime: string;
  size: string;
  endpoint: string;
}

const databases: VectorDB[] = [
  { name: "Pinecone Production", type: "Pinecone", status: "connected", vectors: "1.2M", dimensions: 3072, latency: "12ms", uptime: "99.9%", size: "2.4 GB", endpoint: "us-east-1-aws.pinecone.io" },
  { name: "Weaviate Staging", type: "Weaviate", status: "connected", vectors: "450K", dimensions: 1536, latency: "18ms", uptime: "99.7%", size: "890 MB", endpoint: "weaviate.staging.internal" },
  { name: "Qdrant Analytics", type: "Qdrant", status: "disconnected", vectors: "890K", dimensions: 1536, latency: "-", uptime: "-", size: "1.8 GB", endpoint: "qdrant.analytics.internal" },
  { name: "Chroma Local Dev", type: "Chroma", status: "error", vectors: "12K", dimensions: 768, latency: "45ms", uptime: "85.2%", size: "24 MB", endpoint: "localhost:8000" },
];

const statusConfig = {
  connected: { icon: Wifi, color: "text-success", bg: "bg-success/10", label: "Connected" },
  disconnected: { icon: WifiOff, color: "text-text-tertiary", bg: "bg-surface-hover", label: "Disconnected" },
  error: { icon: WifiOff, color: "text-error", bg: "bg-error/10", label: "Error" },
};

export default function VectorDBPage() {
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

      <div className="grid gap-4">
        {databases.map((db, i) => {
          const status = statusConfig[db.status];
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
    </div>
  );
}
