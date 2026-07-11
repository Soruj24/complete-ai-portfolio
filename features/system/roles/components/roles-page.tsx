"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import type { Role } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

export function RolesPage() {
  const [search, setSearch] = useState("");
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "roles" });
  const items = response?.data ?? [];

  const filtered = items.filter((r: Role) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));

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
        <div><h1 className="text-2xl font-bold text-text-primary">Roles</h1><p className="text-sm text-text-tertiary">Manage user roles and permissions</p></div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover"><Plus size={14} /> Create Role</button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search roles..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Shield size={40} className="mb-3 opacity-40" />
          <p className="font-medium">No roles found</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r: Role, i: number) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-4 hover:border-border-hover transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${r.color}20` }}>
                    <Shield size={20} style={{ color: r.color }} />
                  </div>
                  <div><p className="font-medium text-text-primary">{r.name}</p><p className="text-xs text-text-tertiary">{r.users} users</p></div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary"><Edit2 size={14} /></button>
                  <button className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-error"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-xs text-text-secondary mb-3 line-clamp-2">{r.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-tertiary">{r.permissions} permissions</span>
                <span className="text-text-tertiary">Created {new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
