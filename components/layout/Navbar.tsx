"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  User as UserIcon,
  Shield,
  Bell,
  FileText,
  Mail,
  Info,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === "admin" || user?.role === "ADMIN";
  const loading = status === "loading";
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState<
    {
      _id: string;
      userId: string;
      title?: string;
      message: string;
      type?: "info" | "success" | "warning" | "error";
      isRead: boolean;
      link?: string;
      createdAt: string;
    }[]
  >([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (user) {
      const fetchNotifications = async (isInitial = false) => {
        try {
          const res = await fetch("/api/notifications");

          // Check if response is JSON
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            return;
          }

          const data = await res.json();
          if (Array.isArray(data)) {
            const newUnreadCount = data.filter((n) => !n.isRead).length;
            
            // If not initial fetch and unread count increased, show toast
            if (!isInitial && newUnreadCount > unreadCount) {
              const newestNotification = data.find(n => !n.isRead);
              if (newestNotification) {
                import("sonner").then(({ toast }) => {
                  toast.info(newestNotification.title || "New Notification", {
                    description: newestNotification.message,
                    action: newestNotification.link ? {
                      label: "View",
                      onClick: () => router.push(newestNotification.link!)
                    } : undefined
                  });
                });
              }
            }
            
            setNotifications(data);
            setUnreadCount(newUnreadCount);
          }
        } catch (error) {
          console.error("Failed to fetch notifications", error);
        }
      };

      fetchNotifications(true);
      // Poll for new notifications every 10 seconds for admin
      const interval = setInterval(() => fetchNotifications(false), isAdmin ? 10000 : 30000);
      return () => clearInterval(interval);
    }
  }, [user, unreadCount, isAdmin]);

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        body: JSON.stringify({ all: true }),
      });
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const markAsRead = async (id: string, link?: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        body: JSON.stringify({ id }),
      });
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      if (link) {
        router.push(link);
      }
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });

      setMobileMenuOpen(false);

      // Redirect to home
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      // Fallback
      window.location.href = "/";
    }
  };

  // Navigation items for all users
  const publicNavigation = [{ name: "Portfolio", href: "/", icon: Home }];

  // Navigation items for authenticated users
  const userNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Admin", href: "/admin/dashboard", icon: Shield },
  ];

  // Filter admin link based on role
  const displayedUserNavigation = userNavigation.filter(
    (item) => item.name !== "Admin" || isAdmin
  );

  // Loading skeleton
  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />
              <div className="ml-2 h-6 w-24 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Desktop nav skeleton */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Mobile menu button skeleton */}
            <div className="flex md:hidden">
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none group-hover:scale-105 transition-transform duration-300">
                <Shield className="text-white h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                SORUJ<span className="text-blue-600">.</span>
              </span>
            </Link>

            {/* Desktop Navigation - Public Links */}
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-1">
              {publicNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm shadow-blue-100 dark:shadow-none"
                        : "text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/80 dark:hover:bg-slate-800/50"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                ))}
            </Button>

            {mounted && user ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 p-0 rounded-2xl shadow-xl border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 border-b bg-gray-50/50 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-700 h-7 px-2"
                        >
                          Mark all read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            onClick={() => markAsRead(n._id, n.link)}
                            className={cn(
                              "p-4 border-b last:border-0 cursor-pointer transition-colors",
                              !n.isRead
                                ? "bg-blue-50/40 hover:bg-blue-50/60"
                                : "hover:bg-gray-50"
                            )}
                          >
                            <div className="flex gap-3">
                              <div
                                className={cn(
                                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                  n.type === "success"
                                    ? "bg-green-100 text-green-600"
                                    : n.type === "warning"
                                      ? "bg-amber-100 text-amber-600"
                                      : n.type === "error"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-blue-100 text-blue-600"
                                )}
                              >
                                {n.type === "success" ? (
                                  <Shield className="h-4 w-4" />
                                ) : (
                                  <Bell className="h-4 w-4" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <p
                                  className={cn(
                                    "text-sm",
                                    !n.isRead
                                      ? "font-semibold text-gray-900"
                                      : "text-gray-600"
                                  )}
                                >
                                  {n.title || "New Notification"}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                  {n.message}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(n.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">
                            No notifications yet
                          </p>
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-6 w-[1px] bg-gray-200 mx-1" />

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="pl-1 pr-3 py-1 h-10 rounded-full hover:bg-gray-100 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-white shadow-sm">
                          <AvatarImage src={user?.image || ""} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-left hidden lg:flex">
                          <span className="text-sm font-bold text-gray-900 leading-none">
                            {user?.name}
                          </span>
                          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 p-2 rounded-2xl shadow-xl border-gray-100"
                  >
                    <DropdownMenuLabel className="px-2 py-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 font-medium truncate">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-100" />
                    {displayedUserNavigation.map((item) => (
                      <DropdownMenuItem
                        key={item.name}
                        asChild
                        className="rounded-lg focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
                      >
                        <Link
                          href={item.href}
                          className="flex items-center py-2 px-2"
                        >
                          <item.icon className="mr-2.5 h-4 w-4" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-gray-100" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer px-2 py-2"
                    >
                      <LogOut className="mr-2.5 h-4 w-4" />
                      <span className="font-bold">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  asChild
                  className="rounded-full px-5 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                ))}
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-blue-600"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  {/* User Info */}
                  {user && (
                    <div className="flex items-center space-x-3 p-4 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={
                            user?.image ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "user"}`
                          }
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <div className="flex-1 py-4">
                    <div className="space-y-1">
                      <div className="px-4 mb-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Main Menu
                        </h3>
                      </div>
                      {publicNavigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2",
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            {item.icon && (
                              <item.icon className="mr-3 h-5 w-5" />
                            )}
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>

                    {/* User Navigation - Only for authenticated users */}
                    {user && (
                      <>
                        <div className="mt-6 px-4">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Account
                          </h3>
                        </div>
                        <div className="mt-2 space-y-1">
                          {displayedUserNavigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2",
                                  isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-50"
                                )}
                              >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bottom Section */}
                  <div className="border-t p-4">
                    {user ? (
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full">
                            Sign in
                          </Button>
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Mobile notifications badge */}
                    {user && unreadCount > 0 && (
                      <div className="mt-3 flex items-center justify-center">
                        <Link
                          href="/notifications"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          Notifications
                          <span className="ml-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                            {unreadCount}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
