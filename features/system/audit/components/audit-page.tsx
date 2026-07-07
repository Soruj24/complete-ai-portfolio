"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, AlertTriangle, Info, Filter } from "lucide-react";
import type { AuditEntry } from "../types";

const MOCK: AuditEntry[] = Array.from({ length: 40 }, (_, i) => {
  const actions = ["Updated project settings", "Changed user role", "Deleted media file", "Modified permissions", "Created API key", "Exported user data", "Changed system settings", "Revoked access"];
  const severities: AuditEntry["severity"][] = ["info", "info", "info", "warning", "warning", "critical"];
  return {
    id: `aud-${i + 1}`, user: ["admin", "manager", "editor"][i % 3],
    action: actions[i % actions.length],
    resource: ["Project", "User", "Media", "Role", "API Key", "Settings"][i % 6],
    resourceId: `#${(1000 + i).toString()}`,
    changes: `Changed ${["name", "status", "role", "visibility", "permissions"][i % 5]}`,
    severity: severities[i % severities.length],
    timestamp: new Date(2026, 6, 1 + Math.floor(i / 2), 9 + (i % 8), (i * 13) % 60).toISOString(),
    ip: `10.0.0.${(i % 200) + 1}`,
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

const SEV_STYLE: Record<string, string> = { info: "bg-accent/10 text-accent", warning: "bg-warning/10 text-warning", critical: "bg-error/10 text-error" };
const SEV_ICONS: Record<string, typeof Shield> = { info: Info, warning: AlertTriangle, critical: Shield };

export function AuditPage() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");

  const filtered = MOCK.filter((a) => {
    if (search) { const q = search.toLowerCase(); if (!a.user.toLowerCase().includes(q) && !a.action.toLowerCase().includes(q) && !a.resource.toLowerCase().includes(q)) return false; }
    if (severity !== "all" && a.severity !== severity) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Audit Logs</h1><p className="text-sm text-text-tertiary">Security and compliance audit trail</p></div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Events", value: MOCK.length, icon: Shield, color: "text-accent", sev: "all" },
          { label: "Warnings", value: MOCK.filter((a) => a.severity === "warning").length, icon: AlertTriangle, color: "text-warning", sev: "warning" },
          { label: "Critical", value: MOCK.filter((a) => a.severity === "critical").length, icon: Shield, color: "text-error", sev: "critical" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4 cursor-pointer" onClick={() => setSeverity(s.sev)}>
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
          <input type="text" placeholder="Search audit logs..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {["all", "info", "warning", "critical"].map((s) => (
            <button key={s} onClick={() => setSeverity(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${severity === s ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
          <th className="p-3 font-medium">User</th><th className="p-3 font-medium">Action</th><th className="p-3 font-medium">Resource</th><th className="p-3 font-medium">Changes</th><th className="p-3 font-medium">Severity</th><th className="p-3 font-medium">Timestamp</th><th className="p-3 font-medium">IP</th>
        </tr></thead><tbody>
          {filtered.map((a, i) => {
            const SevIcon = SEV_ICONS[a.severity];
            return (
              <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }}
                className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                <td className="p-3 font-medium text-text-primary">{a.user}</td>
                <td className="p-3 text-text-secondary text-xs">{a.action}</td>
                <td className="p-3 text-text-secondary text-xs">{a.resource} {a.resourceId}</td>
                <td className="p-3 text-text-tertiary text-xs">{a.changes}</td>
                <td className="p-3"><span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${SEV_STYLE[a.severity]}`}><SevIcon size={10} />{a.severity}</span></td>
                <td className="p-3 text-xs text-text-tertiary">{new Date(a.timestamp).toLocaleString()}</td>
                <td className="p-3 text-xs text-text-tertiary font-mono">{a.ip}</td>
              </motion.tr>
            );
          })}
        </tbody></table></div>
      </div>
    </div>
  );
}
