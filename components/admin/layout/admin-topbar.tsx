"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  toggleCommandPalette,
  toggleSidebar,
  setNotificationsOpen,
} from "@/lib/store/slices/ui-slice";
import { cn } from "@/lib/utils";
import {
  Command,
  Bell,
  Search,
  Menu,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function AdminTopbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const unreadCount = useAppSelector((s) => s.ui.unreadCount);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d.success) setUser(d.user); })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex h-14 items-center gap-4 border-b border-border-subtle bg-background/80 backdrop-blur-xl px-4 transition-all duration-300",
        collapsed ? "left-[68px]" : "left-60",
      )}
    >
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-surface hover:text-text-primary transition-colors lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="flex-1" />

      <button
        onClick={() => dispatch(toggleCommandPalette())}
        className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg border border-border-subtle text-xs text-text-tertiary hover:text-text-primary hover:border-border transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 ml-4 text-[10px] text-text-tertiary bg-surface px-1.5 py-0.5 rounded">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      <button
        onClick={() => dispatch(setNotificationsOpen(true))}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary hover:bg-surface hover:text-text-primary transition-colors"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[14px] flex items-center justify-center rounded-full bg-error text-[9px] font-semibold text-white px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <ModeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-border-subtle hover:ring-accent/30 transition-all">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "admin"}`} />
            <AvatarFallback className="text-xs bg-accent/10 text-accent">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-1.5">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">{user?.name || "Admin"}</p>
              <p className="text-xs text-text-tertiary">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin/profile" className="cursor-pointer">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/settings/general" className="cursor-pointer">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-error focus:text-error cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
