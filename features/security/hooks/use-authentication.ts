"use client";

import { useEffect, useState, useMemo } from "react";
import { securityService } from "../services/security-service";
import type { Session, Device, LoginEntry } from "../types";

export function useAuthentication() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [failedLogins, setFailedLogins] = useState<LoginEntry[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginEntry[]>([]);

  useEffect(() => {
    securityService.getSessions().then(setSessions);
    securityService.getDevices().then(setDevices);
    securityService.getFailedLogins().then(setFailedLogins);
    securityService.getLoginHistory().then((logins) => {
      const sorted = [...logins].sort((a, b) => {
        const tA = sortPriority(a.timestamp);
        const tB = sortPriority(b.timestamp);
        return tA - tB;
      });
      setLoginHistory(sorted);
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
