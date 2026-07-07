"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <EmptyState
          title="Failed to load dashboard"
          description="Could not fetch your command center data."
          action={{ label: "Retry", onClick: refetch }}
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <WelcomeHeader name={user?.name || "Admin"} unscheduledItems={data?.stats.contactMessages || 0} />
          <Button
            variant="ghost"
            size="icon"
            onClick={refetch}
            disabled={loading}
            className="h-8 w-8 shrink-0 ml-4 self-start mt-1"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <QuickActions />

        <AnalyticsCards
          stats={data?.stats}
          loading={loading}
          error={error}
          onRetry={refetch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityTimeline
              items={data?.activity}
              loading={loading}
              error={error}
              onRetry={refetch}
            />
          </div>
          <div className="space-y-6">
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

        <details className="group rounded-xl border border-border-subtle bg-surface">
          <summary className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-text-secondary hover:text-text-primary cursor-pointer list-none">
            <Database className="h-4 w-4" />
            <span>Developer Tools</span>
            <span className="ml-auto text-[10px] text-text-tertiary group-open:hidden">click to expand</span>
            <span className="ml-auto text-[10px] text-text-tertiary hidden group-open:inline">click to collapse</span>
          </summary>
          <div className="px-5 pb-4 flex flex-wrap gap-2">
            <SeedButton resource="all" label="Seed All" icon={<Database className="h-3.5 w-3.5" />} />
            <SeedButton resource="projects" label="Projects" icon={<FolderKanban className="h-3.5 w-3.5" />} />
            <SeedButton resource="skills" label="Skills" icon={<Code2 className="h-3.5 w-3.5" />} />
            <SeedButton resource="experience" label="Experience" icon={<Briefcase className="h-3.5 w-3.5" />} />
            <SeedButton resource="blogs" label="Blogs" icon={<BookOpen className="h-3.5 w-3.5" />} />
          </div>
        </details>
      </motion.div>
    </AnimatePresence>
  );
}
