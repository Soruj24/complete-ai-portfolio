"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Inbox } from "lucide-react";

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

export function ContactInquiries({ messages, onDelete, onViewFull }: ContactInquiriesProps) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border-subtle">
            <TableHead className="font-medium text-text-tertiary py-3 px-4 text-xs">Sender</TableHead>
            <TableHead className="font-medium text-text-tertiary text-xs hidden sm:table-cell">Subject</TableHead>
            <TableHead className="font-medium text-text-tertiary text-xs">Message</TableHead>
            <TableHead className="font-medium text-text-tertiary text-xs hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right font-medium text-text-tertiary px-4 text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-16">
                <div className="flex flex-col items-center gap-2 text-text-tertiary">
                  <Inbox className="h-8 w-8 opacity-30" />
                  <p className="text-sm font-medium">No inquiries yet</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            messages.map((msg) => (
              <TableRow key={msg._id} className="hover:bg-surface-hover border-border-subtle transition-colors">
                <TableCell className="py-3 px-4">
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-text-primary truncate">{msg.name}</span>
                    <span className="text-xs text-text-tertiary truncate">{msg.email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-text-secondary hidden sm:table-cell truncate max-w-[120px]">
                  {msg.subject}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="text-sm text-text-secondary line-clamp-1">{msg.message}</p>
                </TableCell>
                <TableCell className="text-xs text-text-tertiary hidden md:table-cell">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right px-4">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-text-tertiary" onClick={() => onViewFull(msg)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-error/60 hover:text-error hover:bg-error/10" onClick={() => onDelete(msg._id)}>
                      <Trash2 className="h-3.5 w-3.5" />
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
