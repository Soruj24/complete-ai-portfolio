export interface AuditEntry {
  id: string;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: string;
  severity: "info" | "warning" | "critical";
  timestamp: string;
  ip: string;
}
