"use client";

import { useEffect } from "react";
import { useCommandCenter } from "@/hooks/use-command-center";
import { WelcomeHeader } from "./welcome-header";
import { QuickActions } from "./quick-actions";
import { AnalyticsCards } from "./analytics-cards";
import { ActivityTimeline } from "./activity-timeline";
import { AiAssistantPanel } from "./ai-assistant-panel";
import { SystemHealthCard } from "./system-health-card";
import { DraftsSection } from "./drafts-section";
import { EmptyState } from "./empty-state";
import { RefreshCw, Database, FolderKanban, Code2, Briefcase, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeedButton } from "@/components/admin/seed-button";

export function CommandCenterPage() {
  const { data, loading, error, user, refetch } = useCommandCenter();

  useEffect(() => {
    document.title = data ? `Command Center — ${data.stats.visitors} visitors` : "Command Center";
  }, [data]);

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <EmptyState
          title="Failed to load dashboard"
          description="Could not fetch your command center data."
          action={{ label: "Retry", onClick: refetch }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <WelcomeHeader name={user?.name || "Admin"} unscheduledItems={data?.stats.contactMessages || 0} />
        <Button
          variant="ghost"
          size="icon"
          onClick={refetch}
          disabled={loading}
          className="h-7 w-7 shrink-0 ml-4"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <QuickActions />

      <AnalyticsCards
        stats={data?.stats}
        loading={loading}
        error={error}
        onRetry={refetch}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ActivityTimeline
            items={data?.activity}
            loading={loading}
            error={error}
            onRetry={refetch}
          />
        </div>
        <div className="space-y-4">
          <DraftsSection
            drafts={data?.drafts}
            loading={loading}
            error={error}
            onRetry={refetch}
          />
          <AiAssistantPanel />
          <SystemHealthCard
            health={data?.systemHealth}
            loading={loading}
            error={error}
            onRetry={refetch}
          />
        </div>
      </div>

      <details className="group rounded-lg border border-border-subtle bg-surface">
        <summary className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-text-secondary hover:text-text-primary cursor-pointer list-none">
          <Database className="h-3.5 w-3.5" />
          <span>Developer Tools</span>
          <span className="ml-auto text-[10px] text-text-tertiary group-open:hidden">click to expand</span>
          <span className="ml-auto text-[10px] text-text-tertiary hidden group-open:inline">click to collapse</span>
        </summary>
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          <SeedButton resource="all" label="Seed All" icon={<Database className="h-3 w-3" />} />
          <SeedButton resource="projects" label="Projects" icon={<FolderKanban className="h-3 w-3" />} />
          <SeedButton resource="skills" label="Skills" icon={<Code2 className="h-3 w-3" />} />
          <SeedButton resource="experience" label="Experience" icon={<Briefcase className="h-3 w-3" />} />
          <SeedButton resource="blogs" label="Blogs" icon={<BookOpen className="h-3 w-3" />} />
        </div>
      </details>
    </div>
  );
}
