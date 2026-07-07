"use client";

import { cn } from "@/shared/utils";
import { fadeInUp, staggerContainer } from "@/shared/animations";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldAlert, Activity, Key, Database, AlertTriangle, Shield } from "lucide-react";
import { MOCK_SCORE, MOCK_ALERTS } from "../constants/mock-data";
import type { SecurityScore, SecurityAlert } from "../types";

const SCORE_COLOR = (score: number) => {
  if (score >= 80) return { color: "text-success", track: "bg-success", light: "bg-success/10" };
  if (score >= 60) return { color: "text-warning", track: "bg-warning", light: "bg-warning/10" };
  return { color: "text-error", track: "bg-error", light: "bg-error/10" };
};

export function SecurityScoreGauge({ score }: { score: SecurityScore }) {
  const meta = SCORE_COLOR(score.overall);

  return (
    <Card className="border-border-subtle bg-surface">
      <CardContent className="p-6 text-center">
        <div className="relative h-32 w-32 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-surface-hover)" strokeWidth="8" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - score.overall / 100)}`}
              className={meta.track} strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", meta.color)}>{score.overall}</span>
            <span className="text-[9px] text-text-tertiary">/ 100</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-text-primary">Security Score</h3>
        <p className="text-[10px] text-text-tertiary mt-1">
          {score.overall >= 80 ? "Good security posture" : score.overall >= 60 ? "Moderate risk" : "Critical improvements needed"}
        </p>
        <div className="flex items-center justify-center gap-1 mt-3">
          {score.findings.map((f) => (
            <Badge key={f.severity} className={cn(
              "text-[7px] px-1 py-0 rounded border-0 font-medium",
              f.severity === "critical" ? "bg-error/10 text-error" :
              f.severity === "high" ? "bg-warning/10 text-warning" :
              f.severity === "medium" ? "bg-accent/10 text-accent" :
              "bg-info/10 text-info",
            )}>
              {f.count} {f.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ScoreBreakdown({ score }: { score: SecurityScore }) {
  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary">Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {score.categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="text-text-primary font-medium">{cat.name}</span>
              <span className={cn("font-bold font-mono", cat.score >= 80 ? "text-success" : cat.score >= 60 ? "text-warning" : "text-error")}>
                {cat.score}/{cat.max}
              </span>
            </div>
            <Progress value={(cat.score / cat.max) * 100}
              className={cn("h-1.5 bg-background",
                cat.score >= 80 ? "[&>div]:bg-success" : cat.score >= 60 ? "[&>div]:bg-warning" : "[&>div]:bg-error")}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ActiveAlerts({ alerts, onViewAll }: { alerts: SecurityAlert[]; onViewAll: () => void }) {
  const open = alerts.filter((a) => a.status !== "resolved").slice(0, 3);

  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-error" />
            Active Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAll}
            className="h-7 text-[10px] rounded-lg gap-1">
            View All <Activity className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {open.map((alert) => (
          <div key={alert.id} className={cn(
            "flex items-start gap-2 p-2.5 rounded-lg border text-[10px]",
            alert.severity === "critical" ? "border-error/20 bg-error/5" :
            alert.severity === "high" ? "border-warning/20 bg-warning/5" :
            "border-border-subtle bg-surface-hover",
          )}>
            <AlertTriangle className={cn("h-3.5 w-3.5 mt-0.5 shrink-0",
              alert.severity === "critical" ? "text-error" : alert.severity === "high" ? "text-warning" : "text-accent")} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text-primary">{alert.title}</p>
              <p className="text-[8px] text-text-tertiary mt-0.5">{alert.timestamp} &middot; {alert.source}</p>
            </div>
            <Badge className={cn("text-[7px] px-1 py-0 rounded border-0 shrink-0",
              alert.severity === "critical" ? "bg-error/10 text-error" :
              alert.severity === "high" ? "bg-warning/10 text-warning" : "bg-accent/10 text-accent")}>
              {alert.severity}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function QuickActions({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const actions = [
    { label: "Review Sessions", desc: "Check active sessions", icon: Shield, tab: "authentication", color: "text-accent", bg: "bg-accent/10" },
    { label: "Audit Logs", desc: "View recent activity", icon: Activity, tab: "monitoring", color: "text-success", bg: "bg-success/10" },
    { label: "Manage API Keys", desc: "Rotate or revoke keys", icon: Key, tab: "secrets", color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Backup Status", desc: "Check database backups", icon: Database, tab: "data-protection", color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary">Quick Actions</CardTitle>
        <CardDescription>Common security tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((a) => (
            <button key={a.label} onClick={() => onNavigate(a.tab)}
              className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface-hover hover:bg-background transition-all text-left group"
            >
              <div className={cn("p-2 rounded-lg", a.bg, "group-hover:brightness-110 transition-all")}>
                <a.icon className={cn("h-4 w-4", a.color)} />
              </div>
              <div>
                <p className="text-xs font-medium text-text-primary">{a.label}</p>
                <p className="text-[9px] text-text-tertiary">{a.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
