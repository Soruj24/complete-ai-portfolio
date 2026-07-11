"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Globe, AlertTriangle, CheckCircle2, XCircle, Info, RefreshCw, Save, Code, Loader2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import type { SitemapEntry } from "../types";
import type { SeoPage } from "../types";

const SITEMAP: SitemapEntry[] = [
  { path: "/", priority: 1.0, changefreq: "weekly", lastModified: "2026-07-05" },
  { path: "/projects", priority: 0.9, changefreq: "weekly", lastModified: "2026-07-04" },
  { path: "/blog", priority: 0.8, changefreq: "daily", lastModified: "2026-07-05" },
  { path: "/about", priority: 0.7, changefreq: "monthly", lastModified: "2026-06-15" },
  { path: "/contact", priority: 0.6, changefreq: "monthly", lastModified: "2026-06-10" },
];

const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

Sitemap: https://johndoe.dev/sitemap.xml`;

const scoreColor = (score: number) => score >= 90 ? "text-success" : score >= 70 ? "text-warning" : "text-error";
const scoreBg = (score: number) => score >= 90 ? "bg-success/10" : score >= 70 ? "bg-warning/10" : "bg-error/10";

export function SeoPage() {
  const [tab, setTab] = useState<"pages" | "sitemap" | "robots">("pages");
  const [search, setSearch] = useState("");
  const [robotsContent, setRobotsContent] = useState(ROBOTS_TXT);
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "seo" });
  const pages: SeoPage[] = response?.data ?? [];

  const stats = {
    totalPages: pages.length,
    averageScore: pages.length > 0 ? +(pages.reduce((s, p) => s + p.score, 0) / pages.length).toFixed(1) : 0,
    errors: pages.reduce((s, p) => s + p.issues.filter((i) => i.type === "error").length, 0),
    warnings: pages.reduce((s, p) => s + p.issues.filter((i) => i.type === "warning").length, 0),
    pagesWithIssues: pages.filter((p) => p.issues.length > 0).length,
  };

  const filtered = pages.filter((p) => p.path.includes(search) || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">SEO</h1>
          <p className="text-sm text-text-tertiary">Search engine optimization and page analysis</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
          <RefreshCw size={14} /> Scan Pages
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pages Analyzed", value: stats.totalPages, icon: Globe, color: "text-accent" },
          { label: "Average Score", value: `${stats.averageScore}%`, icon: CheckCircle2, color: scoreColor(stats.averageScore) },
          { label: "Errors Found", value: stats.errors, icon: XCircle, color: "text-error" },
          { label: "Pages with Issues", value: stats.pagesWithIssues, icon: AlertTriangle, color: "text-warning" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-border-primary bg-surface-primary p-1 w-fit">
        {[
          { value: "pages", label: "Page Analysis", icon: FileText },
          { value: "sitemap", label: "Sitemap", icon: Globe },
          { value: "robots", label: "Robots.txt", icon: Code },
        ].map((t) => (
          <button key={t.value} onClick={() => setTab(t.value as typeof tab)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === t.value ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
            <t.icon size={16} />{t.label}
          </button>
        ))}
      </div>

      {tab === "pages" && (
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 size={24} className="animate-spin text-accent" />
            </div>
          ) : pages.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-border-primary bg-surface-primary">
              <p className="text-sm text-text-tertiary">No SEO data available</p>
            </div>
          ) : (
          <>
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input type="text" placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
          </div>
          {filtered.map((page) => (
            <motion.div key={page.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border-primary bg-surface-primary p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-accent">{page.path}</span>
                    <span className="text-xs text-text-tertiary">Last crawled: {page.lastCrawled}</span>
                  </div>
                  <h3 className="font-semibold text-text-primary">{page.title}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${scoreBg(page.score)} ${scoreColor(page.score)}`}>
                  {page.score}
                </div>
              </div>
              <div className="space-y-1 mb-3">
                <p className="text-xs text-text-tertiary"><span className="font-medium text-text-secondary">Meta Title:</span> {page.metaTitle}</p>
                <p className="text-xs text-text-tertiary"><span className="font-medium text-text-secondary">Meta Desc:</span> {page.metaDescription || <span className="text-error">Missing</span>}</p>
              </div>
              {page.issues.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-text-secondary">Issues ({page.issues.length}):</p>
                  {page.issues.map((issue, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs">
                      {issue.type === "error" ? <XCircle size={14} className="mt-0.5 shrink-0 text-error" /> :
                       issue.type === "warning" ? <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warning" /> :
                       <Info size={14} className="mt-0.5 shrink-0 text-accent" />}
                      <div><p className="text-text-secondary">{issue.message}</p><p className="text-text-tertiary">Fix: {issue.fix}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          </>
          )}
        </div>
      )}

      {tab === "sitemap" && (
        <div className="rounded-xl border border-border-primary bg-surface-primary">
          <div className="flex items-center justify-between border-b border-border-primary px-5 py-3">
            <h3 className="text-sm font-semibold text-text-primary">Sitemap Entries</h3>
            <button className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs text-white transition-colors hover:bg-accent-hover">
              <RefreshCw size={12} /> Regenerate
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border-primary text-left text-xs text-text-tertiary">
                <th className="px-5 py-3 font-medium">Path</th><th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Change Freq</th><th className="px-5 py-3 font-medium">Last Modified</th>
              </tr></thead>
              <tbody>
                {SITEMAP.map((entry) => (
                  <tr key={entry.path} className="border-b border-border-primary transition-colors hover:bg-surface-hover">
                    <td className="px-5 py-3 font-mono text-xs text-accent">{entry.path}</td>
                    <td className="px-5 py-3 text-text-secondary">{entry.priority.toFixed(1)}</td>
                    <td className="px-5 py-3 text-text-secondary">{entry.changefreq}</td>
                    <td className="px-5 py-3 text-xs text-text-tertiary">{entry.lastModified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "robots" && (
        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">robots.txt</h3>
            <button onClick={() => {/* save */}} className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs text-white transition-colors hover:bg-accent-hover">
              <Save size={12} /> Save
            </button>
          </div>
          <textarea value={robotsContent} onChange={(e) => setRobotsContent(e.target.value)}
            className="w-full h-48 rounded-lg border border-border-primary bg-surface-secondary p-4 text-xs font-mono text-text-primary outline-none focus:border-accent resize-none" />
          <p className="mt-2 text-xs text-text-tertiary">This file tells search engines which pages to crawl and index.</p>
        </div>
      )}
    </div>
  );
}


