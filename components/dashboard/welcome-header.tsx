"use client";

import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Bell, Settings } from "lucide-react";

interface Props {
  session: Session;
}

export function WelcomeHeader({ session }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-blue-50 dark:border-blue-900/30 shadow-xl">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-black">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-4 border-white dark:border-gray-900 shadow-sm" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Welcome back, <span className="text-blue-600">{session.user.name || "User"}!</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 mt-1">
            <Mail className="h-4 w-4" />
            {session.user.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold gap-2 border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5 text-gray-400" />
          Notifications
        </Button>
        <Button className="rounded-2xl h-12 px-6 bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-black font-bold gap-2 shadow-lg shadow-gray-200 dark:shadow-none">
          <Settings className="h-5 w-5" />
          Account Settings
        </Button>
      </div>
    </div>
  );
}
