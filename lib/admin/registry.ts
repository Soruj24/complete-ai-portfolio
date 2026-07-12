import type { ResourceConfig } from "@/types/admin";

const configs = new Map<string, ResourceConfig>();

export function registerResource(path: string, config: ResourceConfig) {
  configs.set(path, config);
}

export function getResourceConfig(path: string): ResourceConfig | undefined {
  if (configs.has(path)) return configs.get(path);
  for (const [key, cfg] of configs) {
    if (path.startsWith(key)) return cfg;
  }
  return undefined;
}

export function getAllResources(): ResourceConfig[] {
  return Array.from(configs.values());
}

import "./resources";
