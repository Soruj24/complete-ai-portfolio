export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  joinedAt: string;
  lastLogin?: string;
  projects: number;
}
