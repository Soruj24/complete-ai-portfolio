export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  permissions: string[];
  status: "active" | "inactive" | "banned";
  lastLogin: string;
  createdAt: string;
}

export interface AdminRole {
  _id: string;
  name: string;
  slug: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
}

export interface AdminPermission {
  _id: string;
  name: string;
  slug: string;
  group: string;
  description: string;
  createdAt: string;
}

export interface ApiKey {
  _id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  expiresAt: string;
  active: boolean;
  createdAt: string;
}

export interface Integration {
  _id: string;
  name: string;
  provider: string;
  config: Record<string, unknown>;
  enabled: boolean;
  lastSync: string;
  status: "connected" | "disconnected" | "error";
  createdAt: string;
}
