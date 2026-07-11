"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, RefreshCw, MessageCircle, TrendingUp, Users, DollarSign, CheckCircle2, XCircle, AlertTriangle, ArrowUpRight, Mail, Loader2 } from "lucide-react";
import type { ContactRequest } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  new: { color: "text-accent", bg: "bg-accent/10" },
  contacted: { color: "text-warning", bg: "bg-warning/10" },
  qualified: { color: "text-success", bg: "bg-success/10" },
  converted: { color: "text-success", bg: "bg-success/10" },
  closed: { color: "text-text-tertiary", bg: "bg-surface-hover" },
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-error bg-error/10",
  medium: "text-warning bg-warning/10",
  low: "text-text-tertiary bg-surface-hover",
};

export function ContactRequestsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "contact-requests" });
  const requests = (response?.data ?? []) as ContactRequest[];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    if (search) { const q = search.toLowerCase(); if (!r.name.toLowerCase().includes(q) && !r.email.toLowerCase().includes(q) && !r.message.toLowerCase().includes(q)) return false; }
    if (status !== "all" && r.status !== status) return false;
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const selectedReq = selected ? requests.find((r) => r.id === selected) : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center text-text-tertiary">
          <Mail size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No contact requests</p>
          <p className="text-xs">Contact requests will appear here once submitted</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Contact Requests</h1>
          <p className="text-sm text-text-tertiary">Manage incoming leads and inquiries</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-5">
        {[
          { label: "Total", value: requests.length, icon: Mail, color: "text-accent" },
          { label: "New", value: requests.filter((r) => r.status === "new").length, icon: AlertTriangle, color: "text-accent" },
          { label: "Contacted", value: requests.filter((r) => r.status === "contacted").length, icon: MessageCircle, color: "text-warning" },
          { label: "Qualified", value: requests.filter((r) => r.status === "qualified").length, icon: TrendingUp, color: "text-success" },
          { label: "Converted", value: requests.filter((r) => r.status === "converted").length, icon: DollarSign, color: "text-success" },
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search requests..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {["all", "new", "contacted", "qualified", "converted", "closed"].map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${status === s ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="space-y-2">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              onClick={() => setSelected(r.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-colors ${selected === r.id ? "border-accent/50 bg-accent/5" : "border-border-primary bg-surface-primary hover:border-border-hover"}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${r.status === "new" ? "bg-accent/20 text-accent" : "bg-surface-hover text-text-secondary"}`}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{r.name}</p>
                    <p className="text-xs text-text-tertiary">{r.email}{r.company ? ` · ${r.company}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_CONFIG[r.status].bg} ${STATUS_CONFIG[r.status].color}`}>{r.status}</span>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${PRIORITY_COLORS[r.priority]}`}>{r.priority}</span>
                </div>
              </div>
              <p className="text-xs text-text-tertiary line-clamp-2 ml-10">{r.message}</p>
              <div className="ml-10 mt-1 flex items-center gap-3 text-[10px] text-text-tertiary">
                <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                {r.budget && <span>{r.budget}</span>}
                <span>{r.source}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedReq ? (
          <div className="rounded-xl border border-border-primary bg-surface-primary p-5 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary">Request Details</h3>
              <button onClick={() => setSelected(null)} className="text-xs text-text-tertiary hover:text-text-primary">Close</button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">{selectedReq.name.charAt(0)}</div>
              <div>
                <p className="font-medium text-text-primary">{selectedReq.name}</p>
                <p className="text-xs text-text-tertiary">{selectedReq.email}</p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${STATUS_CONFIG[selectedReq.status].bg} ${STATUS_CONFIG[selectedReq.status].color}`}>{selectedReq.status}</span>
              <span className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${PRIORITY_COLORS[selectedReq.priority]}`}>{selectedReq.priority}</span>
              <span className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{selectedReq.source}</span>
            </div>
            {selectedReq.company && <p className="mb-1 text-xs"><span className="text-text-secondary">Company:</span> <span className="text-text-primary">{selectedReq.company}</span></p>}
            {selectedReq.phone && <p className="mb-1 text-xs"><span className="text-text-secondary">Phone:</span> <span className="text-text-primary">{selectedReq.phone}</span></p>}
            {selectedReq.budget && <p className="mb-1 text-xs"><span className="text-text-secondary">Budget:</span> <span className="text-text-primary">{selectedReq.budget}</span></p>}
            <p className="mb-4 text-xs"><span className="text-text-secondary">Received:</span> <span className="text-text-primary">{new Date(selectedReq.createdAt).toLocaleString()}</span></p>
            <div className="rounded-lg bg-surface-secondary p-3 mb-4">
              <p className="text-xs text-text-secondary">{selectedReq.message}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-accent px-3 py-2 text-xs text-white transition-colors hover:bg-accent-hover">
                <Mail size={12} className="inline mr-1" /> Reply
              </button>
              <button className="rounded-lg border border-border-primary px-3 py-2 text-xs text-text-secondary transition-colors hover:bg-surface-hover">
                <CheckCircle2 size={12} className="inline mr-1" /> Mark Contacted
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border-primary bg-surface-secondary py-20">
            <div className="text-center text-text-tertiary">
              <Mail size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">Select a request</p>
              <p className="text-xs">Click a request to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
