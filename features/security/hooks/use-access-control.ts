"use client";

import { useEffect, useState } from "react";
import { securityService } from "../services/security-service";
import type { IPEntry, RateLimit, PasswordPolicy, Role } from "../types";

export function useAccessControl() {
  const [whitelist, setWhitelist] = useState<IPEntry[]>([]);
  const [blacklist, setBlacklist] = useState<IPEntry[]>([]);
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [policy, setPolicy] = useState<PasswordPolicy | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    securityService.getIPWhitelist().then(setWhitelist);
    securityService.getIPBlacklist().then(setBlacklist);
    securityService.getRateLimits().then(setRateLimits);
    securityService.getPasswordPolicy().then(setPolicy);
    securityService.getRoles().then(setRoles);
  }, []);

  return {
    whitelist, blacklist, rateLimits, policy, setPolicy, roles,
  };
}
