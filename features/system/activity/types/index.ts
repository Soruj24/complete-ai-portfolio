export interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  type: "create" | "update" | "delete" | "login" | "logout" | "export" | "settings";
  timestamp: string;
  ip?: string;
}
