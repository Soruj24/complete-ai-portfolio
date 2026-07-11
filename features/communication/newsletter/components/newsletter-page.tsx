"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Mail, MousePointerClick, AlertTriangle, Send, Plus, Trash2, Loader2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import type { Subscriber, Campaign } from "../types";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-success/10 text-success", unsubscribed: "bg-warning/10 text-warning",
  bounced: "bg-error/10 text-error", spam: "bg-error/10 text-error",
};

export function NewsletterPage() {
  const [tab, setTab] = useState<"subscribers" | "campaigns">("subscribers");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "newsletter" });
  const items = response?.data ?? [];
  const subscribers: Subscriber[] = items.filter((i: Record<string, unknown>) => "email" in i && "status" in i) as Subscriber[];
  const campaigns: Campaign[] = items.filter((i: Record<string, unknown>) => "subject" in i && "recipients" in i) as Campaign[];

  const filteredSubscribers = subscribers.filter((s) => {
    if (search && !s.email.toLowerCase().includes(search.toLowerCase()) && !(s.name || "").toLowerCase().includes(search.toLowerCase())) return false;
    if (filter !== "all" && s.status !== filter) return false;
    return true;
  });

  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const sentCampaigns = campaigns.filter(c => c.status === "sent");
  const avgOpenRate = sentCampaigns.length > 0 ? Math.round(sentCampaigns.reduce((a, c) => a + c.opened / c.recipients, 0) / sentCampaigns.length * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary">Newsletter</h1><p className="text-sm text-text-tertiary">Manage subscribers and campaigns</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover"><Plus size={14} /> New Campaign</button>
          <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover"><Send size={14} /> Send Newsletter</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Subscribers", value: subscribers.length, icon: Users, color: "text-accent" },
          { label: "Active", value: activeCount, icon: Mail, color: "text-success" },
          { label: "Avg. Open Rate", value: `${avgOpenRate}%`, icon: MousePointerClick, color: "text-accent" },
          { label: "Bounced/Spam", value: subscribers.filter((s) => s.status === "bounced" || s.status === "spam").length, icon: AlertTriangle, color: "text-error" },
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

      <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1 w-fit">
        {(["subscribers", "campaigns"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-xs font-medium capitalize transition-colors ${tab === t ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{t}</button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : tab === "subscribers" ? (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input type="text" placeholder="Search subscribers..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
            </div>
            <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
              {["all", "active", "unsubscribed", "bounced", "spam"].map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${filter === s ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
              <th className="p-3 font-medium">Email</th><th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Source</th><th className="p-3 font-medium">Subscribed</th><th className="p-3 font-medium">Campaigns</th><th className="p-3 font-medium">Last Opened</th><th className="p-3 font-medium w-12"></th>
            </tr></thead><tbody>
              {filteredSubscribers.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                  className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                  <td className="p-3 text-text-primary font-medium">{s.email}</td>
                  <td className="p-3 text-text-secondary">{s.name || "—"}</td>
                  <td className="p-3"><span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_BADGE[s.status]}`}>{s.status}</span></td>
                  <td className="p-3 text-text-secondary text-xs">{s.source}</td>
                  <td className="p-3 text-text-secondary text-xs">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                  <td className="p-3 text-text-secondary">{s.campaignsReceived}</td>
                  <td className="p-3 text-text-secondary text-xs">{s.lastOpenedAt ? new Date(s.lastOpenedAt).toLocaleDateString() : "—"}</td>
                  <td className="p-3"><button className="text-text-tertiary hover:text-error transition-colors"><Trash2 size={14} /></button></td>
                </motion.tr>
              ))}
            </tbody></table></div>
          </div>
        </>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {campaigns.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border-primary bg-surface-primary p-4">
              <div className="flex items-start justify-between mb-3">
                <div><p className="font-medium text-text-primary">{c.subject}</p>
                  <p className="text-xs text-text-tertiary">{c.status === "draft" ? "Draft" : `Sent ${new Date(c.sentAt).toLocaleDateString()}`}</p></div>
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${c.status === "draft" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>{c.status}</span>
              </div>
              {c.status === "sent" && (
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-lg bg-surface-secondary p-2"><p className="text-xs text-text-tertiary">Sent</p><p className="text-sm font-semibold text-text-primary">{c.recipients}</p></div>
                  <div className="rounded-lg bg-surface-secondary p-2"><p className="text-xs text-text-tertiary">Opened</p><p className="text-sm font-semibold text-success">{c.opened} ({(c.opened / c.recipients * 100).toFixed(0)}%)</p></div>
                  <div className="rounded-lg bg-surface-secondary p-2"><p className="text-xs text-text-tertiary">Clicked</p><p className="text-sm font-semibold text-accent">{c.clicked} ({(c.clicked / c.opened * 100).toFixed(0)}%)</p></div>
                  <div className="rounded-lg bg-surface-secondary p-2"><p className="text-xs text-text-tertiary">Bounced</p><p className="text-sm font-semibold text-error">{c.bounced}</p></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
