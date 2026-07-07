"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, GitFork, GitCommit, Code2, ExternalLink } from "lucide-react";
import type { GithubRepo } from "../types";

const MOCK: GithubRepo[] = [
  { id: "gh-1", name: "portfolio-cms", stars: 342, forks: 89, issues: 5, language: "TypeScript", description: "Enterprise portfolio CMS with CRUD engine and AI Control Center", updatedAt: "2026-07-05" },
  { id: "gh-2", name: "react-component-library", stars: 218, forks: 45, issues: 3, language: "TypeScript", description: "Reusable React component library with 50+ components", updatedAt: "2026-07-03" },
  { id: "gh-3", name: "node-api-boilerplate", stars: 156, forks: 72, issues: 8, language: "TypeScript", description: "Production-ready Node.js API with authentication and routing", updatedAt: "2026-06-28" },
  { id: "gh-4", name: "nextjs-starter", stars: 127, forks: 34, issues: 2, language: "TypeScript", description: "Next.js starter template with TypeScript, Tailwind, and ESLint", updatedAt: "2026-06-25" },
  { id: "gh-5", name: "python-ml-toolkit", stars: 94, forks: 28, issues: 4, language: "Python", description: "Machine learning toolkit for data preprocessing and model training", updatedAt: "2026-06-20" },
  { id: "gh-6", name: "docker-compose-templates", stars: 73, forks: 41, issues: 1, language: "Dockerfile", description: "Collection of Docker Compose templates for common stacks", updatedAt: "2026-06-18" },
  { id: "gh-7", name: "rust-cli-utils", stars: 56, forks: 12, issues: 2, language: "Rust", description: "CLI utilities written in Rust for file processing", updatedAt: "2026-06-15" },
  { id: "gh-8", name: "go-microservice", stars: 41, forks: 15, issues: 6, language: "Go", description: "Microservice example with gRPC and Kafka integration", updatedAt: "2026-06-10" },
];

const LANG_COLORS: Record<string, string> = { TypeScript: "#3178c6", Python: "#3572a5", Dockerfile: "#384d54", Rust: "#dea584", Go: "#00add8" };

export function GithubPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));
  const totalStars = MOCK.reduce((a, r) => a + r.stars, 0);
  const totalForks = MOCK.reduce((a, r) => a + r.forks, 0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">GitHub Stats</h1><p className="text-sm text-text-tertiary">Repository performance and activity</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Repositories", value: MOCK.length.toString(), icon: Code2, color: "text-accent" },
          { label: "Total Stars", value: totalStars.toLocaleString(), icon: Star, color: "text-warning" },
          { label: "Total Forks", value: totalForks.toLocaleString(), icon: GitFork, color: "text-accent" },
          { label: "Total Issues", value: MOCK.reduce((a, r) => a + r.issues, 0).toString(), icon: GitCommit, color: "text-error" },
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
