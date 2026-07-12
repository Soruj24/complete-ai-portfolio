import { registerResource } from "@/lib/admin/registry";
import type { FieldDef } from "@/types/admin";

const analyticsFields: FieldDef[] = [
  { key: "metric", label: "Metric", type: "text", sortable: true },
  { key: "value", label: "Value", type: "text", sortable: true },
  { key: "change", label: "Change", type: "text", sortable: true },
  { key: "date", label: "Date", type: "datetime", sortable: true },
];

const analyticsConfig = (path: string, name: string, desc: string, icon: string) => ({
  name, nameSingular: "Entry", description: desc, icon, path,
  endpoint: `/api/admin/analytics${path.replace("/admin/analytics", "")}`,
  features: { create: false, update: false, del: false, archive: false, export: true } as const,
  fields: analyticsFields,
});

registerResource("/admin/analytics/traffic", analyticsConfig("/admin/analytics/traffic", "Traffic Analytics", "Website traffic and page views", "Activity"));
registerResource("/admin/analytics/search", analyticsConfig("/admin/analytics/search", "Search Analytics", "Internal search queries and results", "SearchIcon"));
registerResource("/admin/analytics/visitors", analyticsConfig("/admin/analytics/visitors", "Visitor Map", "Geographic visitor data", "Map"));
registerResource("/admin/analytics/github", analyticsConfig("/admin/analytics/github", "GitHub Stats", "GitHub repository statistics", "BarChart3"));
registerResource("/admin/analytics/ai", analyticsConfig("/admin/analytics/ai", "AI Analytics", "AI feature usage metrics", "Brain"));
