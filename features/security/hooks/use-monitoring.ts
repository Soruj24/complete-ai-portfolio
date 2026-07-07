"use client";

import { useEffect, useState, useMemo } from "react";
import { securityService } from "../services/security-service";
import type { AuditLog, SecurityAlert } from "../types";

export function useMonitoring() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    securityService.getAlerts().then(setAlerts);
    securityService.getAuditLogs().then(setAuditLogs);
  }, []);

  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return auditLogs;
    const q = searchQuery.toLowerCase();
    return auditLogs.filter(
      (l) => l.user.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.details.toLowerCase().includes(q)
    );
  }, [auditLogs, searchQuery]);

  return { alerts, auditLogs, filteredLogs, searchQuery, setSearchQuery };
}
