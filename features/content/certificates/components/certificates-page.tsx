"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, Award, ExternalLink, Calendar, Clock, Shield } from "lucide-react";
import { useCertificates } from "../hooks/use-certificates";
import { toastSuccess } from "@/shared/utils/swal";
import { PROVIDER_LABELS } from "../types";
import type { CertProvider } from "../types";
import { CertificateFormDialog } from "./certificate-form-dialog";

const PROV_OPTIONS: { value: CertProvider | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...Object.entries(PROVIDER_LABELS).map(([k, v]) => ({ value: k as CertProvider, label: v })),
];

export function CertificatesPage() {
  const { filtered, loading, error, search, setSearch, provider, setProvider, refresh, addCertificate } = useCertificates();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load certificates</p>
      <button onClick={refresh} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Certificates</h1>
          <p className="text-sm text-text-tertiary">Manage your professional certifications</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Certificate
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: filtered.length, icon: Award, color: "text-accent" },
          { label: "Providers", value: [...new Set(filtered.map((c) => c.provider))].length, icon: Shield, color: "text-success" },
          { label: "Active", value: filtered.filter((c) => !c.expiryDate || new Date(c.expiryDate) > new Date()).length, icon: Clock, color: "text-warning" },
          { label: "Expired", value: filtered.filter((c) => c.expiryDate && new Date(c.expiryDate) <= new Date()).length, icon: Calendar, color: "text-error" },
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
          <input type="text" placeholder="Search certificates..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {PROV_OPTIONS.map((o) => (
            <button key={o.value} onClick={() => setProvider(o.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${provider === o.value ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Award size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No certificates found</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Award size={18} />
                </div>
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-accent group-hover:opacity-100">
                  <ExternalLink size={14} />
                </a>
              </div>
              <h3 className="font-semibold text-text-primary line-clamp-2">{cert.name}</h3>
              <p className="mt-1 text-xs text-text-tertiary">{cert.providerLabel}</p>
              <p className="mt-1 line-clamp-2 text-xs text-text-tertiary">{cert.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {cert.skills.slice(0, 3).map((s) => (
                  <span key={s} className="rounded bg-surface-hover px-1.5 py-0.5 text-[10px] text-text-secondary">{s}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-text-tertiary">
                <span>Issued {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                {cert.expiryDate && <span>Expires {new Date(cert.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <CertificateFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addCertificate(d); toastSuccess("Created!", "Certificate has been created."); }} />
    </div>
  );
}
