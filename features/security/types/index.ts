export type Severity = "low" | "medium" | "high" | "critical";

export interface Session {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
  isTrusted: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  os: string;
  browser: string;
  ip: string;
  lastUsed: string;
  trusted: boolean;
}

export interface LoginEntry {
  id: string;
  user: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  status: "success" | "failed";
  timestamp: string;
  reason?: string;
}

export interface IPEntry {
  id: string;
  address: string;
  reason: string;
  addedBy: string;
  addedAt: string;
  expiresAt: string | null;
  status: "active" | "expired";
}

export interface RateLimit {
  endpoint: string;
  limit: number;
  window: string;
  current: number;
  remaining: number;
  resetIn: string;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  expirationDays: number;
  historyCount: number;
  maxAttempts: number;
  lockoutDuration: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  color: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ip: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: "open" | "investigating" | "resolved";
  timestamp: string;
  source: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  expires: string | null;
  lastUsed: string;
  status: "active" | "expired" | "revoked";
}

export interface EnvVar {
  id: string;
  key: string;
  value: string;
  environment: string;
  lastRotated: string;
  sensitive: boolean;
}

export interface RecoveryCode {
  code: string;
  used: boolean;
  usedAt: string | null;
}

export interface BackupStatus {
  lastBackup: string;
  lastBackupSize: string;
  nextBackup: string;
  schedule: string;
  status: "healthy" | "warning" | "error";
  totalBackups: number;
  storageUsed: string;
  storageAllocated: string;
  databases: { name: string; size: string; lastBackup: string; status: "success" | "failed" }[];
}

export interface SecurityScore {
  overall: number;
  categories: { name: string; score: number; max: number }[];
  findings: { severity: Severity; count: number; label: string }[];
}

export interface JWTConfig {
  accessTokenTTL: string;
  refreshTokenTTL: string;
  rememberMeTTL: string;
  algorithm: string;
  keyId: string;
  created: string;
  nextRotation: string;
}
