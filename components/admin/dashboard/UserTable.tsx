"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Settings,
  ShieldAlert,
  Ban,
  CheckCircle,
  Mail,
  Calendar,
  Search,
  Trash2,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onChangeRole: (userId: string, newRole: string) => void;
  onUpdateStatus: (userId: string, newStatus: string) => void;
  onDelete: (userId: string) => void;
  onClearSearch: () => void;
}

export function UserTable({
  users,
  loading,
  onEdit,
  onChangeRole,
  onUpdateStatus,
  onDelete,
  onClearSearch,
}: UserTableProps) {
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role", "Status", "Verified", "Joined Date"];
    const csvData = users.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.isVerified ? "Yes" : "No",
      new Date(user.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvData.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `users_report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="px-4 md:px-8 py-2 md:py-4 flex justify-end">
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="rounded-lg md:rounded-xl font-bold gap-2 border-gray-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 text-gray-700 h-9 md:h-11 px-3 md:px-4 text-xs md:text-sm"
          disabled={users.length === 0 || loading}
        >
          <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto no-scrollbar rounded-xl md:rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <Table>
        <TableHeader className="bg-gray-50/50 dark:bg-slate-900/80">
          <TableRow className="hover:bg-transparent border-gray-100 dark:border-slate-800">
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 py-3 md:py-4 px-4 md:px-6 text-[10px] md:text-xs uppercase tracking-wider">User</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 hidden md:table-cell text-[10px] md:text-xs uppercase tracking-wider">Role</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-xs uppercase tracking-wider">Status</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 hidden lg:table-cell text-[10px] md:text-xs uppercase tracking-wider">Verified</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 hidden sm:table-cell text-[10px] md:text-xs uppercase tracking-wider">Joined Date</TableHead>
            <TableHead className="text-right font-bold text-gray-700 dark:text-slate-300 px-4 md:px-6 text-[10px] md:text-xs uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 md:py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-500 dark:text-slate-400 font-bold tracking-tight text-xs md:text-sm">Syncing user data...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 md:py-20">
                <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-slate-600">
                  <Search className="h-8 w-8 md:h-10 md:w-10 opacity-20" />
                  <p className="font-medium text-base md:text-lg">No users found.</p>
                  <Button variant="link" onClick={onClearSearch} className="text-blue-600 dark:text-blue-400 text-xs md:text-sm">
                    Clear search
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user._id}
                className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-gray-100 dark:border-slate-800 transition-all group"
              >
                <TableCell className="py-3 md:py-5 px-4 md:px-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative shrink-0">
                      <div className="h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md transition-transform group-hover:scale-105 text-sm md:text-base">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.isVerified && (
                        <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 fill-green-50 dark:fill-green-950" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate text-xs md:text-sm">
                        {user.name}
                      </span>
                      <span className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1 truncate">
                        <Mail className="h-2.5 w-2.5 md:h-3 w-3 shrink-0" />
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-lg md:rounded-xl px-2 md:px-3 py-0.5 md:py-1 font-bold uppercase tracking-wider text-[8px] md:text-[10px] border-2",
                      user.role === "admin"
                        ? "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30"
                        : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30"
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-full px-2 md:px-3 py-0.5 md:py-1 font-bold text-[8px] md:text-[11px] shadow-sm whitespace-nowrap",
                      user.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100 border-none dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 hover:bg-red-100 border-none dark:bg-red-900/30 dark:text-red-400"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1 h-1 md:w-1.5 md:h-1.5 rounded-full mr-1 md:mr-2",
                        user.status === "active" ? "bg-green-500" : "bg-red-500"
                      )}
                    />
                    {user.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    {user.isVerified ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30 rounded-lg px-2 py-0.5 text-[9px] md:text-[10px] font-bold"
                      >
                        Verified
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-500 border-gray-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 rounded-lg px-2 py-0.5 text-[9px] md:text-[10px] font-bold"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-500 dark:text-slate-400 text-[10px] md:text-xs font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right px-4 md:px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-7 w-7 md:h-9 md:w-9 p-0 rounded-lg md:rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800">
                        <MoreHorizontal className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 md:w-56 rounded-xl md:rounded-2xl dark:bg-slate-900 dark:border-slate-800 p-1 md:p-2">
                      <DropdownMenuItem onClick={() => onEdit(user)} className="rounded-lg md:rounded-xl gap-2 md:gap-3 py-2 md:py-2.5 font-bold text-xs md:text-sm">
                        <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onChangeRole(user._id, user.role === "admin" ? "user" : "admin")} className="rounded-lg md:rounded-xl gap-2 md:gap-3 py-2 md:py-2.5 font-bold text-xs md:text-sm">
                        <ShieldAlert className="h-3.5 w-3.5 md:h-4 md:w-4" /> {user.role === "admin" ? "Make User" : "Make Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(user._id, user.status === "active" ? "banned" : "active")} className="rounded-lg md:rounded-xl gap-2 md:gap-3 py-2 md:py-2.5 font-bold text-xs md:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Ban className="h-3.5 w-3.5 md:h-4 md:w-4" /> {user.status === "active" ? "Ban User" : "Unban User"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="dark:bg-slate-800" />
                      <DropdownMenuItem onClick={() => onDelete(user._id)} className="rounded-lg md:rounded-xl gap-2 md:gap-3 py-2 md:py-2.5 font-bold text-xs md:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" /> Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
