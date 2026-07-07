"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Laptop, Globe, Clock, Shield, Trash2 } from "lucide-react";
import type { Session } from "../types";

const MOCK: Session[] = [
  { id: "sess-1", device: "Desktop", browser: "Chrome 125", os: "Windows 11", ip: "192.168.1.42", location: "New York, US", lastActive: "2026-07-05 14:30", createdAt: "2026-01-15", current: true },
  { id: "sess-2", device: "Laptop", browser: "Firefox 128", os: "macOS 15", ip: "10.0.0.15", location: "Brooklyn, US", lastActive: "2026-07-04 09:15", createdAt: "2026-03-01", current: false },
  { id: "sess-3", device: "Mobile", browser: "Safari 18", os: "iOS 19", ip: "203.0.113.42", location: "London, UK", lastActive: "2026-07-03 22:00", createdAt: "2026-05-10", current: false },
  { id: "sess-4", device: "Tablet", browser: "Chrome 125", os: "Android 14", ip: "198.51.100.7", location: "Berlin, DE", lastActive: "2026-07-02 16:45", createdAt: "2026-06-01", current: false },
  { id: "sess-5", device: "Desktop", browser: "Edge 125", os: "Windows 11", ip: "192.168.1.100", location: "New York, US", lastActive: "2026-06-30 11:30", createdAt: "2026-04-20", current: false },
];

const DEVICE_ICONS: Record<string, typeof Monitor> = { Desktop: Monitor, Laptop, Mobile: Smartphone, Tablet: Smartphone };

export function SessionsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Active Sessions</h1><p className="text-sm text-text-tertiary">Manage active user sessions</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Sessions", value: MOCK.length.toString(), icon: Globe, color: "text-accent" },
          { label: "Current Session", value: MOCK.filter((s) => s.current).length.toString(), icon: Shield, color: "text-success" },
          { label: "Locations", value: [...new Set(MOCK.map((s) => s.location))].length.toString(), icon: Globe, color: "text-accent" },
          { label: "Oldest", value: "5 months", icon: Clock, color: "text-warning" },
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

      <div className="space-y-2">
        {MOCK.map((s, i) => {
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
    </div>
  );
}
