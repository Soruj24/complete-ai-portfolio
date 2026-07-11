"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Check, X, Loader2 } from "lucide-react";
import type { PermissionGroup } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const ALL_ROLES = ["Super Admin", "Admin", "Editor", "Author", "Moderator", "Viewer"];

export function PermissionsPage() {
  const [search, setSearch] = useState("");
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "permissions" });
  const items = response?.data ?? [];

  const GROUPS = useMemo(() => {
    const grouped = items.reduce((acc: Record<string, any[]>, p: any) => {
      if (!acc[p.group]) acc[p.group] = [];
      acc[p.group].push(p);
      return acc;
    }, {} as Record<string, any[]>);
    return Object.entries(grouped).map(([name, permissions]) => ({ name, permissions })) as PermissionGroup[];
  }, [items]);

  const filtered = GROUPS.map((g) => ({
    ...g, permissions: g.permissions.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.key.toLowerCase().includes(search.toLowerCase())),
  })).filter((g) => g.permissions.length > 0);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

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
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
            <Shield size={40} className="mb-3 opacity-40" />
            <p className="font-medium">No permissions found</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
