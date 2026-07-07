"use client";

import { useState, useMemo } from "react";
import { securityService } from "../services/security-service";
import type { AuditLog, SecurityAlert } from "../types";

export function useMonitoring() {
  const [alerts] = useState<SecurityAlert[]>(() => securityService.getAlerts());
  const [auditLogs] = useState<AuditLog[]>(() => securityService.getAuditLogs());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return auditLogs;
    const q = searchQuery.toLowerCase();
    return auditLogs.filter(
      (l) => l.user.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.details.toLowerCase().includes(q)
    );
  }, [auditLogs, searchQuery]);

  return { alerts, auditLogs, filteredLogs, searchQuery, setSearchQuery };
}
