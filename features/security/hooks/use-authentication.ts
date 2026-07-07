"use client";

import { useState, useMemo } from "react";
import { securityService } from "../services/security-service";
import type { Session, Device, LoginEntry } from "../types";

export function useAuthentication() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [sessions] = useState<Session[]>(() => securityService.getSessions());
  const [devices] = useState<Device[]>(() => securityService.getDevices());
  const [failedLogins] = useState<LoginEntry[]>(() => securityService.getFailedLogins());

  const loginHistory = useMemo(() => {
    const logins: LoginEntry[] = securityService.getLoginHistory();
    return [...logins].sort((a, b) => {
      const tA = sortPriority(a.timestamp);
      const tB = sortPriority(b.timestamp);
      return tA - tB;
    });
  }, []);

  return {
    sessions, devices, failedLogins, loginHistory,
    twoFAEnabled, setTwoFAEnabled,
  };
}

function sortPriority(ts: string): number {
  if (ts.includes("min")) return 0;
  if (ts.includes("h")) return 1;
  if (ts.includes("d")) return 2;
  if (ts.includes("w")) return 3;
  return 4;
}
