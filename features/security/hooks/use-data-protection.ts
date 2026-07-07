"use client";

import { useEffect, useState } from "react";
import { securityService } from "../services/security-service";
import type { BackupStatus, RecoveryCode, SecurityScore } from "../types";

const defaultBackup: BackupStatus = { lastBackup: "", lastBackupSize: "", nextBackup: "", schedule: "", status: "healthy", totalBackups: 0, storageUsed: "", storageAllocated: "", databases: [] };
const defaultScore: SecurityScore = { overall: 100, categories: [], findings: [] };

export function useDataProtection() {
  const [backupStatus, setBackupStatus] = useState<BackupStatus>(defaultBackup);
  const [recoveryCodes, setRecoveryCodes] = useState<RecoveryCode[]>([]);
  const [securityScore, setSecurityScore] = useState<SecurityScore>(defaultScore);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  useEffect(() => {
    securityService.getBackupStatus().then((v) => v && setBackupStatus(v));
    securityService.getRecoveryCodes().then(setRecoveryCodes);
    securityService.getSecurityScore().then((v) => v && setSecurityScore(v));
  }, []);

  return { backupStatus, recoveryCodes, securityScore, encryptionEnabled, setEncryptionEnabled };
}
