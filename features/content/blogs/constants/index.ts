import { FileText, CheckCircle2, Clock, Trash2, Star, Eye, MessageSquare } from "lucide-react";
import type { BlogStatus } from "../types";

export const STATUS_OPTIONS: { value: BlogStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "" },
  { value: "published", label: "Published", color: "text-success" },
  { value: "review", label: "In Review", color: "text-warning" },
  { value: "draft", label: "Draft", color: "text-text-tertiary" },
  { value: "archived", label: "Archived", color: "text-error" },
];

export const STAT_CARDS = [
  { key: "total", label: "Total Posts", icon: FileText },
  { key: "published", label: "Published", icon: CheckCircle2 },
  { key: "draft", label: "Drafts", icon: Clock },
  { key: "archived", label: "Archived", icon: Trash2 },
  { key: "featured", label: "Featured", icon: Star },
  { key: "totalViews", label: "Total Views", icon: Eye },
  { key: "totalComments", label: "Comments", icon: MessageSquare },
] as const;

export { MOCK_BLOG_POSTS, CATEGORIES, TAGS } from "./mock-data";
