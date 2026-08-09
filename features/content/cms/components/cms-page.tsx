"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, RefreshCw, Search, Eye, EyeOff, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCMS } from "../hooks/use-cms";
import type { ContentSection } from "../types";

function StatusBadge({ status }: { status: ContentSection["status"] }) {
  const styles = {
    published: "bg-emerald-500/10 text-emerald-600",
    draft: "bg-amber-500/10 text-amber-600",
    empty: "bg-text-tertiary/10 text-text-tertiary",
  };
  const labels = { published: "Published", draft: "Draft", empty: "Empty" };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function ContentCard({ section, router, onToggle }: {
  section: ContentSection;
  router: ReturnType<typeof useRouter>;
  onToggle: (id: string) => void;
}) {
  const Icon = section.icon;

  return (
    <div className="group rounded-lg border border-border-subtle bg-surface hover:border-accent/30 transition-all">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent shrink-0">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-text-primary truncate">{section.name}</h3>
              <p className="text-[11px] text-text-tertiary truncate">{section.description}</p>
            </div>
          </div>
          <StatusBadge status={section.status} />
        </div>

        <div className="flex items-center gap-4 text-[11px] text-text-tertiary mb-3">
          <span>{section.itemCount} {section.itemCount === 1 ? "item" : "items"}</span>
          {section.lastUpdated && (
            <span>Updated {new Date(section.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary mb-3">
          <span className="text-accent/70">Public:</span>
          <span>{section.publicPageLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(section.adminPath)}
            className="h-7 text-[11px] gap-1 flex-1"
          >
            Edit
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(section.publicPath, "_blank")}
            className="h-7 w-7 shrink-0"
            title="Preview on live site"
          >
            <ExternalLink className="h-3 w-3 text-text-tertiary" />
          </Button>
          <button
            onClick={() => onToggle(section.id)}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-surface-hover transition-colors"
            title={section.enabled ? "Hide section" : "Show section"}
          >
            {section.enabled ? (
              <Eye className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <EyeOff className="h-3.5 w-3.5 text-text-tertiary" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CMSPage() {
  const router = useRouter();
  const { sections, stats, loading, error, search, setSearch, toggleEnabled, refetch } = useCMS();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-[13px] font-medium text-text-primary">Failed to load content</p>
        <p className="text-[12px] text-text-tertiary mt-1">{error}</p>
        <Button variant="outline" size="sm" onClick={refetch} className="mt-4 h-8 text-[13px]">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Content Hub</h1>
          <p className="text-[12px] text-text-tertiary">Manage all portfolio content from one place</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refetch} disabled={loading} className="h-8 text-[13px] gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button size="sm" onClick={() => window.open("/", "_blank")} className="h-8 text-[13px] gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" /> <span className="hidden sm:inline">View Live</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total Sections", value: stats.total, color: "text-text-primary" },
          { label: "Published", value: stats.published, color: "text-emerald-600" },
          { label: "Draft", value: stats.draft, color: "text-amber-600" },
          { label: "Empty", value: stats.empty, color: "text-text-tertiary" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border-subtle bg-surface p-3">
            <p className="text-[11px] text-text-tertiary">{s.label}</p>
            <p className={`text-[15px] font-semibold tabular-nums ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
        <Input
          placeholder="Search sections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 h-8 text-[13px] rounded-md border-border-subtle bg-surface"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <p className="text-[13px] font-medium">No sections found</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <ContentCard
              key={section.id}
              section={section}
              router={router}
              onToggle={toggleEnabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}
