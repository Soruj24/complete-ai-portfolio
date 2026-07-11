"use client";

import { useState } from "react";
import { cn } from "@/shared/utils";
import {
  Shield, Smartphone, ShieldCheck, Activity, Key, Database,
} from "lucide-react";
import { useDataProtection } from "../hooks/use-data-protection";
import { SecurityScoreGauge, ScoreBreakdown, ActiveAlerts, QuickActions } from "./overview-panel";
const EMPTY_SCORE = { overall: 0, categories: [], findings: [] };
const EMPTY_ALERTS: never[] = [];
import { AuthenticationTab } from "./authentication/authentication-tab";
import { AccessControlTab } from "./access-control/access-control-tab";
import { MonitoringTab } from "./monitoring/monitoring-tab";
import { SecretsTab } from "./secrets/secrets-tab";
import { DataProtectionTab } from "./data-protection/data-protection-tab";

const TABS = [
  { value: "overview", label: "Overview", icon: Shield },
  { value: "authentication", label: "Authentication", icon: Smartphone },
  { value: "access", label: "Access Control", icon: ShieldCheck },
  { value: "monitoring", label: "Monitoring", icon: Activity },
  { value: "secrets", label: "Secrets", icon: Key },
  { value: "data", label: "Data Protection", icon: Database },
] as const;

export function SecurityPage() {
  const [tab, setTab] = useState("overview");
  const { securityScore } = useDataProtection();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Security Center</h1>
          <p className="text-sm text-text-secondary mt-1">Manage authentication, access control, monitoring, and data protection</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {TABS.map((t) => (
          <button key={t.value} onClick={() => setTab(t.value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all shrink-0",
              tab === t.value
                ? "bg-accent/10 text-accent border border-accent/20"
                : "bg-surface-hover text-text-tertiary border border-transparent hover:text-text-secondary",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SecurityScoreGauge score={securityScore} />
            <div className="lg:col-span-2 space-y-4">
              <ScoreBreakdown score={securityScore} />
              <ActiveAlerts alerts={EMPTY_ALERTS} onViewAll={() => setTab("monitoring")} />
            </div>
          </div>
          <QuickActions onNavigate={setTab} />
        </div>
      )}

      {tab === "authentication" && <AuthenticationTab />}
      {tab === "access" && <AccessControlTab />}
      {tab === "monitoring" && <MonitoringTab />}
      {tab === "secrets" && <SecretsTab />}
      {tab === "data" && <DataProtectionTab />}
    </div>
  );
}
