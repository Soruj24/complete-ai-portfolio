"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Ban } from "lucide-react";

interface StatsProps {
  activeUsers: number;
  totalAdmins: number;
  bannedUsers: number;
}

export function DashboardStats({ activeUsers, totalAdmins, bannedUsers }: StatsProps) {
  const stats = [
    {
      label: "Active Users",
      value: activeUsers,
      icon: CheckCircle,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-white/20",
    },
    {
      label: "Total Admins",
      value: totalAdmins,
      icon: ShieldCheck,
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-white/20",
    },
    {
      label: "Banned Users",
      value: bannedUsers,
      icon: Ban,
      gradient: "from-red-500 to-red-600",
      iconBg: "bg-white/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className={`border-none shadow-sm dark:shadow-none bg-gradient-to-br ${stat.gradient} text-white transform transition-all duration-300 hover:scale-[1.02] rounded-[20px] md:rounded-[24px]`}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 dark:text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-2xl md:text-3xl font-black mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.iconBg} p-2.5 md:p-3 rounded-xl md:rounded-2xl backdrop-blur-sm`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
