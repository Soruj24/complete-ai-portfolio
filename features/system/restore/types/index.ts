export interface RestorePoint {
  id: string;
  backup: string;
  size: string;
  createdAt: string;
  type: "full" | "incremental";
  verified: boolean;
}
