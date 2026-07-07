import type {
  Session, Device, LoginEntry, IPEntry, RateLimit, PasswordPolicy,
  Role, AuditLog, SecurityAlert, APIKey, EnvVar, RecoveryCode,
  BackupStatus, SecurityScore, JWTConfig,
} from "../types";

export class SecurityRepository {
  async getSessions(): Promise<Session[]> { return []; }
  async getDevices(): Promise<Device[]> { return []; }
  async getLoginHistory(): Promise<LoginEntry[]> { return []; }
  async getFailedLogins(): Promise<LoginEntry[]> { return []; }

  async getIPWhitelist(): Promise<IPEntry[]> { return []; }
  async getIPBlacklist(): Promise<IPEntry[]> { return []; }
  async getRateLimits(): Promise<RateLimit[]> { return []; }
  async getPasswordPolicy(): Promise<PasswordPolicy | null> { return null; }
  async getRoles(): Promise<Role[]> { return []; }

  async getAuditLogs(): Promise<AuditLog[]> { return []; }
  async getAlerts(): Promise<SecurityAlert[]> { return []; }

  async getAPIKeys(): Promise<APIKey[]> { return []; }
  async getEnvVars(): Promise<EnvVar[]> { return []; }
  async getJWTConfig(): Promise<JWTConfig | null> { return null; }

  async getRecoveryCodes(): Promise<RecoveryCode[]> { return []; }
  async getBackupStatus(): Promise<BackupStatus | null> { return null; }
  async getSecurityScore(): Promise<SecurityScore | null> { return null; }
}

export const securityRepository = new SecurityRepository();
