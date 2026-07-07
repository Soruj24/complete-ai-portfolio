"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, Award, Star, TrendingUp, ExternalLink } from "lucide-react";
import { useAchievements } from "../hooks/use-achievements";
import { AchievementFormDialog } from "./achievement-form-dialog";

export function AchievementsPage() {
  const { filtered, loading, error, search, setSearch, category, setCategory, categories, refresh, addAchievement } = useAchievements();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load achievements</p>
      <button onClick={refresh} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Achievements</h1>
          <p className="text-sm text-text-tertiary">Showcase your accomplishments and recognition</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Achievement
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: filtered.length, icon: Award, color: "text-accent" },
          { label: "Featured", value: filtered.filter((a) => a.featured).length, icon: Star, color: "text-warning" },
          { label: "Categories", value: [...new Set(filtered.map((a) => a.category))].length, icon: TrendingUp, color: "text-success" },
          { label: "With Links", value: filtered.filter((a) => a.url).length, icon: ExternalLink, color: "text-accent" },
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
          <input type="text" placeholder="Search achievements..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          <button onClick={() => setCategory("all")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${category === "all" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>All</button>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${category === c ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{c}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Award size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No achievements found</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((ach, i) => (
            <motion.div key={ach.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent">
                    <Award size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{ach.title}</h3>
                    <p className="text-xs text-text-tertiary">{ach.issuer} · {new Date(ach.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {ach.featured && <span className="rounded-md bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">Featured</span>}
                  {ach.url && (
                    <a href={ach.url} target="_blank" rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-accent group-hover:opacity-100">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-text-tertiary ml-[52px]">{ach.description}</p>
              <div className="ml-[52px] mt-2">
                <span className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{ach.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <AchievementFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addAchievement(d); }} />
    </div>
  );
}
