export interface CommandCenterStats {
  visitors: number;
  visitorsChange: number;
  resumeDownloads: number;
  resumeDownloadsChange: number;
  contactMessages: number;
  contactMessagesChange: number;
  githubContributions: number;
  githubContributionsChange: number;
  projectViews: number;
  projectViewsChange: number;
}

export interface ActivityItem {
  id: string;
  type: "create" | "update" | "delete" | "message" | "publish";
  description: string;
  entity: string;
  timestamp: string;
  user: string;
}

export interface SystemHealthStatus {
  database: "healthy" | "warning" | "error";
  storage: "healthy" | "warning" | "error";
  performance: "healthy" | "warning" | "error";
  uptime: number;
  details: {
    database: string;
    storage: string;
    performance: string;
  };
}

export interface DraftItem {
  id: string;
  title: string;
  type: "project" | "blog";
  status: string;
  updatedAt: string;
  href: string;
}

export interface CommandCenterData {
  stats: CommandCenterStats;
  activity: ActivityItem[];
  systemHealth: SystemHealthStatus;
  drafts: DraftItem[];
}
