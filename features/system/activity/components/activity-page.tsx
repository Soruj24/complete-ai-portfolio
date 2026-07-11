"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, History, Plus, Edit3, Trash2, LogIn, LogOut, Download, Settings2, Filter, Loader2 } from "lucide-react";
import type { ActivityEntry } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const TYPE_ICONS: Record<string, typeof Plus> = { create: Plus, update: Edit3, delete: Trash2, login: LogIn, logout: LogOut, export: Download, settings: Settings2 };
const TYPE_COLORS: Record<string, string> = { create: "text-success", update: "text-accent", delete: "text-error", login: "text-accent", logout: "text-warning", export: "text-accent", settings: "text-text-secondary" };

export function ActivityPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "activity-log" });
  const items = response?.data ?? [];

  const filtered = items.filter((a: ActivityEntry) => {
    if (search) { const q = search.toLowerCase(); if (!a.user.toLowerCase().includes(q) && !a.action.toLowerCase().includes(q)) return false; }
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Activity History</h1><p className="text-sm text-text-tertiary">Track all user actions across the system</p></div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search activity..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1 overflow-x-auto">
          {["all", "create", "update", "delete", "login", "logout", "export", "settings"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium capitalize ${typeFilter === t ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
            <History size={40} className="mb-3 opacity-40" />
            <p className="font-medium">No activity found</p>
          </div>
        ) : (
          <div className="divide-y divide-border-primary max-h-[600px] overflow-y-auto">
            {filtered.map((a: ActivityEntry, i: number) => {
              const Icon = TYPE_ICONS[a.type];
              return (
                <motion.div key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }}
                  className="flex items-start gap-3 p-3 hover:bg-surface-hover transition-colors">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-hover ${TYPE_COLORS[a.type]}`}><Icon size={14} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary"><span className="font-medium">{a.user}</span> {a.action}</p>
                    <p className="text-xs text-text-tertiary">{new Date(a.timestamp).toLocaleString()} · {a.ip}</p>
                  </div>
                  <span className="rounded-md bg-surface-hover px-2 py-0.5 text-[10px] font-medium capitalize text-text-secondary">{a.type}</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
