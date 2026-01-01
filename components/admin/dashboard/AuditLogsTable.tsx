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

interface AuditLog {
  _id: string;
  createdAt: string;
  userEmail: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
}

interface AuditLogsTableProps {
  logs: AuditLog[];
}

export function AuditLogsTable({ logs }: AuditLogsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50/50 dark:bg-slate-900/50">
          <TableRow className="hover:bg-transparent border-gray-100 dark:border-slate-800">
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 py-4 text-[10px] md:text-sm">Timestamp</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm">Admin</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm">Action</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm hidden sm:table-cell">Target</TableHead>
            <TableHead className="text-right font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm hidden md:table-cell">IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-40 text-center text-gray-400 dark:text-slate-500 font-bold">
                No audit logs found.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/50 border-gray-100 dark:border-slate-800 transition-colors">
                <TableCell className="text-[10px] md:text-sm font-bold text-gray-500 dark:text-slate-400">
                  <div className="flex flex-col">
                    <span className="hidden md:inline">{new Date(log.createdAt).toLocaleString()}</span>
                    <span className="md:hidden">{new Date(log.createdAt).toLocaleDateString()}</span>
                    <span className="md:hidden text-[8px]">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col max-w-[80px] md:max-w-none">
                    <span className="font-black text-gray-900 dark:text-slate-100 text-[10px] md:text-sm truncate">{log.userEmail}</span>
                    <span className="text-[8px] md:text-[10px] font-bold text-gray-400 dark:text-slate-500 hidden md:inline">
                      ID: {log.userId.slice(-6)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-lg px-1.5 md:px-2.5 py-0.5 md:py-1 text-[8px] md:text-[10px] font-black uppercase tracking-wider border-none ${
                      log.action === "DELETE"
                        ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        : log.action === "ROLE_CHANGE"
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                        : log.action === "STATUS_CHANGE"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                        : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    }`}
                  >
                    {log.action}
                  </Badge>
                  <div className="mt-1 sm:hidden text-[8px] font-bold text-gray-400">
                    {log.entityType}
                  </div>
                </TableCell>
                <TableCell className="text-[10px] md:text-sm font-bold text-gray-600 dark:text-slate-300 hidden sm:table-cell">
                  {log.entityType} ({log.entityId.toString().slice(-6)})
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  <code className="text-[10px] font-bold bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded text-gray-400 dark:text-slate-500">
                    {log.ipAddress}
                  </code>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
