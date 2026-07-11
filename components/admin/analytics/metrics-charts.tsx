"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart as RechartsAreaChart, BarChart as RechartsBarChart, LineChart as RechartsLineChart, PieChart as RechartsPieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell,
  Area as RechartsArea, Bar as RechartsBar, Line as RechartsLine, Pie as RechartsPie
} from "recharts";
import { Users, Eye, TrendingUp, Clock, LineChart as LineChartIcon, AreaChart as AreaChartIcon, BarChart3 as BarChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const EMPTY_CHART_DATA: never[] = [];
const EMPTY_DEVICES: never[] = [];
const EMPTY_BROWSERS: never[] = [];
const EMPTY_OS: never[] = [];

const COLORS_PIE = ["var(--color-accent)", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899"];

export function MetricsChartsSection() {
  const [chartTab, setChartTab] = useState("visitors");
  const { data: chartsResponse } = useGetAdminResourceQuery({ resource: "analytics/charts" });
  const chartsData = (chartsResponse?.data || {}) as Record<string, any>;
  const visitorsData = (chartsData.visitorsData || EMPTY_CHART_DATA) as any[];
  const pageviewsData = (chartsData.pageviewsData || EMPTY_CHART_DATA) as any[];
  const sessionDurations = (chartsData.sessionDurations || EMPTY_CHART_DATA) as any[];
  const bounceRates = (chartsData.bounceRates || EMPTY_CHART_DATA) as any[];
  const devices = (chartsData.devices || EMPTY_DEVICES) as any[];
  const browsers = (chartsData.browsers || EMPTY_BROWSERS) as any[];
  const operatingSystems = (chartsData.operatingSystems || EMPTY_OS) as any[];

  const totalVisitors = visitorsData.reduce((s, d) => s + d.value, 0);
  const totalPageviews = pageviewsData.reduce((s, d) => s + d.value, 0);
  const avgBounce = Math.round(bounceRates.reduce((s, d) => s + d.value, 0) / bounceRates.length);
  const avgDuration = Math.round(sessionDurations.reduce((s, d) => s + d.value, 0) / sessionDurations.length);

  return (
    <div className="space-y-4">
      {/* Core Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Visitors", value: totalVisitors.toLocaleString(), trend: 12.5, icon: Users, color: "text-accent" },
          { label: "Page Views", value: totalPageviews.toLocaleString(), trend: 18.2, icon: Eye, color: "text-purple-500" },
          { label: "Bounce Rate", value: `${avgBounce}%`, trend: -3.2, icon: TrendingUp, color: "text-amber-500", invert: true },
          { label: "Avg Session", value: `${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s`, trend: 5.8, icon: Clock, color: "text-success" },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-border-subtle bg-surface"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={cn("h-4 w-4", stat.color)} />
              <Badge variant="outline" className={cn(
                "text-[9px] px-1.5 py-0 rounded-full border-0 font-medium",
                stat.trend >= 0 ? "text-success bg-success/10" : "text-error bg-error/10",
              )}>
                {stat.trend >= 0 ? "+" : ""}{stat.trend}%
              </Badge>
            </div>
            <p className="text-xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-[10px] text-text-tertiary mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* New vs Returning */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="border-border-subtle bg-surface lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary">Visitors</CardTitle>
            <CardDescription>New vs returning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <RechartsPieChart>
                  <RechartsPie data={[
                    { name: "New Visitors", value: 68, color: "var(--color-accent)" },
                    { name: "Returning", value: 32, color: "#10b981" },
                  ]} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" startAngle={90} endAngle={-270}>
                    {[{ name: "New Visitors", value: 68, color: "var(--color-accent)" }, { name: "Returning", value: 32, color: "#10b981" }].map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </RechartsPie>
                  <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "10px", fontSize: "12px" }} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs mt-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-accent)" }} />
                <span className="text-text-secondary">New 68%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                <span className="text-text-secondary">Returning 32%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Tabs */}
        <Card className="border-border-subtle bg-surface lg:col-span-3">
          <CardHeader className="pb-2">
            <Tabs value={chartTab} onValueChange={setChartTab}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-text-primary">Charts</CardTitle>
                  <CardDescription>Visual analytics overview</CardDescription>
                </div>
                <TabsList className="bg-surface-hover p-0.5 rounded-lg">
                  <TabsTrigger value="visitors" className="rounded-md text-[10px] gap-1 data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7 px-2.5">
                    <LineChartIcon className="h-3 w-3" /> Line
                  </TabsTrigger>
                  <TabsTrigger value="pageviews" className="rounded-md text-[10px] gap-1 data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7 px-2.5">
                    <AreaChartIcon className="h-3 w-3" /> Area
                  </TabsTrigger>
                  <TabsTrigger value="duration" className="rounded-md text-[10px] gap-1 data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7 px-2.5">
                    <BarChartIcon className="h-3 w-3" /> Bar
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="visitors" className="mt-2">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={visitorsData.slice(-14)} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px" }} labelStyle={{ color: "var(--color-text-secondary)", fontWeight: 600 }} />
                      <RechartsLine type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "var(--color-accent)", stroke: "var(--color-background)", strokeWidth: 2 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="pageviews" className="mt-2">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart data={pageviewsData.slice(-14)} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                      <defs>
                        <linearGradient id="pv-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px" }} labelStyle={{ color: "var(--color-text-secondary)", fontWeight: 600 }} />
                      <RechartsArea type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#pv-gradient)" dot={false} activeDot={{ r: 4, fill: "var(--color-accent)", stroke: "var(--color-background)", strokeWidth: 2 }} />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="duration" className="mt-2">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={sessionDurations.slice(-14)} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} unit="s" />
                      <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px" }} labelStyle={{ color: "var(--color-text-secondary)", fontWeight: 600 }} />
                      <RechartsBar dataKey="value" fill="var(--color-accent)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>

      {/* Pie Charts Row: Devices / Browsers / OS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Devices", data: devices, dataKey: "name" as const },
          { title: "Browsers", data: browsers, dataKey: "name" as const },
          { title: "Operating Systems", data: operatingSystems, dataKey: "name" as const },
        ].map((section) => (
          <Card key={section.title} className="border-border-subtle bg-surface">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-text-primary">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsPie data={section.data} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="visitors" nameKey={section.dataKey}>
                      {section.data.map((_, i) => <Cell key={i} fill={COLORS_PIE[i % COLORS_PIE.length]} />)}
                    </RechartsPie>
                    <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "10px", fontSize: "12px" }}
                      formatter={(value: number, _name: string) => [`${value.toLocaleString()}`, "Visitors"]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {section.data.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: COLORS_PIE[i % COLORS_PIE.length] }} />
                      <span className="text-text-secondary">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-tertiary font-mono">{"percentage" in item ? `${item.percentage}%` : ""}</span>
                      <span className="text-text-primary font-semibold">{item.visitors.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
