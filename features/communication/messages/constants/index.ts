export { MOCK_MESSAGES, MOCK_CONTACT_REQUESTS } from "./mock-data";

import { Mail, Flag, MessageSquare, TrendingUp, Users } from "lucide-react";
import type { MessageStatus, MessageSource } from "../types";

export const STATUS_OPTIONS: { value: MessageStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "" },
  { value: "unread", label: "Unread", color: "text-accent" },
  { value: "read", label: "Read", color: "text-text-tertiary" },
  { value: "flagged", label: "Flagged", color: "text-warning" },
];

export const SOURCE_OPTIONS: { value: MessageSource | "all"; label: string }[] = [
  { value: "all", label: "All Sources" },
  { value: "contact-form", label: "Contact Form" },
  { value: "newsletter", label: "Newsletter" },
  { value: "direct", label: "Direct" },
];

export const STAT_CARDS = [
  { key: "total", label: "Total", icon: Mail },
  { key: "unread", label: "Unread", icon: MessageSquare },
  { key: "flagged", label: "Flagged", icon: Flag },
  { key: "newLeads", label: "New Leads", icon: Users },
  { key: "contacted", label: "Contacted", icon: TrendingUp },
] as const;
