"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollText, Search, Filter, Download, RefreshCw, Terminal, AlertTriangle, XCircle, Info, Loader2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

type LogLevel = "info" | "warn" | "error" | "debug";
type LogSource = "system" | "api" | "database" | "auth" | "cron" | "email";

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: LogSource;
  message: string;
  details?: string;
  ip?: string;
  userId?: string;
}

const LEVEL_CONFIG: Record<LogLevel, { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: "text-accent", bg: "bg-accent/10" },
  warn: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  error: { icon: XCircle, color: "text-error", bg: "bg-error/10" },
  debug: { icon: Terminal, color: "text-text-tertiary", bg: "bg-surface-hover" },
};

const SOURCES: LogSource[] = ["system", "api", "database", "auth", "cron", "email"];

export function LogsPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LogLevel | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<LogSource | "all">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "logs" });
  const items = response?.data ?? [];

  const filtered = useMemo(() => {
    let result = items;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l: LogEntry) => l.message.toLowerCase().includes(q) || l.id.includes(q));
    }
    if (levelFilter !== "all") result = result.filter((l: LogEntry) => l.level === levelFilter);
    if (sourceFilter !== "all") result = result.filter((l: LogEntry) => l.source === sourceFilter);
    return result;
  }, [items, search, levelFilter, sourceFilter]);

  const errorCount = items.filter((l: LogEntry) => l.level === "error").length;
  const warnCount = items.filter((l: LogEntry) => l.level === "warn").length;

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">System Logs</h1>
            <p className="text-sm text-text-tertiary">Monitor system events and debug information</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-error/10 px-2.5 py-0.5 text-xs font-medium text-error">{errorCount} errors</span>
            <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">{warnCount} warnings</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-text-secondary">
            <span>Auto-refresh</span>
            <button onClick={() => setAutoRefresh(!autoRefresh)} className={`relative h-5 w-8 rounded-full transition-colors ${autoRefresh ? "bg-accent" : "bg-surface-hover"}`}>
              <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${autoRefresh ? "translate-x-[14px]" : "translate-x-0.5"}`} />
            </button>
          </label>
          <button className="flex items-center gap-1.5 rounded-lg border border-border-primary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent font-mono" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary p-0.5">
          {(["all", "info", "warn", "error", "debug"] as const).map((l) => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${levelFilter === l ? (l === "all" ? "bg-accent text-white" : `${LEVEL_CONFIG[l].bg} ${LEVEL_CONFIG[l].color}`) : "text-text-tertiary hover:text-text-primary"}`}>
              {l === "all" ? "All" : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as LogSource | "all")}
          className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-xs text-text-primary outline-none focus:border-accent">
          <option value="all">All Sources</option>
          {SOURCES.map((s) => (<option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>))}
        </select>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
            <ScrollText size={40} className="mb-3 opacity-40" />
            <p className="font-medium">No logs found</p>
          </div>
        ) : (
          <>
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-surface-primary">
                  <tr className="border-b border-border-primary text-left text-xs text-text-tertiary">
                    <th className="px-4 py-3 font-medium w-20">Level</th>
                    <th className="px-4 py-3 font-medium w-36">Timestamp</th>
                    <th className="px-4 py-3 font-medium w-24">Source</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                    <th className="px-4 py-3 font-medium w-32">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 200).map((log: LogEntry, i: number) => {
                    const cfg = LEVEL_CONFIG[log.level];
                    return (
                      <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.003 }}
                        className="border-b border-border-primary transition-colors hover:bg-surface-hover font-mono text-xs">
                        <td className="px-4 py-2">
                          <span className={`flex w-fit items-center gap-1 rounded px-1.5 py-0.5 font-medium ${cfg.bg} ${cfg.color}`}>
                            <cfg.icon size={10} />{log.level.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-text-tertiary whitespace-nowrap">{formatTime(log.timestamp)}</td>
                        <td className="px-4 py-2">
                          <span className="rounded bg-surface-hover px-1.5 py-0.5 text-text-secondary">{log.source}</span>
                        </td>
                        <td className="px-4 py-2 text-text-primary">{log.message}</td>
                        <td className="px-4 py-2 text-text-tertiary">
                          {log.ip && <span className="mr-2">IP: {log.ip}</span>}
                          {log.userId && <span>User: {log.userId}</span>}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border-primary px-4 py-2 text-xs text-text-tertiary">
              Showing {Math.min(filtered.length, 200)} of {filtered.length} entries
            </div>
          </>
        )}
      </div>
    </div>
  );
}
