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
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function NotificationCenter() {
  const dispatch = useAppDispatch();
  const { notifications, notificationsOpen, unreadCount } = useAppSelector((s) => s.ui);

  return (
    <Sheet open={notificationsOpen} onOpenChange={(v) => dispatch(setNotificationsOpen(v))}>
      <SheetContent className="w-full sm:max-w-sm">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="flex items-center gap-1.5 text-[14px]">
              <Bell className="h-3.5 w-3.5" />
              Notifications
              {unreadCount > 0 && (
                <span className="inline-flex h-4 items-center rounded bg-accent/10 px-1.5 text-[9px] font-medium text-accent">
                  {unreadCount} new
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="text-[12px]">Stay updated with system activity</SheetDescription>
          </div>
          <div className="flex items-center gap-0.5">
            {notifications.length > 0 && (
              <>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => dispatch(markAllNotificationsRead())}>
                  <CheckCheck className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => dispatch(clearNotifications())}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-0.5">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-8 w-8 text-text-tertiary/50 mb-2" />
              <p className="text-[13px] font-medium text-text-secondary">No notifications</p>
              <p className="text-[11px] text-text-tertiary mt-0.5">You&apos;re all caught up!</p>
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                className={cn(
                  "w-full text-left rounded-md p-2.5 transition-colors hover:bg-surface",
                  !n.read && "bg-accent/5",
                )}
              >
                <div className="flex items-start gap-2">
                  <div className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    n.type === "success" && "bg-success",
                    n.type === "warning" && "bg-warning",
                    n.type === "error" && "bg-error",
                    n.type === "info" && "bg-info",
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-[13px]", !n.read && "font-medium text-text-primary", "text-text-secondary")}>
                      {n.title}
                    </p>
                    {n.description && (
                      <p className="text-[11px] text-text-tertiary mt-0.5 line-clamp-2">{n.description}</p>
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
