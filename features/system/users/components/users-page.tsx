"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, UserCheck, UserX, Shield, MoreHorizontal, Plus, Loader2 } from "lucide-react";
import type { User } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const STATUS_STYLE: Record<string, string> = {
  active: "bg-success/10 text-success", inactive: "bg-warning/10 text-warning", suspended: "bg-error/10 text-error",
};

export function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "users" });
  const items = response?.data ?? [];

  const filtered = items.filter((u: User) => {
    if (search) { const q = search.toLowerCase(); if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false; }
    if (filter !== "all" && u.status !== filter) return false;
    return true;
  });

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
        <div><h1 className="text-2xl font-bold text-text-primary">Users</h1><p className="text-sm text-text-tertiary">Manage system users</p></div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover"><Plus size={14} /> Add User</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Users", value: items.length, icon: Users, color: "text-accent" },
          { label: "Active", value: items.filter((u: User) => u.status === "active").length, icon: UserCheck, color: "text-success" },
          { label: "Inactive", value: items.filter((u: User) => u.status === "inactive").length, icon: UserX, color: "text-warning" },
          { label: "Suspended", value: items.filter((u: User) => u.status === "suspended").length, icon: Shield, color: "text-error" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {["all", "active", "inactive", "suspended"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${filter === s ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
            <Users size={40} className="mb-3 opacity-40" />
            <p className="font-medium">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
            <th className="p-3 font-medium">User</th><th className="p-3 font-medium">Role</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Joined</th><th className="p-3 font-medium">Last Login</th><th className="p-3 font-medium">Projects</th><th className="p-3 w-12"></th>
          </tr></thead><tbody>
            {filtered.map((u: User, i: number) => (
              <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                <td className="p-3"><div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">{u.name.charAt(0)}</div>
                  <div><p className="font-medium text-text-primary">{u.name}</p><p className="text-xs text-text-tertiary">{u.email}</p></div>
                </div></td>
                <td className="p-3"><span className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{u.role}</span></td>
                <td className="p-3"><span className={`rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_STYLE[u.status]}`}>{u.status}</span></td>
                <td className="p-3 text-xs text-text-secondary">{new Date(u.joinedAt).toLocaleDateString()}</td>
                <td className="p-3 text-xs text-text-secondary">{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "—"}</td>
                <td className="p-3 text-text-secondary">{u.projects}</td>
                <td className="p-3"><button className="text-text-tertiary hover:text-text-primary"><MoreHorizontal size={14} /></button></td>
              </motion.tr>
            ))}
          </tbody></table></div>
        )}
      </div>
    </div>
  );
}
