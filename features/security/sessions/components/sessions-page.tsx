"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Laptop, Globe, Clock, Shield, Trash2 } from "lucide-react";
import type { Session } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const DEVICE_ICONS: Record<string, typeof Monitor> = { Desktop: Monitor, Laptop, Mobile: Smartphone, Tablet: Smartphone };

export function SessionsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "sessions" });
  const items: Session[] = response?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-text-primary">Active Sessions</h1><p className="text-sm text-text-tertiary">Manage active user sessions</p></div>
        <div className="grid gap-4 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border-primary bg-surface-primary p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover" />
                <div className="space-y-1.5"><div className="h-3 w-16 rounded bg-surface-hover" /><div className="h-5 w-10 rounded bg-surface-hover" /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-border-primary bg-surface-primary p-4 animate-pulse">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover" />
              <div className="flex-1 space-y-1.5"><div className="h-4 w-24 rounded bg-surface-hover" /><div className="h-3 w-48 rounded bg-surface-hover" /><div className="h-3 w-40 rounded bg-surface-hover" /></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Active Sessions</h1><p className="text-sm text-text-tertiary">Manage active user sessions</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Sessions", value: items.length.toString(), icon: Globe, color: "text-accent" },
          { label: "Current Session", value: items.filter((s) => s.current).length.toString(), icon: Shield, color: "text-success" },
          { label: "Locations", value: [...new Set(items.map((s) => s.location))].length.toString(), icon: Globe, color: "text-accent" },
          { label: "Oldest", value: items.length ? Math.max(...items.map((s) => Math.floor((Date.now() - new Date(s.createdAt).getTime()) / (1000 * 60 * 60 * 24)))) + " days" : "—", icon: Clock, color: "text-warning" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-border-primary bg-surface-primary p-12 text-center">
          <Shield size={40} className="mx-auto mb-3 text-text-tertiary" />
          <p className="text-sm font-medium text-text-primary">No sessions found</p>
          <p className="text-xs text-text-tertiary mt-1">Active sessions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((s, i) => {
            const Icon = DEVICE_ICONS[s.device] || Monitor;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${s.current ? "border-accent/30 bg-accent/5" : "border-border-primary bg-surface-primary hover:border-border-hover"}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.current ? "bg-accent/20" : "bg-surface-hover"}`}>
                  <Icon size={20} className={s.current ? "text-accent" : "text-text-secondary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-text-primary">{s.browser}</p>
                    {s.current && <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">Current</span>}
                  </div>
                  <p className="text-xs text-text-tertiary">{s.device} · {s.os} · {s.location}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">IP: {s.ip} · Last active: {new Date(s.lastActive).toLocaleString()}</p>
                </div>
                <div className="text-right text-[10px] text-text-tertiary">
                  <p>Since {new Date(s.createdAt).toLocaleDateString()}</p>
                </div>
                {!s.current && (
                  <button className="rounded-md p-2 text-text-tertiary hover:bg-surface-hover hover:text-error transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
