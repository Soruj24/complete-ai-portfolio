export interface SystemLog {
  _id: string;
  level: "info" | "warning" | "error" | "debug";
  message: string;
  source: string;
  userId: string;
  ip: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface AuditEntry {
  _id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  userName: string;
  changes: Record<string, { from: unknown; to: unknown }>;
  ip: string;
  timestamp: string;
}

export interface Backup {
  _id: string;
  name: string;
  type: "full" | "partial";
  size: number;
  files: string[];
  status: "completed" | "failed" | "in_progress";
  createdAt: string;
}
