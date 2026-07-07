"use client";

import { useEffect, useState } from "react";
import { securityService } from "../services/security-service";
import type { APIKey, EnvVar, JWTConfig } from "../types";

export function useSecrets() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [envVars, setEnvVars] = useState<EnvVar[]>([]);
  const [jwtConfig, setJwtConfig] = useState<JWTConfig | null>(null);

  useEffect(() => {
    securityService.getAPIKeys().then(setApiKeys);
    securityService.getEnvVars().then(setEnvVars);
    securityService.getJWTConfig().then(setJwtConfig);
  }, []);

  return { apiKeys, envVars, jwtConfig };
}
