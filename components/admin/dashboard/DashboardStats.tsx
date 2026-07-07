"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Ban } from "lucide-react";

interface StatsProps {
  activeUsers: number;
  totalAdmins: number;
  bannedUsers: number;
}

const statCards = [
  { label: "Active Users", key: "activeUsers", icon: Users, gradient: "from-accent/10 to-accent/5", iconBg: "bg-accent/10", iconColor: "text-accent" },
  { label: "Total Admins", key: "totalAdmins", icon: Shield, gradient: "from-info/10 to-info/5", iconBg: "bg-info/10", iconColor: "text-info" },
  { label: "Banned Users", key: "bannedUsers", icon: Ban, gradient: "from-error/10 to-error/5", iconBg: "bg-error/10", iconColor: "text-error" },
] as const;

export function DashboardStats({ activeUsers, totalAdmins, bannedUsers }: StatsProps) {
  const values = { activeUsers, totalAdmins, bannedUsers };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.label} className="border border-border-subtle shadow-none rounded-xl bg-surface overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary font-medium">{stat.label}</p>
                <p className="text-2xl font-semibold text-text-primary tracking-tight">
                  {values[stat.key]}
                </p>
              </div>
              <div className={`${stat.iconBg} p-2.5 rounded-xl`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-surface-hover overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-500`}
                style={{ width: `${Math.min(100, (values[stat.key] / 100) * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
