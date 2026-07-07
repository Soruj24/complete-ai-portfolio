"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Database, Clock, CheckCircle, AlertTriangle, RotateCcw, Search } from "lucide-react";
import type { RestorePoint } from "../types";

const MOCK: RestorePoint[] = [
  { id: "rst-1", backup: "full-backup-2026-07-05", size: "2.4 GB", createdAt: "2026-07-05 02:15", type: "full", verified: true },
  { id: "rst-2", backup: "inc-backup-2026-07-05", size: "245 MB", createdAt: "2026-07-05 06:08", type: "incremental", verified: true },
  { id: "rst-3", backup: "inc-backup-2026-07-05", size: "210 MB", createdAt: "2026-07-05 12:07", type: "incremental", verified: true },
  { id: "rst-4", backup: "full-backup-2026-07-04", size: "2.3 GB", createdAt: "2026-07-04 02:14", type: "full", verified: false },
  { id: "rst-5", backup: "full-backup-2026-07-03", size: "2.3 GB", createdAt: "2026-07-03 02:16", type: "full", verified: true },
];

export function RestorePage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = MOCK.filter((r) => !search || r.backup.toLowerCase().includes(search.toLowerCase()));

  const selectedPoint = filtered.find((r) => r.id === selected);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary">Restore</h1><p className="text-sm text-text-tertiary">Restore database from backup points</p></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Available", value: MOCK.length.toString(), icon: Database, color: "text-accent" },
          { label: "Verified", value: MOCK.filter((r) => r.verified).length.toString(), icon: CheckCircle, color: "text-success" },
          { label: "Full Backups", value: MOCK.filter((r) => r.type === "full").length.toString(), icon: RefreshCw, color: "text-accent" },
          { label: "Latest", value: new Date(MOCK[0].createdAt).toLocaleDateString(), icon: Clock, color: "text-warning" },
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

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="relative mb-3 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input type="text" placeholder="Search restore points..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
          </div>
          <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
            <table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
              <th className="p-3 font-medium">Backup</th><th className="p-3 font-medium">Type</th><th className="p-3 font-medium">Size</th><th className="p-3 font-medium">Verified</th><th className="p-3 font-medium">Date</th>
            </tr></thead><tbody>
              {filtered.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  onClick={() => setSelected(r.id)}
                  className={`border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors cursor-pointer ${selected === r.id ? "bg-accent/5" : ""}`}>
                  <td className="p-3 font-medium text-text-primary font-mono text-xs">{r.backup}</td>
                  <td className="p-3"><span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${r.type === "full" ? "bg-accent/10 text-accent" : "bg-surface-hover text-text-secondary"}`}>{r.type}</span></td>
                  <td className="p-3 text-xs text-text-secondary">{r.size}</td>
                  <td className="p-3">{r.verified ? <CheckCircle size={14} className="text-success" /> : <AlertTriangle size={14} className="text-warning" />}</td>
                  <td className="p-3 text-xs text-text-tertiary">{new Date(r.createdAt).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody></table>
          </div>
        </div>

        {selectedPoint ? (
          <div className="rounded-xl border border-border-primary bg-surface-primary p-5 h-fit sticky top-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Restore Point</h3>
            <div className="space-y-3 mb-4">
              <div><p className="text-xs text-text-tertiary">Backup</p><p className="text-xs font-mono text-text-primary">{selectedPoint.backup}</p></div>
              <div><p className="text-xs text-text-tertiary">Type</p><p className="text-xs font-medium text-text-primary capitalize">{selectedPoint.type}</p></div>
              <div><p className="text-xs text-text-tertiary">Size</p><p className="text-xs text-text-primary">{selectedPoint.size}</p></div>
              <div><p className="text-xs text-text-tertiary">Created</p><p className="text-xs text-text-primary">{new Date(selectedPoint.createdAt).toLocaleString()}</p></div>
              <div><p className="text-xs text-text-tertiary">Verified</p><p className="text-xs">{selectedPoint.verified ? <span className="text-success">Yes</span> : <span className="text-warning">No (verify recommended)</span>}</p></div>
            </div>
            <button className="w-full rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={14} /> Restore This Backup
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border-primary bg-surface-secondary">
            <div className="text-center text-text-tertiary py-16">
              <Database size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">Select a restore point</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
