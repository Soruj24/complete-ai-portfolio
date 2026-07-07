"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Check, X } from "lucide-react";
import type { PermissionGroup } from "../types";

const GROUPS: PermissionGroup[] = [
  { name: "Content", permissions: [
    { id: "perm-1", name: "View Projects", key: "projects:view", description: "View project listings and details", group: "Content", roles: ["Admin", "Editor", "Author", "Moderator", "Viewer"] },
    { id: "perm-2", name: "Create Projects", key: "projects:create", description: "Create new projects", group: "Content", roles: ["Admin", "Editor", "Author"] },
    { id: "perm-3", name: "Edit Projects", key: "projects:edit", description: "Edit existing projects", group: "Content", roles: ["Admin", "Editor"] },
    { id: "perm-4", name: "Delete Projects", key: "projects:delete", description: "Delete projects", group: "Content", roles: ["Admin"] },
    { id: "perm-5", name: "Manage Blogs", key: "blogs:manage", description: "Full blog management", group: "Content", roles: ["Admin", "Editor"] },
    { id: "perm-6", name: "Manage Media", key: "media:manage", description: "Upload and manage media", group: "Content", roles: ["Admin", "Editor", "Author"] },
  ]},
  { name: "System", permissions: [
    { id: "perm-7", name: "Manage Users", key: "users:manage", description: "Create, edit, delete users", group: "System", roles: ["Admin", "Super Admin"] },
    { id: "perm-8", name: "Manage Roles", key: "roles:manage", description: "Create and assign roles", group: "System", roles: ["Admin", "Super Admin"] },
    { id: "perm-9", name: "View Logs", key: "logs:view", description: "View system and audit logs", group: "System", roles: ["Admin", "Moderator"] },
    { id: "perm-10", name: "System Settings", key: "system:settings", description: "Modify system settings", group: "System", roles: ["Admin", "Super Admin"] },
  ]},
  { name: "Analytics", permissions: [
    { id: "perm-11", name: "View Analytics", key: "analytics:view", description: "View analytics dashboard", group: "Analytics", roles: ["Admin", "Editor", "Viewer"] },
    { id: "perm-12", name: "Export Data", key: "analytics:export", description: "Export analytics data", group: "Analytics", roles: ["Admin", "Editor"] },
  ]},
  { name: "Communication", permissions: [
    { id: "perm-13", name: "Manage Messages", key: "messages:manage", description: "View and reply to messages", group: "Communication", roles: ["Admin", "Moderator"] },
    { id: "perm-14", name: "Send Newsletter", key: "newsletter:send", description: "Send newsletter campaigns", group: "Communication", roles: ["Admin"] },
  ]},
  { name: "Settings", permissions: [
    { id: "perm-15", name: "Manage Settings", key: "settings:manage", description: "Modify all settings", group: "Settings", roles: ["Admin", "Super Admin"] },
    { id: "perm-16", name: "Manage API Keys", key: "api-keys:manage", description: "Create and revoke API keys", group: "Settings", roles: ["Admin"] },
    { id: "perm-17", name: "Manage Security", key: "security:manage", description: "Manage security settings", group: "Settings", roles: ["Admin", "Super Admin"] },
  ]},
];

const ALL_ROLES = ["Super Admin", "Admin", "Editor", "Author", "Moderator", "Viewer"];

export function PermissionsPage() {
  const [search, setSearch] = useState("");

  const filtered = GROUPS.map((g) => ({
    ...g, permissions: g.permissions.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.key.toLowerCase().includes(search.toLowerCase())),
  })).filter((g) => g.permissions.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary">Permissions</h1><p className="text-sm text-text-tertiary">Manage access permissions across roles</p></div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search permissions..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-primary bg-surface-primary">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
            <th className="p-3 font-medium">Permission</th><th className="p-3 font-medium">Key</th>
            {ALL_ROLES.map((r) => <th key={r} className="p-3 font-medium text-center">{r}</th>)}
          </tr></thead>
          <tbody>
            {filtered.flatMap((g) => [
              <tr key={`group-${g.name}`} className="border-b border-border-primary bg-surface-secondary/50">
                <td colSpan={2 + ALL_ROLES.length} className="p-2 px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider">{g.name}</td>
              </tr>,
              ...g.permissions.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                  className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                  <td className="p-3"><div><p className="font-medium text-text-primary">{p.name}</p><p className="text-xs text-text-tertiary">{p.description}</p></div></td>
                  <td className="p-3"><code className="rounded bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{p.key}</code></td>
                  {ALL_ROLES.map((r) => (
                    <td key={r} className="p-3 text-center">{p.roles.includes(r) ? <Check size={14} className="mx-auto text-success" /> : <X size={14} className="mx-auto text-text-tertiary opacity-40" />}</td>
                  ))}
                </motion.tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
    </div>
  );
}
