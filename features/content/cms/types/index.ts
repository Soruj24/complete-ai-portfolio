import type { LucideIcon } from "lucide-react";

export type ContentStatus = "published" | "draft" | "empty";

export interface ContentSection {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  adminPath: string;
  publicPath: string;
  publicPageLabel: string;
  status: ContentStatus;
  itemCount: number;
  lastUpdated: string | null;
  enabled: boolean;
}

export interface CMSStats {
  total: number;
  published: number;
  draft: number;
  empty: number;
}
