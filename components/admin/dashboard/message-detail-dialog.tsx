"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Mail, User, Calendar } from "lucide-react";
import type { ContactMessage } from "@/shared/types";

interface MessageDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: ContactMessage | null;
}

export function MessageDetailDialog({ open, onOpenChange, message }: MessageDetailDialogProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle>{message.subject}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="flex justify-between items-start bg-surface rounded-lg p-4 border border-border-subtle">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-text-tertiary font-medium">
                <User className="h-3.5 w-3.5" />
                From
              </div>
              <p className="text-sm font-medium text-text-primary">{message.name}</p>
              <p className="text-xs text-text-tertiary">{message.email}</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 text-xs text-text-tertiary font-medium justify-end">
                <Calendar className="h-3.5 w-3.5" />
                Date
              </div>
              <p className="text-sm font-medium text-text-primary">{message.createdAt ? new Date(message.createdAt).toLocaleString() : ""}</p>
            </div>
          </div>
          <div className="bg-background border border-border-subtle rounded-lg p-5">
            <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>
        <DialogFooter className="gap-2 flex-col sm:flex-row pt-2">
          {message.userId && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                onOpenChange(false);
                localStorage.setItem("selectedChatUser", message.userId!);
                setTimeout(() => window.dispatchEvent(new Event("chatUserSelected")), 100);
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reply via Chat
            </Button>
          )}
          <Link
            href={`mailto:${message.email}?subject=${encodeURIComponent("Re: " + message.subject)}&body=${encodeURIComponent("\n\n--- Original Message ---\n" + (message.message.length > 500 ? message.message.substring(0, 500) + "..." : message.message))}`}
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-5 font-medium text-sm hover:brightness-110 transition-all flex-1 h-9"
          >
            <Mail className="w-4 h-4 mr-2" />
            Reply via Email
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
