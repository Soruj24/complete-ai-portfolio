"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, MessageSquare, Star, Quote, ExternalLink } from "lucide-react";
import { useTestimonials } from "../hooks/use-testimonials";
import { toastSuccess } from "@/shared/utils/swal";
import { TestimonialFormDialog } from "./testimonial-form-dialog";

export function TestimonialsPage() {
  const { filtered, loading, error, search, setSearch, rating, setRating, refresh, addTestimonial } = useTestimonials();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load testimonials</p>
      <button onClick={refresh} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Testimonials</h1>
          <p className="text-sm text-text-tertiary">Manage client and colleague recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Testimonial
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: filtered.length, icon: MessageSquare, color: "text-accent" },
          { label: "Featured", value: filtered.filter((t) => t.featured).length, icon: Star, color: "text-warning" },
          { label: "5-Star", value: filtered.filter((t) => t.rating === 5).length, icon: Star, color: "text-success" },
          { label: "Avg Rating", value: filtered.length ? (filtered.reduce((s, t) => s + t.rating, 0) / filtered.length).toFixed(1) : "0.0", icon: Quote, color: "text-accent" },
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
          <input type="text" placeholder="Search testimonials..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {[0, 5, 4, 3, 2, 1].map((r) => (
            <button key={r} onClick={() => setRating(r)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${rating === r ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
              {r === 0 ? "All" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <MessageSquare size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No testimonials found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
            >
              <Quote size={20} className="mb-2 text-accent/30" />
              <p className="text-sm text-text-primary leading-relaxed line-clamp-4">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className={j < t.rating ? "text-warning fill-warning" : "text-text-tertiary"} />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-tertiary">{t.role}, {t.company}</p>
                  </div>
                </div>
                {t.featured && <span className="rounded-md bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">Featured</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <TestimonialFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addTestimonial(d); toastSuccess("Created!", "Testimonial has been created."); }} />
    </div>
  );
}
