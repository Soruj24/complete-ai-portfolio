"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Plus, Play, StopCircle, BarChart3, Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const models = [
  { name: "text-embedding-3-large", provider: "OpenAI", dimensions: 3072, cost: "$0.00013/1K tokens", status: "active", usage: "78%", latency: "45ms" },
  { name: "text-embedding-3-small", provider: "OpenAI", dimensions: 1536, cost: "$0.00002/1K tokens", status: "active", usage: "45%", latency: "32ms" },
  { name: "text-embedding-ada-002", provider: "OpenAI", dimensions: 1536, cost: "$0.00010/1K tokens", status: "deprecated", usage: "12%", latency: "52ms" },
  { name: "cohere-embed-multilingual-v3", provider: "Cohere", dimensions: 1024, cost: "$0.00006/1K tokens", status: "active", usage: "22%", latency: "68ms" },
];

export default function EmbeddingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Embeddings</h1>
          <p className="text-sm text-text-secondary mt-1">Manage embedding models and vector pipelines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-xl border-border-subtle text-xs gap-1">
            <BarChart3 className="h-3.5 w-3.5" /> Usage Analytics
          </Button>
          <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
            <Plus className="h-3.5 w-3.5" /> Deploy Model
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Models", value: "3", icon: Layers, color: "text-accent" },
          { label: "Total Embeddings", value: "2.4M", icon: Database, color: "text-success" },
          { label: "Avg Latency", value: "49ms", icon: Clock, color: "text-amber-500" },
          { label: "Monthly Cost", value: "$842", icon: BarChart3, color: "text-purple-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border-subtle bg-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
              <p className="text-lg font-bold text-text-primary mt-2">{stat.value}</p>
              <p className="text-[10px] text-text-tertiary">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Models */}
      <div className="grid gap-4">
        {models.map((model, i) => (
          <motion.div key={model.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className={cn("border-border-subtle bg-surface hover:border-border transition-all", model.status === "deprecated" && "opacity-60")}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-2.5 rounded-xl", model.status === "active" ? "bg-accent/10" : "bg-surface-hover")}>
                      <Database className={cn("h-5 w-5", model.status === "active" ? "text-accent" : "text-text-tertiary")} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-text-primary">{model.name}</h3>
                        <Badge variant="outline" className={cn(
                          "text-[9px] px-1.5 py-0 rounded-full border-0 font-medium",
                          model.status === "active" ? "text-success bg-success/10" : "text-text-tertiary bg-surface-hover border-border-subtle",
                        )}>
                          {model.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 text-[11px] text-text-tertiary font-mono">
                        <span>{model.provider}</span>
                        <span>{model.dimensions}d</span>
                        <span>{model.cost}</span>
                        <span>⚡ {model.latency}</span>
                      </div>
                      <div className="mt-3 w-48">
                        <div className="flex items-center justify-between text-[9px] text-text-tertiary mb-1">
                          <span>Usage</span>
                          <span>{model.usage}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-background overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", model.status === "active" ? "bg-accent" : "bg-text-tertiary/30")}
                            style={{ width: model.usage }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {model.status === "active" ? (
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <StopCircle className="h-4 w-4 text-text-tertiary" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Play className="h-4 w-4 text-text-tertiary" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
