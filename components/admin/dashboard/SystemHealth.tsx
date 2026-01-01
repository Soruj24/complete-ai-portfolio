"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Database, 
  Cpu, 
  HardDrive, 
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthData {
  database: string;
  redis: string;
  system: {
    platform: string;
    cpuUsage: string;
    totalMemory: string;
    freeMemory: string;
    uptime: string;
  };
}

export function SystemHealth() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      const res = await fetch("/api/admin/system-health");
      
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        setHealth(data.health);
      } else {
        console.error("API Error:", data.error, data.details);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3].map((i) => (    <Card key={i} className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              <div className="h-6 w-20 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Database Health */}
      <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300 hover:scale-[1.02]">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="p-2.5 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl md:rounded-2xl">
              <Database className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Badge className={cn(
              "rounded-full px-3 md:px-4 py-0.5 md:py-1 font-bold text-[9px] md:text-[11px]",
              health?.database === "Healthy" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            )}>
              {health?.database === "Healthy" ? (
                <CheckCircle2 className="w-2.5 h-2.5 md:w-3 h-3 mr-1 md:mr-1.5" />
              ) : (
                <AlertCircle className="w-2.5 h-2.5 md:w-3 h-3 mr-1 md:mr-1.5" />
              )}
              {health?.database}
            </Badge>
          </div>
          <h3 className="text-base md:text-lg font-black text-gray-900 dark:text-white mb-1">Database</h3>
          <p className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400 font-medium">MongoDB Atlas Cluster</p>
        </CardContent>
      </Card>

      {/* Redis Health */}
      <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300 hover:scale-[1.02]">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="p-2.5 md:p-3 bg-red-50 dark:bg-red-900/20 rounded-xl md:rounded-2xl">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-red-600 dark:text-red-400" />
            </div>
            <Badge className={cn(
              "rounded-full px-3 md:px-4 py-0.5 md:py-1 font-bold text-[9px] md:text-[11px]",
              health?.redis === "Healthy" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            )}>
              {health?.redis === "Healthy" ? (
                <CheckCircle2 className="w-2.5 h-2.5 md:w-3 h-3 mr-1 md:mr-1.5" />
              ) : (
                <AlertCircle className="w-2.5 h-2.5 md:w-3 h-3 mr-1 md:mr-1.5" />
              )}
              {health?.redis}
            </Badge>
          </div>
          <h3 className="text-base md:text-lg font-black text-gray-900 dark:text-white mb-1">Redis Cache</h3>
          <p className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400 font-medium">Upstash Serverless</p>
        </CardContent>
      </Card>

      {/* System Health Card */}
      <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="p-2.5 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl md:rounded-2xl">
              <Activity className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-[8px] md:text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Uptime</p>
              <p className="text-xs md:text-sm font-bold text-purple-600 dark:text-purple-400">{health?.system.uptime}</p>
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 md:h-4 w-4 text-gray-400 dark:text-slate-500" />
                <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-slate-300">CPU Usage</span>
              </div>
              <span className="text-[10px] md:text-xs font-black text-gray-900 dark:text-white">{health?.system.cpuUsage}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-3.5 w-3.5 md:h-4 w-4 text-gray-400 dark:text-slate-500" />
                <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-slate-300">Memory</span>
              </div>
              <span className="text-[10px] md:text-xs font-black text-gray-900 dark:text-white">
                {health?.system.freeMemory} / {health?.system.totalMemory}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
