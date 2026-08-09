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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface p-8 rounded-[32px] shadow-sm border border-border-subtle">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-accent/10 shadow-xl">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-gradient-to-br from-accent to-accent-hover text-accent-foreground text-3xl font-black">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-success h-6 w-6 rounded-full border-4 border-surface shadow-sm" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">
            Welcome back, <span className="text-accent">{session.user.name || "User"}!</span>
          </h1>
          <p className="text-text-secondary font-medium flex items-center gap-2 mt-1">
            <Mail className="h-4 w-4" />
            {session.user.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold gap-2 border-border-subtle hover:bg-surface-hover">
          <Bell className="h-5 w-5 text-text-secondary" />
          Notifications
        </Button>
        <Button className="rounded-2xl h-12 px-6 bg-accent hover:bg-accent-hover text-accent-foreground font-bold gap-2 shadow-lg shadow-accent/10">
          <Settings className="h-5 w-5" />
          Account Settings
        </Button>
      </div>
    </div>
  );
}
