"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, RefreshCw, MessageCircle, TrendingUp, Users, DollarSign, CheckCircle2, XCircle, AlertTriangle, ArrowUpRight, Mail } from "lucide-react";
import type { ContactRequest } from "../types";

const MOCK: ContactRequest[] = [
  { id: "cr-1", name: "Alice Johnson", email: "alice@techcorp.com", phone: "+1-555-1234", company: "TechCorp Inc.", budget: "$50-100k", message: "We are looking for a senior full-stack developer for a 6-month contract building a customer analytics platform. Your portfolio aligns well with our needs.", status: "new", priority: "high", source: "Contact Form", createdAt: "2026-07-05T10:30:00Z" },
  { id: "cr-2", name: "Bob Smith", email: "bob@startup.io", company: "Startup.io", budget: "$20-50k", message: "Interested in discussing a potential collaboration on our MVP. We need a React + Node.js developer for approximately 3 months.", status: "new", priority: "medium", source: "Contact Form", createdAt: "2026-07-04T14:20:00Z" },
  { id: "cr-3", name: "Carol Davis", email: "carol@agency.com", phone: "+1-555-5678", company: "Digital Agency Co.", message: "We have several client projects that need your expertise. Looking for a long-term partnership arrangement.", status: "contacted", priority: "high", source: "LinkedIn", createdAt: "2026-07-02T09:15:00Z", respondedAt: "2026-07-03T11:00:00Z" },
  { id: "cr-4", name: "David Wilson", email: "david@enterprise.com", company: "Enterprise Solutions", budget: "$100k+", message: "Enterprise-level project requiring architectural consultation and implementation of a microservices migration.", status: "qualified", priority: "high", source: "Referral", createdAt: "2026-06-28T16:45:00Z" },
  { id: "cr-5", name: "Eve Martinez", email: "eve@growth.co", company: "Growth Co.", budget: "$10-20k", message: "Need help optimizing our Next.js application for better performance and SEO improvements.", status: "converted", priority: "medium", source: "Contact Form", createdAt: "2026-06-25T08:30:00Z", respondedAt: "2026-06-26T10:00:00Z" },
  { id: "cr-6", name: "Frank Lee", email: "frank@devshop.io", phone: "+1-555-9012", message: "Looking for a freelance developer for a short-term project building a landing page and basic CMS.", status: "closed", priority: "low", source: "Upwork", createdAt: "2026-06-20T11:00:00Z", respondedAt: "2026-06-21T09:00:00Z" },
  { id: "cr-7", name: "Grace Kim", email: "grace@ai-startup.com", company: "AI Startup Inc.", budget: "$50-100k", message: "We're building an AI-powered code assistant and need expertise in LangChain and vector databases.", status: "new", priority: "high", source: "GitHub", createdAt: "2026-07-05T07:00:00Z" },
  { id: "cr-8", name: "Henry Brown", email: "henry@edu.org", company: "University Research Lab", message: "Seeking consultation on setting up our research lab's data pipeline and visualization dashboard.", status: "contacted", priority: "medium", source: "Email", createdAt: "2026-06-30T13:00:00Z", respondedAt: "2026-07-01T15:00:00Z" },
  { id: "cr-9", name: "Iris Chang", email: "iris@market.co", company: "Marketing Co.", budget: "$5-10k", message: "Would like to hire you for a small website redesign project. Timeline is flexible.", status: "qualified", priority: "low", source: "Contact Form", createdAt: "2026-06-22T10:30:00Z" },
  { id: "cr-10", name: "Jack Taylor", email: "jack@scaleup.com", company: "ScaleUp Ltd.", budget: "$100k+", message: "Enterprise digital transformation project. Need a lead developer to architect and implement new platform.", status: "new", priority: "high", source: "LinkedIn", createdAt: "2026-07-05T12:00:00Z" },
];

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
  const [requests, setRequests] = useState(MOCK);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    if (search) { const q = search.toLowerCase(); if (!r.name.toLowerCase().includes(q) && !r.email.toLowerCase().includes(q) && !r.message.toLowerCase().includes(q)) return false; }
    if (status !== "all" && r.status !== status) return false;
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const selectedReq = selected ? requests.find((r) => r.id === selected) : null;

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
