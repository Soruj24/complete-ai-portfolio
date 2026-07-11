"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, Download, FileText, Archive, Image, Eye, EyeOff, BarChart3 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { toastSuccess } from "@/shared/utils/swal";
import { DownloadFormDialog } from "./download-form-dialog";

const CATEGORIES = ["all", "resume", "code", "document", "presentation", "other"];
const VISIBILITY_OPTS = ["all", "visible", "hidden"];

interface DownloadItem {
  id: string;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  category: string;
  downloads: number;
  visible: boolean;
  featured: boolean;
  url: string;
}

export function DownloadsPage() {
  const { data: response, isLoading, error, refetch } = useGetAdminResourceQuery({ resource: "downloads" });
  const downloads: DownloadItem[] = useMemo(() => (response?.data ?? []) as DownloadItem[], [response]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visibility, setVisibility] = useState<"all" | "visible" | "hidden">("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    return downloads.filter((d: DownloadItem) => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && d.category !== category) return false;
      if (visibility === "visible" && !d.visible) return false;
      if (visibility === "hidden" && d.visible) return false;
      return true;
    });
  }, [downloads, search, category, visibility]);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load downloads</p>
      <button onClick={() => refetch()} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Downloads</h1>
          <p className="text-sm text-text-tertiary">Manage downloadable files and resources</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> Upload File
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Files", value: filtered.length, icon: Download, color: "text-accent" },
          { label: "Visible", value: filtered.filter((d: DownloadItem) => d.visible).length, icon: Eye, color: "text-success" },
          { label: "Hidden", value: filtered.filter((d: DownloadItem) => !d.visible).length, icon: EyeOff, color: "text-error" },
          { label: "Total Downloads", value: filtered.reduce((s: number, d: DownloadItem) => s + d.downloads, 0).toLocaleString(), icon: BarChart3, color: "text-warning" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
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
          <input type="text" placeholder="Search downloads..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${category === c ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {VISIBILITY_OPTS.map((v) => (
            <button key={v} onClick={() => setVisibility(v as "all" | "visible" | "hidden")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${visibility === v ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{v}</button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_: unknown, i: number) => <div key={i} className="h-20 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Download size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No downloads found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((dl: DownloadItem, i: number) => (
            <motion.div key={dl.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
              className="group flex items-center gap-4 rounded-xl border border-border-primary bg-surface-primary p-4 transition-colors hover:border-accent/30"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${!dl.visible ? "bg-surface-hover text-text-tertiary" : "bg-accent/10 text-accent"}`}>
                {dl.fileType === "ZIP" ? <Archive size={18} /> : dl.fileType === "PNG" ? <Image size={18} /> : <FileText size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-medium ${dl.visible ? "text-text-primary" : "text-text-tertiary"}`}>{dl.name}</h3>
                  {dl.featured && <span className="rounded-md bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning">Featured</span>}
                  {!dl.visible && <span className="rounded-md bg-surface-hover px-1.5 py-0.5 text-[10px] text-text-tertiary">Hidden</span>}
                </div>
                <p className="text-xs text-text-tertiary line-clamp-1">{dl.description}</p>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-text-tertiary">
                  <span>{dl.fileType} · {dl.fileSize}</span>
                  <span>{dl.downloads.toLocaleString()} downloads</span>
                  <span className="capitalize">{dl.category}</span>
                </div>
              </div>
              <div className="shrink-0">
                <a href={dl.url} download
                  className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20">
                  <Download size={12} /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <DownloadFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d: Record<string, unknown>) => { await fetch("/api/admin/downloads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }); toastSuccess("Created!", "Download has been created."); refetch(); }} />
    </div>
  );
}
