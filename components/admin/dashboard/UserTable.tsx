"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Download, Loader2 } from "lucide-react";
import { downloadCSV } from "@/lib/csv";
import { RoleBadge, StatusBadge, VerifiedBadge, UserAvatar } from "./user-table/user-badges";
import { UserActions } from "./user-table/user-actions";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
}

interface Props {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onChangeRole: (userId: string, newRole: string) => void;
  onUpdateStatus: (userId: string, newStatus: string) => void;
  onDelete: (userId: string) => void;
  onClearSearch: () => void;
}

export function UserTable({ users, loading, onEdit, onChangeRole, onUpdateStatus, onDelete, onClearSearch }: Props) {
  const exportCSV = () => {
    const headers = ["Name", "Email", "Role", "Status", "Verified", "Joined Date"];
    const rows = users.map((u) => [u.name, u.email, u.role, u.status, u.isVerified ? "Yes" : "No", new Date(u.createdAt).toLocaleDateString()]);
    downloadCSV([headers, ...rows], `users_report_${new Date().toISOString().split("T")[0]}.csv`);
  };

  return (
    <div>
      <div className="flex justify-end px-6 py-3 border-b border-border-subtle">
        <Button
          onClick={exportCSV}
          variant="outline"
          size="sm"
          className="h-8 rounded-lg text-xs border-border-subtle"
          disabled={users.length === 0 || loading}
        >
          <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border-subtle">
              <TableHead className="font-medium text-text-tertiary py-3 px-4 text-xs">User</TableHead>
              <TableHead className="font-medium text-text-tertiary hidden md:table-cell text-xs">Role</TableHead>
              <TableHead className="font-medium text-text-tertiary text-xs">Status</TableHead>
              <TableHead className="font-medium text-text-tertiary hidden lg:table-cell text-xs">Verified</TableHead>
              <TableHead className="font-medium text-text-tertiary hidden sm:table-cell text-xs">Joined</TableHead>
              <TableHead className="text-right font-medium text-text-tertiary px-4 text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin text-text-tertiary mx-auto" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 text-text-tertiary">
                    <Search className="h-8 w-8 opacity-30" />
                    <p className="text-sm font-medium">No users found</p>
                    <Button variant="link" onClick={onClearSearch} className="text-xs text-accent">Clear search</Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id} className="hover:bg-surface-hover border-border-subtle transition-colors">
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} verified={user.isVerified} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-text-primary truncate">{user.name}</span>
                        <span className="text-xs text-text-tertiary truncate">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><RoleBadge role={user.role} /></TableCell>
                  <TableCell><StatusBadge status={user.status} /></TableCell>
                  <TableCell className="hidden lg:table-cell"><VerifiedBadge verified={user.isVerified} /></TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-text-tertiary">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right px-4">
                    <UserActions
                      role={user.role}
                      status={user.status}
                      onEdit={() => onEdit(user)}
                      onChangeRole={() => onChangeRole(user._id, user.role === "admin" ? "user" : "admin")}
                      onToggleStatus={() => onUpdateStatus(user._id, user.status === "active" ? "banned" : "active")}
                      onDelete={() => onDelete(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
