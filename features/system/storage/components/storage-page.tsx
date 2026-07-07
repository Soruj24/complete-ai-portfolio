"use client";

import { motion } from "framer-motion";
import { Server, HardDrive, FileText, Upload, Download, ArrowUp, ArrowDown } from "lucide-react";
import type { StorageBucket } from "../types";

const BUCKETS: StorageBucket[] = [
  { name: "media-uploads", type: "S3", files: 3650, used: 2.1, quota: 10, provider: "AWS", region: "us-east-1", color: "#ff9900" },
  { name: "backup-data", type: "S3 Glacier", files: 124, used: 8.4, quota: 50, provider: "AWS", region: "us-west-2", color: "#527fff" },
  { name: "static-assets", type: "CDN", files: 890, used: 0.8, quota: 5, provider: "CloudFront", region: "global", color: "#8b5cf6" },
  { name: "logs-archive", type: "S3", files: 12400, used: 3.2, quota: 20, provider: "AWS", region: "eu-west-1", color: "#06b6d4" },
  { name: "database-backups", type: "Local", files: 48, used: 12.5, quota: 100, provider: "Server", region: "local", color: "#10b981" },
];

const totalUsed = BUCKETS.reduce((a, b) => a + b.used, 0);
const totalQuota = BUCKETS.reduce((a, b) => a + b.quota, 0);
const totalFiles = BUCKETS.reduce((a, b) => a + b.files, 0);

export function StoragePage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Storage</h1><p className="text-sm text-text-tertiary">Monitor storage usage across providers</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Used", value: `${totalUsed.toFixed(1)} GB`, icon: HardDrive, color: "text-accent", change: "+1.2 GB", up: true },
          { label: "Total Quota", value: `${totalQuota} GB`, icon: Server, color: "text-accent", change: "—", up: true },
          { label: "Total Files", value: totalFiles.toLocaleString(), icon: FileText, color: "text-accent", change: "+245", up: true },
          { label: "Usage", value: `${((totalUsed / totalQuota) * 100).toFixed(1)}%`, icon: Upload, color: "text-warning", change: "+0.8%", up: true },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              {s.change !== "—" && <span className="flex items-center gap-0.5 text-xs font-medium text-success"><ArrowUp size={12} />{s.change}</span>}
            </div>
            <p className="text-xs text-text-tertiary">{s.label}</p>
            <p className="text-lg font-semibold text-text-primary">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Storage Buckets</h3>
        <div className="space-y-3">
          {BUCKETS.map((b, i) => {
            const pct = (b.used / b.quota) * 100;
            return (
              <motion.div key={b.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-border-primary bg-surface-secondary p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${b.color}20` }}>
                  <HardDrive size={18} style={{ color: b.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div><p className="text-sm font-medium text-text-primary">{b.name}</p><p className="text-xs text-text-tertiary">{b.type} · {b.provider} · {b.region}</p></div>
                    <span className="text-xs text-text-secondary">{b.files.toLocaleString()} files</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-surface-hover">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct > 80 ? "var(--color-error)" : pct > 50 ? "var(--color-warning)" : b.color }} />
                    </div>
                    <span className="text-xs text-text-secondary whitespace-nowrap">{b.used.toFixed(1)} GB / {b.quota} GB</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
