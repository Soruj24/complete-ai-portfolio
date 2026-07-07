"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, LogIn, LogOut, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { LoginEntry } from "../types";

const MOCK: LoginEntry[] = Array.from({ length: 30 }, (_, i) => {
  const status = i < 24 ? "success" : "failed";
  return {
    id: `login-${i + 1}`, user: ["admin", "editor", "author", "manager"][i % 4],
    ip: `192.168.1.${(i % 200) + 1}`,
    location: ["New York, US", "London, UK", "Berlin, DE", "Tokyo, JP", "Toronto, CA"][i % 5],
    device: ["Desktop", "Laptop", "Mobile", "Tablet"][i % 4],
    browser: ["Chrome 125", "Firefox 128", "Safari 18", "Edge 125"][i % 4],
    status: status as "success" | "failed",
    timestamp: new Date(2026, 6, 1 + Math.floor(i / 2), 6 + (i % 14), (i * 11) % 60).toISOString(),
    reason: status === "failed" ? ["Invalid password", "Account locked", "2FA failed", "Session expired"][i % 4] : undefined,
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export function LoginHistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = MOCK.filter((l) => {
    if (search) { const q = search.toLowerCase(); if (!l.user.toLowerCase().includes(q) && !l.ip.toLowerCase().includes(q) && !l.location.toLowerCase().includes(q)) return false; }
    if (filter !== "all" && l.status !== filter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Login History</h1><p className="text-sm text-text-tertiary">Track authentication attempts</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Attempts", value: MOCK.length.toString(), icon: LogIn, color: "text-accent" },
          { label: "Successful", value: MOCK.filter((l) => l.status === "success").length.toString(), icon: CheckCircle, color: "text-success" },
          { label: "Failed", value: MOCK.filter((l) => l.status === "failed").length.toString(), icon: XCircle, color: "text-error" },
          { label: "Unique IPs", value: [...new Set(MOCK.map((l) => l.ip))].length.toString(), icon: Shield, color: "text-warning" },
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search login history..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {["all", "success", "failed"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${filter === s ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
          <th className="p-3 font-medium">User</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">IP</th><th className="p-3 font-medium">Location</th><th className="p-3 font-medium">Device</th><th className="p-3 font-medium">Browser</th><th className="p-3 font-medium">Timestamp</th><th className="p-3 font-medium">Reason</th>
        </tr></thead><tbody>
          {filtered.map((l, i) => (
            <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }}
              className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
              <td className="p-3 font-medium text-text-primary">{l.user}</td>
              <td className="p-3"><span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${l.status === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                {l.status === "success" ? <CheckCircle size={10} /> : <XCircle size={10} />}{l.status}</span></td>
              <td className="p-3 text-xs font-mono text-text-secondary">{l.ip}</td>
              <td className="p-3 text-xs text-text-secondary">{l.location}</td>
              <td className="p-3 text-xs text-text-tertiary">{l.device}</td>
              <td className="p-3 text-xs text-text-tertiary">{l.browser}</td>
              <td className="p-3 text-xs text-text-tertiary">{new Date(l.timestamp).toLocaleString()}</td>
              <td className="p-3 text-xs text-text-tertiary">{l.reason || "—"}</td>
            </motion.tr>
          ))}
        </tbody></table></div>
      </div>
    </div>
  );
}
