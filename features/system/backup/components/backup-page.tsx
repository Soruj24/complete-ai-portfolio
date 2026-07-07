"use client";

import { motion } from "framer-motion";
import { Database, Download, Clock, CheckCircle, XCircle, Play, RefreshCw } from "lucide-react";
import type { BackupEntry } from "../types";

const MOCK: BackupEntry[] = [
  { id: "bak-1", name: "full-backup-2026-07-05", size: "2.4 GB", type: "full", status: "completed", tables: 12, createdAt: "2026-07-05 02:00", completedAt: "2026-07-05 02:15" },
  { id: "bak-2", name: "inc-backup-2026-07-05", size: "245 MB", type: "incremental", status: "completed", tables: 8, createdAt: "2026-07-05 06:00", completedAt: "2026-07-05 06:08" },
  { id: "bak-3", name: "inc-backup-2026-07-05", size: "210 MB", type: "incremental", status: "completed", tables: 8, createdAt: "2026-07-05 12:00", completedAt: "2026-07-05 12:07" },
  { id: "bak-4", name: "full-backup-2026-07-04", size: "2.3 GB", type: "full", status: "completed", tables: 12, createdAt: "2026-07-04 02:00", completedAt: "2026-07-04 02:14" },
  { id: "bak-5", name: "inc-backup-2026-07-04", size: "180 MB", type: "incremental", status: "completed", tables: 7, createdAt: "2026-07-04 18:00", completedAt: "2026-07-04 18:06" },
  { id: "bak-6", name: "full-backup-2026-07-03", size: "2.3 GB", type: "full", status: "completed", tables: 12, createdAt: "2026-07-03 02:00", completedAt: "2026-07-03 02:16" },
  { id: "bak-7", name: "scheduled-backup-nightly", size: "—", type: "full", status: "running", tables: 0, createdAt: "2026-07-06 02:00" },
];

const STATUS_STYLE: Record<string, string> = { completed: "bg-success/10 text-success", running: "bg-accent/10 text-accent", failed: "bg-error/10 text-error" };

export function BackupPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary">Backup</h1><p className="text-sm text-text-tertiary">Database backup management</p></div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover">
          <Play size={14} /> Run Backup
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Backups", value: MOCK.length.toString(), icon: Database, color: "text-accent" },
          { label: "Full Backups", value: MOCK.filter((b) => b.type === "full").length.toString(), icon: Download, color: "text-accent" },
          { label: "Latest Size", value: MOCK[0].size, icon: Clock, color: "text-warning" },
          { label: "Success Rate", value: `${Math.round((MOCK.filter((b) => b.status === "completed").length / MOCK.length) * 100)}%`, icon: CheckCircle, color: "text-success" },
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

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
          <th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Size</th><th className="p-3 font-medium">Tables</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Started</th><th className="p-3 font-medium">Completed</th>
        </tr></thead><tbody>
          {MOCK.map((b, i) => (
            <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
              <td className="p-3 font-medium text-text-primary font-mono text-xs">{b.name}</td>
              <td className="p-3"><span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${b.type === "full" ? "bg-accent/10 text-accent" : "bg-surface-hover text-text-secondary"}`}>{b.type}</span></td>
              <td className="p-3 text-xs text-text-secondary">{b.size}</td>
              <td className="p-3 text-text-secondary">{b.tables || "—"}</td>
              <td className="p-3"><span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_STYLE[b.status]}`}>
                {b.status === "running" ? <RefreshCw size={10} className="animate-spin" /> : b.status === "completed" ? <CheckCircle size={10} /> : <XCircle size={10} />}{b.status}</span></td>
              <td className="p-3 text-xs text-text-tertiary">{b.createdAt}</td>
              <td className="p-3 text-xs text-text-tertiary">{b.completedAt || "—"}</td>
            </motion.tr>
          ))}
        </tbody></table></div>
      </div>
    </div>
  );
}
