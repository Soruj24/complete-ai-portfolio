import { MockRepository } from "@/shared/repositories/mock-repository";
import {
  MOCK_SESSIONS, MOCK_DEVICES, MOCK_LOGIN_HISTORY, MOCK_FAILED_LOGINS,
  MOCK_IP_WHITELIST, MOCK_IP_BLACKLIST, MOCK_RATE_LIMITS, MOCK_PASSWORD_POLICY,
  MOCK_ROLES, MOCK_AUDIT_LOGS, MOCK_ALERTS, MOCK_API_KEYS, MOCK_ENV_VARS,
  MOCK_RECOVERY_CODES, MOCK_BACKUP_STATUS, MOCK_SCORE, MOCK_JWT_CONFIG,
} from "../constants/mock-data";
import type {
  Session, Device, LoginEntry, IPEntry, RateLimit, PasswordPolicy,
  Role, AuditLog, SecurityAlert, APIKey, EnvVar, RecoveryCode,
  BackupStatus, SecurityScore, JWTConfig,
} from "../types";

interface Entity { _id: string }

export class SecurityRepository {
  getSessions(): Session[] { return MOCK_SESSIONS; }
  getDevices(): Device[] { return MOCK_DEVICES; }
  getLoginHistory(): LoginEntry[] { return MOCK_LOGIN_HISTORY; }
  getFailedLogins(): LoginEntry[] { return MOCK_FAILED_LOGINS; }

  getIPWhitelist(): IPEntry[] { return MOCK_IP_WHITELIST; }
  getIPBlacklist(): IPEntry[] { return MOCK_IP_BLACKLIST; }
  getRateLimits(): RateLimit[] { return MOCK_RATE_LIMITS; }
  getPasswordPolicy(): PasswordPolicy { return MOCK_PASSWORD_POLICY; }
  getRoles(): Role[] { return MOCK_ROLES; }

  getAuditLogs(): AuditLog[] { return MOCK_AUDIT_LOGS; }
  getAlerts(): SecurityAlert[] { return MOCK_ALERTS; }

  getAPIKeys(): APIKey[] { return MOCK_API_KEYS; }
  getEnvVars(): EnvVar[] { return MOCK_ENV_VARS; }
  getJWTConfig(): JWTConfig { return MOCK_JWT_CONFIG; }

  getRecoveryCodes(): RecoveryCode[] { return MOCK_RECOVERY_CODES; }
  getBackupStatus(): BackupStatus { return MOCK_BACKUP_STATUS; }
  getSecurityScore(): SecurityScore { return MOCK_SCORE; }
}

export const securityRepository = new SecurityRepository();
