export interface BackupEntry {
  id: string;
  name: string;
  size: string;
  type: "full" | "incremental";
  status: "completed" | "running" | "failed";
  tables: number;
  createdAt: string;
  completedAt?: string;
}
