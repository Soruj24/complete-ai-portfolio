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
import { Trash2 } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface ContactInquiriesProps {
  messages: ContactMessage[];
  onDelete: (id: string) => void;
  onViewFull: (msg: ContactMessage) => void;
}

export function ContactInquiries({
  messages,
  onDelete,
  onViewFull,
}: ContactInquiriesProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50/50 dark:bg-slate-900/50">
          <TableRow className="hover:bg-transparent border-gray-100 dark:border-slate-800">
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 py-4 text-[10px] md:text-sm">Sender</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm hidden sm:table-cell">Subject</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm">Message</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-sm">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-20 text-gray-400 dark:text-slate-500 font-bold">
                <p>No contact inquiries yet.</p>
              </TableCell>
            </TableRow>
          ) : (
            messages.map((msg) => (
              <TableRow
                key={msg._id}
                className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-gray-100 dark:border-slate-800 transition-all group"
              >
                <TableCell className="py-4 md:py-5">
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-gray-900 dark:text-slate-100 text-[10px] md:text-sm truncate">{msg.name}</span>
                    <span className="text-[8px] md:text-xs text-gray-500 dark:text-slate-400 truncate">{msg.email}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-slate-200 text-[10px] md:text-sm hidden sm:table-cell">{msg.subject}</TableCell>
                <TableCell className="max-w-[120px] md:max-w-md">
                  <p className="text-[10px] md:text-sm text-gray-600 dark:text-slate-400 line-clamp-1 md:line-clamp-2">{msg.message}</p>
                  <span className="md:hidden text-[8px] text-gray-400 mt-1 block">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-gray-500 dark:text-slate-400 font-medium">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 md:h-9 rounded-lg md:rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-[8px] md:text-xs"
                      onClick={() => onViewFull(msg)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(msg._id)}
                      className="h-8 w-8 md:h-9 md:w-9 rounded-lg md:rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
