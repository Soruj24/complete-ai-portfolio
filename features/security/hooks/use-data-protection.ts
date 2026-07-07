"use client";

import { useState } from "react";
import { securityService } from "../services/security-service";
import type { BackupStatus, RecoveryCode, SecurityScore } from "../types";

export function useDataProtection() {
  const [backupStatus] = useState<BackupStatus>(() => securityService.getBackupStatus());
  const [recoveryCodes] = useState<RecoveryCode[]>(() => securityService.getRecoveryCodes());
  const [securityScore] = useState<SecurityScore>(() => securityService.getSecurityScore());
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  return { backupStatus, recoveryCodes, securityScore, encryptionEnabled, setEncryptionEnabled };
}
