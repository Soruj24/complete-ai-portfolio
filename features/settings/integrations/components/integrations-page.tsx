"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Link2, Wifi, WifiOff, AlertTriangle, RefreshCw, Github, Cloud, Mail, Database, MessageCircle, FileText, Camera, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Integration } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const ICON_MAP: Record<string, LucideIcon> = { Github, Cloud, Mail, Database, MessageCircle, FileText, Camera };

const STATUS_STYLE: Record<string, string> = { connected: "bg-success/10 text-success", disconnected: "bg-surface-hover text-text-tertiary", error: "bg-error/10 text-error" };
const STATUS_ICON: Record<string, LucideIcon> = { connected: Wifi, disconnected: WifiOff, error: AlertTriangle };

export function IntegrationsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "integrations" });
  const items = (response?.data ?? []) as Integration[];
  const [search, setSearch] = useState("");

  const filtered = items.filter((i) => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center text-text-tertiary">
          <Link2 size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No integrations</p>
          <p className="text-xs">Integrations will appear here once configured</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Integrations</h1><p className="text-sm text-text-tertiary">Connect external services and tools</p></div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search integrations..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((int, i) => {
          const Icon = ICON_MAP[int.icon] || Link2;
          const StatusIcon = STATUS_ICON[int.status];
          return (
            <motion.div key={int.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-4 hover:border-border-hover transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${int.color}20` }}>
                    <Icon size={20} style={{ color: int.color }} />
                  </div>
                  <div><p className="font-medium text-text-primary">{int.name}</p><p className="text-xs text-text-tertiary">{int.category}</p></div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_STYLE[int.status]}`}>
                  <StatusIcon size={10} />{int.status}
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-3 line-clamp-2">{int.description}</p>
              <div className="flex items-center justify-between">
                {int.lastSync ? <span className="text-[10px] text-text-tertiary">Synced {int.lastSync}</span> : <span />}
                <button className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${int.status === "disconnected" ? "bg-accent text-white hover:bg-accent-hover" : "border border-border-primary text-text-secondary hover:bg-surface-hover"}`}>
                  {int.status === "disconnected" ? "Connect" : int.status === "error" ? <><RefreshCw size={10} className="inline mr-1" />Retry</> : "Configure"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
