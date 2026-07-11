"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Library, Plus, Search, Upload, FileText, Brain, Database, Link2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

export default function RAGPage() {
  const [search, setSearch] = useState("");
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "ai/rag" });
  const knowledgeBases = response?.data ?? [];

  const filtered = knowledgeBases.filter((kb: any) =>
    kb.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig = {
    indexed: { label: "Indexed", color: "text-success bg-success/10" },
    indexing: { label: "Indexing...", color: "text-accent bg-accent/10" },
    error: { label: "Error", color: "text-error bg-error/10" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Knowledge Base</h1>
          <p className="text-sm text-text-secondary mt-1">Manage RAG sources and embedding pipelines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-xl border-border-subtle text-xs gap-1">
            <RefreshCw className="h-3.5 w-3.5" /> Reindex All
          </Button>
          <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add Knowledge Base
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search knowledge bases..." className="pl-10 border-border-subtle bg-surface h-10 rounded-xl text-sm" />
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-text-tertiary">No knowledge bases found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map((kb: any, i: number) => {
            const status = statusConfig[kb.status as keyof typeof statusConfig] ?? statusConfig.error;
            return (
              <motion.div key={kb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border-subtle bg-surface hover:border-border transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={cn("p-2.5 rounded-xl", kb.status === "indexed" ? "bg-success/10" : kb.status === "indexing" ? "bg-accent/10" : "bg-error/10")}>
                          <Library className={cn("h-5 w-5", kb.status === "indexed" ? "text-success" : kb.status === "indexing" ? "text-accent" : "text-error")} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm text-text-primary">{kb.name}</h3>
                            <Badge className={cn("text-[9px] px-1.5 py-0 rounded-full border-0 font-medium", status.color)}>
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-text-tertiary mt-0.5">{kb.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-[10px] text-text-tertiary/60">
                            <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {kb.documents} docs</span>
                            <span className="flex items-center gap-1"><Database className="h-3 w-3" /> {kb.chunks?.toLocaleString()} chunks</span>
                            <span>{kb.size}</span>
                            <span className="flex items-center gap-1"><Brain className="h-3 w-3" /> {kb.embedding}</span>
                          </div>
                          {kb.status === "indexing" && (
                            <div className="mt-3 flex items-center gap-3">
                              <Progress value={kb.indexProgress} className="h-1.5 flex-1 bg-background [&>div]:bg-accent" />
                              <span className="text-[10px] font-mono text-text-tertiary">{kb.indexProgress}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                        <Upload className="h-4 w-4 text-text-tertiary" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Documents", value: "524", icon: FileText, color: "text-accent" },
          { label: "Total Chunks", value: "42,500", icon: Database, color: "text-success" },
          { label: "Vector Size", value: "153 MB", icon: Brain, color: "text-purple-500" },
          { label: "Active Connections", value: "4", icon: Link2, color: "text-info" },
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
    </div>
  );
}
