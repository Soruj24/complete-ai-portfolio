"use client";

import { motion } from "framer-motion";
import { Database, HardDrive, Activity, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";
import type { DbTable } from "../types";

const TABLES: DbTable[] = [
  { name: "users", rows: 12450, size: "24.5 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:30" },
  { name: "projects", rows: 8720, size: "18.2 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:30" },
  { name: "blogs", rows: 5630, size: "32.1 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:25" },
  { name: "messages", rows: 12400, size: "15.8 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:20" },
  { name: "media", rows: 3650, size: "2.1 GB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:15" },
  { name: "analytics", rows: 89200, size: "156.3 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:00" },
  { name: "sessions", rows: 2450, size: "4.2 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:28" },
  { name: "audit_logs", rows: 45600, size: "89.4 MB", engine: "InnoDB", collation: "utf8mb4_unicode_ci", updatedAt: "2026-07-05 14:29" },
];

const totalRows = TABLES.reduce((a, t) => a + t.rows, 0);

export function DatabasePage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Database Health</h1><p className="text-sm text-text-tertiary">Monitor database performance and table statistics</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Tables", value: TABLES.length.toString(), icon: Database, color: "text-accent", change: "—", up: true },
          { label: "Total Rows", value: totalRows.toLocaleString(), icon: HardDrive, color: "text-accent", change: "+2.3%", up: true },
          { label: "DB Size", value: "2.4 GB", icon: Activity, color: "text-warning", change: "+1.8%", up: true },
          { label: "Health", value: "98.7%", icon: CheckCircle, color: "text-success", change: "+0.2%", up: true },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-success" : "text-error"}`}>
                {s.change !== "—" && (s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}{s.change}
              </span>
            </div>
            <p className="text-xs text-text-tertiary">{s.label}</p>
            <p className="text-lg font-semibold text-text-primary">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
          <th className="p-3 font-medium">Table Name</th><th className="p-3 font-medium">Rows</th><th className="p-3 font-medium">Size</th><th className="p-3 font-medium">Engine</th><th className="p-3 font-medium">Collation</th><th className="p-3 font-medium">Last Updated</th>
        </tr></thead><tbody>
          {TABLES.map((t, i) => {
            const maxRows = TABLES[0].rows;
            return (
              <motion.tr key={t.name} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                <td className="p-3"><div className="flex items-center gap-2">
                  <Database size={14} className="text-accent" />
                  <span className="font-mono font-medium text-text-primary">{t.name}</span>
                </div></td>
                <td className="p-3"><div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-surface-hover"><div className="h-full rounded-full bg-accent" style={{ width: `${(t.rows / maxRows) * 100}%` }} /></div>
                  <span className="text-xs text-text-secondary">{t.rows.toLocaleString()}</span>
                </div></td>
                <td className="p-3 text-text-secondary text-xs">{t.size}</td>
                <td className="p-3 text-text-secondary text-xs">{t.engine}</td>
                <td className="p-3 text-text-tertiary text-[10px] font-mono">{t.collation}</td>
                <td className="p-3 text-xs text-text-tertiary">{t.updatedAt}</td>
              </motion.tr>
            );
          })}
        </tbody></table></div>
      </div>
    </div>
  );
}
