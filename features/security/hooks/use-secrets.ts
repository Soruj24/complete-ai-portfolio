"use client";

import { useState } from "react";
import { securityService } from "../services/security-service";
import type { APIKey, EnvVar, JWTConfig } from "../types";

export function useSecrets() {
  const [apiKeys] = useState<APIKey[]>(() => securityService.getAPIKeys());
  const [envVars] = useState<EnvVar[]>(() => securityService.getEnvVars());
  const [jwtConfig] = useState<JWTConfig>(() => securityService.getJWTConfig());

  return { apiKeys, envVars, jwtConfig };
}
