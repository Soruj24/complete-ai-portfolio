import { securityRepository } from "../repositories/security-repository";
import type {
  Session, Device, LoginEntry, IPEntry, RateLimit, PasswordPolicy,
  Role, AuditLog, SecurityAlert, APIKey, EnvVar, RecoveryCode,
  BackupStatus, SecurityScore, JWTConfig,
} from "../types";

export class SecurityService {
  getSessions(): Session[] { return securityRepository.getSessions(); }
  getDevices(): Device[] { return securityRepository.getDevices(); }
  getLoginHistory(): LoginEntry[] { return securityRepository.getLoginHistory(); }
  getFailedLogins(): LoginEntry[] { return securityRepository.getFailedLogins(); }

  getIPWhitelist(): IPEntry[] { return securityRepository.getIPWhitelist(); }
  getIPBlacklist(): IPEntry[] { return securityRepository.getIPBlacklist(); }
  getRateLimits(): RateLimit[] { return securityRepository.getRateLimits(); }
  getPasswordPolicy(): PasswordPolicy { return securityRepository.getPasswordPolicy(); }
  getRoles(): Role[] { return securityRepository.getRoles(); }

  getAuditLogs(): AuditLog[] { return securityRepository.getAuditLogs(); }
  getAlerts(): SecurityAlert[] { return securityRepository.getAlerts(); }

  getAPIKeys(): APIKey[] { return securityRepository.getAPIKeys(); }
  getEnvVars(): EnvVar[] { return securityRepository.getEnvVars(); }
  getJWTConfig(): JWTConfig { return securityRepository.getJWTConfig(); }

  getRecoveryCodes(): RecoveryCode[] { return securityRepository.getRecoveryCodes(); }
  getBackupStatus(): BackupStatus { return securityRepository.getBackupStatus(); }
  getSecurityScore(): SecurityScore { return securityRepository.getSecurityScore(); }

  getAlertColor(severity: string): string {
    const map: Record<string, string> = {
      critical: "text-error bg-error/10 border-error/20",
      high: "text-warning bg-warning/10 border-warning/20",
      medium: "text-accent bg-accent/10 border-accent/20",
      low: "text-info bg-info/10 border-info/20",
    };
    return map[severity] || "text-text-tertiary bg-surface-hover border-border-subtle";
  }
}

export const securityService = new SecurityService();
