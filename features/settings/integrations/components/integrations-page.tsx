"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Link2, Wifi, WifiOff, AlertTriangle, RefreshCw, Github, Cloud, Mail, Database, MessageCircle, FileText, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Integration } from "../types";

const ICON_MAP: Record<string, LucideIcon> = { Github, Cloud, Mail, Database, MessageCircle, FileText, Camera };

const MOCK: Integration[] = [
  { id: "int-1", name: "GitHub", description: "Sync repositories and commits", icon: "Github", category: "Development", status: "connected", lastSync: "2026-07-05 14:30", color: "#333" },
  { id: "int-2", name: "Google Analytics", description: "Track website traffic and metrics", icon: "Mail", category: "Analytics", status: "connected", lastSync: "2026-07-05 14:25", color: "#4285f4" },
  { id: "int-3", name: "Mailchimp", description: "Email newsletter campaigns", icon: "Mail", category: "Marketing", status: "connected", lastSync: "2026-07-04 10:00", color: "#ffe01b" },
  { id: "int-4", name: "Supabase", description: "Database and authentication", icon: "Database", category: "Backend", status: "connected", lastSync: "2026-07-05 14:28", color: "#3ecf8e" },
  { id: "int-5", name: "Slack", description: "Notifications and alerts", icon: "MessageCircle", category: "Communication", status: "disconnected", color: "#4a154b" },
  { id: "int-6", name: "Sentry", description: "Error tracking and monitoring", icon: "AlertTriangle", category: "Monitoring", status: "error", lastSync: "2026-07-04 08:15", color: "#fb5f40" },
  { id: "int-7", name: "Cloudinary", description: "Media upload and optimization", icon: "Camera", category: "Media", status: "connected", lastSync: "2026-07-05 13:00", color: "#3448c5" },
  { id: "int-8", name: "OpenAI", description: "AI models and embeddings", icon: "Database", category: "AI", status: "connected", lastSync: "2026-07-05 14:29", color: "#10a37f" },
];

const STATUS_STYLE: Record<string, string> = { connected: "bg-success/10 text-success", disconnected: "bg-surface-hover text-text-tertiary", error: "bg-error/10 text-error" };
const STATUS_ICON: Record<string, LucideIcon> = { connected: Wifi, disconnected: WifiOff, error: AlertTriangle };

export function IntegrationsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK.filter((i) => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()));

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
