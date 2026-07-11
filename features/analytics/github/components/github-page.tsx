"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, GitFork, GitCommit, Code2, ExternalLink, Loader2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import type { GithubRepo } from "../types";

const LANG_COLORS: Record<string, string> = { TypeScript: "#3178c6", Python: "#3572a5", Dockerfile: "#384d54", Rust: "#dea584", Go: "#00add8" };

export function GithubPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "analytics/github" });
  const repos: GithubRepo[] = response?.data ?? [];

  const [search, setSearch] = useState("");

  const filtered = repos.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));
  const totalStars = repos.reduce((a, r) => a + r.stars, 0);
  const totalForks = repos.reduce((a, r) => a + r.forks, 0);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-text-primary">GitHub Stats</h1><p className="text-sm text-text-tertiary">Repository performance and activity</p></div>
        <div className="flex h-64 items-center justify-center rounded-xl border border-border-primary bg-surface-primary">
          <p className="text-sm text-text-tertiary">No GitHub data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">GitHub Stats</h1><p className="text-sm text-text-tertiary">Repository performance and activity</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Repositories", value: repos.length.toString(), icon: Code2, color: "text-accent" },
          { label: "Total Stars", value: totalStars.toLocaleString(), icon: Star, color: "text-warning" },
          { label: "Total Forks", value: totalForks.toLocaleString(), icon: GitFork, color: "text-accent" },
          { label: "Total Issues", value: repos.reduce((a, r) => a + r.issues, 0).toString(), icon: GitCommit, color: "text-error" },
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

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search repositories..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="group rounded-xl border border-border-primary bg-surface-primary p-4 hover:border-border-hover transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <Code2 size={14} className="text-accent" />
                  <p className="font-medium text-text-primary">{r.name}</p>
                </div>
                <p className="text-xs text-text-tertiary mt-1 line-clamp-1">{r.description}</p>
              </div>
              <a href="#" className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100"><ExternalLink size={14} /></a>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Star size={12} className="text-warning" /> {r.stars}</span>
              <span className="flex items-center gap-1"><GitFork size={12} /> {r.forks}</span>
              <span className="flex items-center gap-1"><GitCommit size={12} /> {r.issues} issues</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: LANG_COLORS[r.language] || "#6b7280" }} />
                {r.language}
              </span>
              <span className="ml-auto text-text-tertiary">Updated {new Date(r.updatedAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
