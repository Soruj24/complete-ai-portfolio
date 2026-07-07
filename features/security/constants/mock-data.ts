import type {
  Session, Device, LoginEntry, IPEntry, RateLimit, PasswordPolicy,
  Role, AuditLog, SecurityAlert, APIKey, EnvVar, RecoveryCode,
  BackupStatus, SecurityScore, JWTConfig,
} from "../types";

export const MOCK_SESSIONS: Session[] = [
  { id: "s1", device: "MacBook Pro 16\"", browser: "Chrome 125", os: "macOS 14.5", ip: "192.168.1.42", location: "San Francisco, US", lastActive: "Just now", createdAt: "2026-06-01", isCurrent: true, isTrusted: true },
  { id: "s2", device: "iPhone 15 Pro", browser: "Safari 17.5", os: "iOS 18.0", ip: "203.0.113.45", location: "New York, US", lastActive: "2h ago", createdAt: "2026-05-15", isCurrent: false, isTrusted: true },
  { id: "s3", device: "Windows Desktop", browser: "Firefox 128", os: "Windows 11", ip: "198.51.100.22", location: "London, UK", lastActive: "1d ago", createdAt: "2026-04-20", isCurrent: false, isTrusted: false },
  { id: "s4", device: "Pixel 8", browser: "Chrome 125", os: "Android 15", ip: "192.0.2.88", location: "Berlin, DE", lastActive: "3d ago", createdAt: "2026-06-10", isCurrent: false, isTrusted: false },
  { id: "s5", device: "iPad Air", browser: "Safari 17.5", os: "iPadOS 18.0", ip: "10.0.0.55", location: "Paris, FR", lastActive: "1w ago", createdAt: "2026-03-01", isCurrent: false, isTrusted: true },
];

export const MOCK_DEVICES: Device[] = [
  { id: "d1", name: "MacBook Pro 16\"", type: "Laptop", os: "macOS 14.5", browser: "Chrome 125", ip: "192.168.1.42", lastUsed: "Just now", trusted: true },
  { id: "d2", name: "iPhone 15 Pro", type: "Phone", os: "iOS 18.0", browser: "Safari 17.5", ip: "203.0.113.45", lastUsed: "2h ago", trusted: true },
  { id: "d3", name: "Windows Desktop", type: "Desktop", os: "Windows 11", browser: "Firefox 128", ip: "198.51.100.22", lastUsed: "1d ago", trusted: false },
  { id: "d4", name: "Pixel 8", type: "Phone", os: "Android 15", browser: "Chrome 125", ip: "192.0.2.88", lastUsed: "3d ago", trusted: false },
  { id: "d5", name: "iPad Air", type: "Tablet", os: "iPadOS 18.0", browser: "Safari 17.5", ip: "10.0.0.55", lastUsed: "1w ago", trusted: true },
];

export const MOCK_LOGIN_HISTORY: LoginEntry[] = [
  { id: "l1", user: "admin@portfolio.dev", ip: "192.168.1.42", location: "San Francisco, US", device: "MacBook Pro", browser: "Chrome 125", status: "success", timestamp: "2 min ago" },
  { id: "l2", user: "admin@portfolio.dev", ip: "203.0.113.45", location: "New York, US", device: "iPhone 15 Pro", browser: "Safari 17.5", status: "success", timestamp: "2h ago" },
  { id: "l3", user: "admin@portfolio.dev", ip: "45.33.22.11", location: "Moscow, RU", device: "Unknown", browser: "Chrome 120", status: "failed", timestamp: "5h ago", reason: "Incorrect password" },
  { id: "l4", user: "admin@portfolio.dev", ip: "198.51.100.22", location: "London, UK", device: "Windows PC", browser: "Firefox 128", status: "success", timestamp: "1d ago" },
  { id: "l5", user: "admin@portfolio.dev", ip: "89.45.67.12", location: "Beijing, CN", device: "Unknown", browser: "Edge 126", status: "failed", timestamp: "2d ago", reason: "2FA code required" },
  { id: "l6", user: "admin@portfolio.dev", ip: "192.0.2.88", location: "Berlin, DE", device: "Pixel 8", browser: "Chrome 125", status: "success", timestamp: "3d ago" },
  { id: "l7", user: "admin@portfolio.dev", ip: "10.0.0.55", location: "Paris, FR", device: "iPad Air", browser: "Safari 17.5", status: "success", timestamp: "1w ago" },
  { id: "l8", user: "admin@portfolio.dev", ip: "78.92.14.33", location: "Lagos, NG", device: "Unknown", browser: "Opera 112", status: "failed", timestamp: "1w ago", reason: "IP not whitelisted" },
];

export const MOCK_FAILED_LOGINS: LoginEntry[] = MOCK_LOGIN_HISTORY.filter((l) => l.status === "failed");

export const MOCK_IP_WHITELIST: IPEntry[] = [
  { id: "w1", address: "192.168.1.0/24", reason: "Office network", addedBy: "admin", addedAt: "2026-01-15", expiresAt: null, status: "active" },
  { id: "w2", address: "10.0.0.0/8", reason: "VPN tunnel", addedBy: "admin", addedAt: "2026-02-20", expiresAt: null, status: "active" },
  { id: "w3", address: "203.0.113.45", reason: "Remote developer", addedBy: "admin", addedAt: "2026-03-10", expiresAt: "2026-08-10", status: "active" },
  { id: "w4", address: "198.51.100.0/24", reason: "Staging servers", addedBy: "admin", addedAt: "2026-04-05", expiresAt: null, status: "active" },
];

export const MOCK_IP_BLACKLIST: IPEntry[] = [
  { id: "b1", address: "45.33.22.11", reason: "Brute force attempt", addedBy: "auto", addedAt: "2026-06-28", expiresAt: null, status: "active" },
  { id: "b2", address: "89.45.67.12", reason: "Suspicious activity", addedBy: "auto", addedAt: "2026-06-27", expiresAt: "2026-07-27", status: "active" },
  { id: "b3", address: "78.92.14.33", reason: "Unauthorized access", addedBy: "admin", addedAt: "2026-06-25", expiresAt: null, status: "active" },
  { id: "b4", address: "185.220.101.0/24", reason: "Known malicious", addedBy: "auto", addedAt: "2026-05-10", expiresAt: null, status: "active" },
  { id: "b5", address: "103.235.46.0/24", reason: "Spam source", addedBy: "auto", addedAt: "2026-04-15", expiresAt: "2026-07-15", status: "active" },
];

export const MOCK_RATE_LIMITS: RateLimit[] = [
  { endpoint: "/api/auth/login", limit: 10, window: "15 min", current: 3, remaining: 7, resetIn: "12 min" },
  { endpoint: "/api/auth/register", limit: 3, window: "60 min", current: 1, remaining: 2, resetIn: "45 min" },
  { endpoint: "/api/auth/2fa", limit: 5, window: "15 min", current: 2, remaining: 3, resetIn: "8 min" },
  { endpoint: "/api/*/password-reset", limit: 3, window: "24 h", current: 0, remaining: 3, resetIn: "-" },
  { endpoint: "/api/admin/*", limit: 100, window: "15 min", current: 42, remaining: 58, resetIn: "11 min" },
  { endpoint: "/api/*", limit: 1000, window: "1 min", current: 234, remaining: 766, resetIn: "42s" },
];

export const MOCK_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
  expirationDays: 90,
  historyCount: 5,
  maxAttempts: 5,
  lockoutDuration: 30,
};

export const MOCK_ROLES: Role[] = [
  { id: "r1", name: "Super Admin", description: "Full system access", users: 2, permissions: ["all"], color: "var(--color-accent)" },
  { id: "r2", name: "Admin", description: "Administrative access", users: 5, permissions: ["users:read", "users:write", "content:read", "content:write", "analytics:read", "settings:read", "settings:write"], color: "#10b981" },
  { id: "r3", name: "Editor", description: "Content management", users: 12, permissions: ["content:read", "content:write", "media:read", "media:write", "analytics:read"], color: "#f59e0b" },
  { id: "r4", name: "Analyst", description: "Read-only analytics", users: 8, permissions: ["analytics:read", "content:read"], color: "#8b5cf6" },
  { id: "r5", name: "Viewer", description: "Read-only access", users: 20, permissions: ["content:read"], color: "#06b6d4" },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "a1", user: "admin@portfolio.dev", action: "user.login", resource: "session", details: "Successful login from San Francisco, US", ip: "192.168.1.42", timestamp: "2 min ago", severity: "info" },
  { id: "a2", user: "admin@portfolio.dev", action: "user.login", resource: "session", details: "Successful login from New York, US", ip: "203.0.113.45", timestamp: "2h ago", severity: "info" },
  { id: "a3", user: "system", action: "auth.failed", resource: "login", details: "Failed login attempt from Moscow, RU", ip: "45.33.22.11", timestamp: "5h ago", severity: "warning" },
  { id: "a4", user: "admin@portfolio.dev", action: "role.update", resource: "permissions", details: "Updated Editor role permissions", ip: "192.168.1.42", timestamp: "1d ago", severity: "info" },
  { id: "a5", user: "system", action: "ip.blacklisted", resource: "security", details: "Auto-blacklisted IP 45.33.22.11", ip: "45.33.22.11", timestamp: "5h ago", severity: "warning" },
  { id: "a6", user: "admin@portfolio.dev", action: "api_key.created", resource: "api", details: "Created new API key: staging-deploy-key", ip: "192.168.1.42", timestamp: "2d ago", severity: "info" },
  { id: "a7", user: "system", action: "backup.completed", resource: "database", details: "Automated backup completed", ip: "-", timestamp: "1d ago", severity: "info" },
  { id: "a8", user: "admin@portfolio.dev", action: "env.rotated", resource: "environment", details: "Rotated DATABASE_URL for production", ip: "192.168.1.42", timestamp: "3d ago", severity: "critical" },
  { id: "a9", user: "system", action: "alert.triggered", resource: "monitoring", details: "Rate limit threshold reached on /api/auth/login", ip: "89.45.67.12", timestamp: "2d ago", severity: "warning" },
  { id: "a10", user: "admin@portfolio.dev", action: "encryption.key_rotated", resource: "database", details: "Rotated database encryption key", ip: "192.168.1.42", timestamp: "1w ago", severity: "critical" },
  { id: "a11", user: "admin@portfolio.dev", action: "2fa.enabled", resource: "security", details: "Enabled two-factor authentication", ip: "192.168.1.42", timestamp: "1w ago", severity: "info" },
  { id: "a12", user: "system", action: "session.expired", resource: "session", details: "Expired inactive session for admin@portfolio.dev", ip: "198.51.100.22", timestamp: "4d ago", severity: "info" },
];

export const MOCK_ALERTS: SecurityAlert[] = [
  { id: "al1", title: "Brute Force Attack Detected", description: "12 attempts in 5 minutes from Moscow", severity: "critical", status: "investigating", timestamp: "5h ago", source: "Rate Limiter" },
  { id: "al2", title: "New Device Login", description: "First login from unknown device in Beijing", severity: "high", status: "open", timestamp: "2d ago", source: "Auth Service" },
  { id: "al3", title: "API Rate Limit Warning", description: "80% of rate limit threshold reached", severity: "medium", status: "open", timestamp: "2d ago", source: "Rate Limiter" },
  { id: "al4", title: "SSL Certificate Expiring", description: "Wildcard certificate expires in 14 days", severity: "medium", status: "open", timestamp: "3d ago", source: "Certificate Manager" },
  { id: "al5", title: "Database Backup Failed", description: "Disk space critical on replica-2", severity: "high", status: "resolved", timestamp: "4d ago", source: "Backup Service" },
  { id: "al6", title: "Suspicious API Key Usage", description: "Key used from unrecognized IP range", severity: "high", status: "resolved", timestamp: "5d ago", source: "API Gateway" },
  { id: "al7", title: "Dependency Vulnerability", description: "CVE-2026-1234 in lodash", severity: "critical", status: "resolved", timestamp: "1w ago", source: "Dependency Scanner" },
];

export const MOCK_API_KEYS: APIKey[] = [
  { id: "k1", name: "Production API Key", key: "sk-prod-••••••••a3f8", permissions: ["read", "write"], created: "2026-01-15", expires: null, lastUsed: "2 min ago", status: "active" },
  { id: "k2", name: "Staging Deploy Key", key: "sk-staging-••••••b2c4", permissions: ["read", "write", "delete"], created: "2026-03-20", expires: "2026-09-20", lastUsed: "1h ago", status: "active" },
  { id: "k3", name: "CI/CD Pipeline Key", key: "sk-ci-••••••••d5e6", permissions: ["read", "write"], created: "2026-04-10", expires: null, lastUsed: "3d ago", status: "revoked" },
  { id: "k4", name: "Analytics Reporting", key: "sk-analytics-•••f7g8", permissions: ["read"], created: "2026-05-01", expires: "2026-11-01", lastUsed: "1d ago", status: "active" },
  { id: "k5", name: "Mobile App Key", key: "sk-mobile-••••••h9j0", permissions: ["read"], created: "2026-02-01", expires: "2026-08-01", lastUsed: "1w ago", status: "expired" },
];

export const MOCK_ENV_VARS: EnvVar[] = [
  { id: "e1", key: "DATABASE_URL", value: "postgresql://prod:••••@db.portfolio.dev:5432/portfolio", environment: "Production", lastRotated: "3d ago", sensitive: true },
  { id: "e2", key: "REDIS_URL", value: "redis://:••••@redis.portfolio.dev:6379", environment: "Production", lastRotated: "1w ago", sensitive: true },
  { id: "e3", key: "JWT_SECRET", value: "••••••••••••••••••••••••••••", environment: "Production", lastRotated: "2w ago", sensitive: true },
  { id: "e4", key: "SENDGRID_API_KEY", value: "SG.••••••••••••••••••••", environment: "Production", lastRotated: "1m ago", sensitive: true },
  { id: "e5", key: "NEXT_PUBLIC_GA_ID", value: "G-XXXXXXXXXX", environment: "All", lastRotated: "-", sensitive: false },
  { id: "e6", key: "STRIPE_SECRET_KEY", value: "sk_live_••••••••••••••", environment: "Production", lastRotated: "3w ago", sensitive: true },
  { id: "e7", key: "OPENAI_API_KEY", value: "sk-••••••••••••••••••••", environment: "Production", lastRotated: "5d ago", sensitive: true },
  { id: "e8", key: "DATABASE_URL_STAGING", value: "postgresql://staging:••••@db-staging.portfolio.dev:5432/portfolio_staging", environment: "Staging", lastRotated: "1w ago", sensitive: true },
];

export const MOCK_RECOVERY_CODES: RecoveryCode[] = [
  { code: "A1B2-C3D4-E5F6", used: false, usedAt: null },
  { code: "G7H8-I9J0-K1L2", used: false, usedAt: null },
  { code: "M3N4-O5P6-Q7R8", used: false, usedAt: null },
  { code: "S9T0-U1V2-W3X4", used: false, usedAt: null },
  { code: "Y5Z6-A7B8-C9D0", used: false, usedAt: null },
  { code: "E1F2-G3H4-I5J6", used: false, usedAt: null },
  { code: "K7L8-M9N0-O1P2", used: true, usedAt: "2026-06-15" },
  { code: "Q3R4-S5T6-U7V8", used: true, usedAt: "2026-06-10" },
];

export const MOCK_BACKUP_STATUS: BackupStatus = {
  lastBackup: "1h ago",
  lastBackupSize: "2.4 GB",
  nextBackup: "23h from now",
  schedule: "Daily at 03:00 UTC",
  status: "healthy",
  totalBackups: 28,
  storageUsed: "67.2 GB",
  storageAllocated: "200 GB",
  databases: [
    { name: "PostgreSQL (Production)", size: "1.8 GB", lastBackup: "1h ago", status: "success" },
    { name: "PostgreSQL (Staging)", size: "420 MB", lastBackup: "1h ago", status: "success" },
    { name: "MongoDB (Analytics)", size: "240 MB", lastBackup: "2h ago", status: "success" },
    { name: "Redis (Cache)", size: "12 MB", lastBackup: "1h ago", status: "success" },
  ],
};

export const MOCK_SCORE: SecurityScore = {
  overall: 82,
  categories: [
    { name: "Authentication", score: 90, max: 100 },
    { name: "Access Control", score: 75, max: 100 },
    { name: "Data Protection", score: 85, max: 100 },
    { name: "Monitoring", score: 70, max: 100 },
    { name: "Secrets Management", score: 80, max: 100 },
    { name: "Backup & Recovery", score: 95, max: 100 },
  ],
  findings: [
    { severity: "critical", count: 1, label: "Critical" },
    { severity: "high", count: 3, label: "High" },
    { severity: "medium", count: 5, label: "Medium" },
    { severity: "low", count: 8, label: "Low" },
  ],
};

export const MOCK_JWT_CONFIG: JWTConfig = {
  accessTokenTTL: "15 minutes",
  refreshTokenTTL: "7 days",
  rememberMeTTL: "30 days",
  algorithm: "RS256",
  keyId: "k4e9f8d2-a1b3-4c5d-8e6f-7a0b1c2d3e4f",
  created: "2 weeks ago",
  nextRotation: "10 weeks",
};
