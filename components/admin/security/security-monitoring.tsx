"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Activity, ShieldAlert, AlertTriangle, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSecurityQuery, getAlertColor } from "./shared";
import { AuditLogRow } from "./rows/audit-log-row";

const alertSeverityConfig = {
  low: { color: "text-info", bg: "bg-info/10", label: "Low" },
  medium: { color: "text-accent", bg: "bg-accent/10", label: "Medium" },
  high: { color: "text-warning", bg: "bg-warning/10", label: "High" },
  critical: { color: "text-error", bg: "bg-error/10", label: "Critical" },
};

const alertStatusConfig = {
  open: { color: "text-accent bg-accent/10", label: "Open" },
  investigating: { color: "text-warning bg-warning/10", label: "Investigating" },
  resolved: { color: "text-success bg-success/10", label: "Resolved" },
};

export function MonitoringTab() {
  const [auditSearch, setAuditSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const { data: auditData } = useSecurityQuery("audit");
  const { data: alertsData } = useSecurityQuery("security/alerts");
  const AUDIT_LOGS = (Array.isArray(auditData) ? auditData : []) as any[];
  const SECURITY_ALERTS = (Array.isArray(alertsData) ? alertsData : []) as any[];

  const filteredAudit = AUDIT_LOGS.filter((l: any) => {
    if (filterSeverity !== "all" && l.severity !== filterSeverity) return false;
    if (auditSearch && !l.details.toLowerCase().includes(auditSearch.toLowerCase()) && !l.user.toLowerCase().includes(auditSearch.toLowerCase()) && !l.action.toLowerCase().includes(auditSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <Card className="border-border-subtle bg-surface">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-error" />
            Security Alerts
          </CardTitle>
          <CardDescription>Active and resolved security incidents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {SECURITY_ALERTS.map((alert: any, i: number) => {
            const sev = alertSeverityConfig[alert.severity as keyof typeof alertSeverityConfig] || alertSeverityConfig.low;
            const status = alertStatusConfig[alert.status as keyof typeof alertStatusConfig] || alertStatusConfig.open;
            return (
              <motion.div key={alert.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  alert.severity === "critical" ? "border-error/20 bg-error/5" :
                  alert.severity === "high" ? "border-warning/20 bg-warning/5" :
                  "border-border-subtle bg-surface-hover",
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-1.5 rounded-lg", sev.bg)}>
                      <AlertTriangle className={cn("h-4 w-4", sev.color)} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-text-primary">{alert.title}</h4>
                        <Badge className={cn("text-[7px] px-1 py-0 rounded border-0 font-medium", sev.bg, sev.color)}>
                          {sev.label}
                        </Badge>
                        <Badge className={cn("text-[7px] px-1 py-0 rounded border-0 font-medium", status.color)}>
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-text-tertiary mt-0.5">{alert.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-[8px] text-text-tertiary">
                        <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {alert.timestamp}</span>
                        <span>Source: {alert.source}</span>
                      </div>
                    </div>
                  </div>
                  {alert.status !== "resolved" && (
                    <Button variant="outline" size="sm" className="h-7 text-[9px] gap-1 rounded-lg border-border-subtle shrink-0 ml-3">
                      <Eye className="h-3 w-3" /> Investigate
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border-subtle bg-surface">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" />
                Audit Logs
              </CardTitle>
              <CardDescription>Track all security-relevant events</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-surface-hover rounded-lg p-0.5">
                {["all", "info", "warning", "critical"].map((sev) => (
                  <button key={sev} onClick={() => setFilterSeverity(sev)}
                    className={cn(
                      "px-2 py-1 rounded-md text-[9px] font-medium transition-all",
                      filterSeverity === sev ? "bg-surface shadow-sm text-text-primary" : "text-text-tertiary",
                    )}
                  >
                    {sev.charAt(0).toUpperCase() + sev.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-text-tertiary" />
            <Input value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search audit logs..." className="pl-8 h-8 text-[10px] border-border-subtle bg-background rounded-lg" />
          </div>
          <div className="space-y-0.5 max-h-[400px] overflow-y-auto no-scrollbar">
            {filteredAudit.map((log: any) => <AuditLogRow key={log.id} log={log} />)}
            {filteredAudit.length === 0 && (
              <p className="text-center text-[10px] text-text-tertiary py-8">No audit logs match your filter</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
