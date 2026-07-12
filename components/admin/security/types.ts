export interface Session {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  isCurrent: boolean;
  isTrusted: boolean;
  lastActive: string;
  createdAt: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  os: string;
  browser: string;
  ip: string;
  trusted: boolean;
}

export interface LoginEntry {
  id: string;
  location: string;
  ip: string;
  device: string;
  browser: string;
  status: "success" | "failed";
  reason?: string;
  timestamp: string;
}

export interface RecoveryCode {
  code: string;
  used: boolean;
}

export interface IPEntry {
  id: string;
  address: string;
  status: "active" | "inactive";
  reason: string;
  addedBy: string;
  expiresAt?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  users: number;
  permissions: string[];
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  resource: string;
  details: string;
  severity: "info" | "warning" | "critical";
  ip: string;
  timestamp: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved";
  source: string;
  timestamp: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  status: "active" | "expired" | "revoked";
  permissions: string[];
  created: string;
  expires?: string;
  lastUsed: string;
}

export interface EnvVar {
  id: string;
  key: string;
  value: string;
  environment: string;
  sensitive: boolean;
  lastRotated: string;
}

export interface DatabaseBackup {
  name: string;
  size: string;
  lastBackup: string;
  status: "success" | "failed";
}

export interface BackupStatus {
  status: string;
  lastBackup: string;
  lastBackupSize: string;
  totalBackups: number;
  schedule: string;
  nextBackup: string;
  databases: DatabaseBackup[];
}

export interface JWTConfig {
  accessTokenTTL: string;
  refreshTokenTTL: string;
  rememberMeTTL: string;
  algorithm: string;
  keyId: string;
  created: string;
  lastRotated: string;
  nextRotation: string;
}

export interface RateLimit {
  endpoint: string;
  limit: number;
  window: string;
  remaining: number;
  current: number;
  resetIn: string;
}
