import { securityRepository } from "../repositories/security-repository";
import type {
  Session, Device, LoginEntry, IPEntry, RateLimit, PasswordPolicy,
  Role, AuditLog, SecurityAlert, APIKey, EnvVar, RecoveryCode,
  BackupStatus, SecurityScore, JWTConfig,
} from "../types";

export class SecurityService {
  async getSessions(): Promise<Session[]> { return securityRepository.getSessions(); }
  async getDevices(): Promise<Device[]> { return securityRepository.getDevices(); }
  async getLoginHistory(): Promise<LoginEntry[]> { return securityRepository.getLoginHistory(); }
  async getFailedLogins(): Promise<LoginEntry[]> { return securityRepository.getFailedLogins(); }

  async getIPWhitelist(): Promise<IPEntry[]> { return securityRepository.getIPWhitelist(); }
  async getIPBlacklist(): Promise<IPEntry[]> { return securityRepository.getIPBlacklist(); }
  async getRateLimits(): Promise<RateLimit[]> { return securityRepository.getRateLimits(); }
  async getPasswordPolicy(): Promise<PasswordPolicy | null> { return securityRepository.getPasswordPolicy(); }
  async getRoles(): Promise<Role[]> { return securityRepository.getRoles(); }

  async getAuditLogs(): Promise<AuditLog[]> { return securityRepository.getAuditLogs(); }
  async getAlerts(): Promise<SecurityAlert[]> { return securityRepository.getAlerts(); }

  async getAPIKeys(): Promise<APIKey[]> { return securityRepository.getAPIKeys(); }
  async getEnvVars(): Promise<EnvVar[]> { return securityRepository.getEnvVars(); }
  async getJWTConfig(): Promise<JWTConfig | null> { return securityRepository.getJWTConfig(); }

  async getRecoveryCodes(): Promise<RecoveryCode[]> { return securityRepository.getRecoveryCodes(); }
  async getBackupStatus(): Promise<BackupStatus | null> { return securityRepository.getBackupStatus(); }
  async getSecurityScore(): Promise<SecurityScore | null> { return securityRepository.getSecurityScore(); }

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
