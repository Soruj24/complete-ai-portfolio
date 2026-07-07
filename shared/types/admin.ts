export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "banned";
  isVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "down";
  uptime: number;
  memory: { used: number; total: number; percentage: number };
  cpu: { load: number; cores: number };
  database: { status: "connected" | "disconnected" | "error"; latency: number };
  ollama?: { status: "running" | "stopped" | "error"; model?: string };
}

export interface ActivityEntry {
  _id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ip?: string;
  createdAt: string;
}

export interface ResourceConfig {
  name: string;
  label: string;
  icon: string;
  features: ResourceFeatures;
}

export interface ResourceFeatures {
  create: boolean;
  edit: boolean;
  delete: boolean;
  bulkDelete: boolean;
  search: boolean;
  filter: boolean;
  sort: boolean;
  export: boolean;
}
