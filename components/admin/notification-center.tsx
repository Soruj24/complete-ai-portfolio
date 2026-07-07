"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setNotificationsOpen, markAllNotificationsRead, clearNotifications } from "@/lib/store/slices/ui-slice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function NotificationCenter() {
  const dispatch = useAppDispatch();
  const { notifications, notificationsOpen, unreadCount } = useAppSelector((s) => s.ui);

  return (
    <Sheet open={notificationsOpen} onOpenChange={(v) => dispatch(setNotificationsOpen(v))}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              {unreadCount > 0 && (
                <span className="inline-flex h-5 items-center rounded-full bg-accent/10 px-2 text-[10px] font-medium text-accent">
                  {unreadCount} new
                </span>
              )}
            </SheetTitle>
            <SheetDescription>Stay updated with system activity</SheetDescription>
          </div>
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => dispatch(markAllNotificationsRead())}>
                  <CheckCheck className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => dispatch(clearNotifications())}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-10 w-10 text-text-tertiary/50 mb-3" />
              <p className="text-sm font-medium text-text-secondary">No notifications</p>
              <p className="text-xs text-text-tertiary mt-1">You&apos;re all caught up!</p>
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                className={cn(
                  "w-full text-left rounded-lg p-3 transition-colors hover:bg-surface",
                  !n.read && "bg-accent/5",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "mt-1 h-2 w-2 shrink-0 rounded-full",
                    n.type === "success" && "bg-success",
                    n.type === "warning" && "bg-warning",
                    n.type === "error" && "bg-error",
                    n.type === "info" && "bg-info",
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm", !n.read && "font-medium text-text-primary", "text-text-secondary")}>
                      {n.title}
                    </p>
                    {n.description && (
                      <p className="text-xs text-text-tertiary mt-0.5 line-clamp-2">{n.description}</p>
                    )}
                    <p className="text-[10px] text-text-tertiary/60 mt-1">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
