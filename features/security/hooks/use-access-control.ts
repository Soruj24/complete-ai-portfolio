"use client";

import { useState } from "react";
import { securityService } from "../services/security-service";
import type { IPEntry, RateLimit, PasswordPolicy, Role } from "../types";

export function useAccessControl() {
  const [whitelist] = useState<IPEntry[]>(() => securityService.getIPWhitelist());
  const [blacklist] = useState<IPEntry[]>(() => securityService.getIPBlacklist());
  const [rateLimits] = useState<RateLimit[]>(() => securityService.getRateLimits());
  const [policy, setPolicy] = useState<PasswordPolicy>(() => securityService.getPasswordPolicy());
  const [roles] = useState<Role[]>(() => securityService.getRoles());

  return {
    whitelist, blacklist, rateLimits, policy, setPolicy, roles,
  };
}
