"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Monitor, ExternalLink, FileText, ArrowUpRight, MousePointerClick, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTablesData } from "./hooks/use-tables-data";
import { CountryRow } from "./rows/country-row";
import { SourceRow } from "./rows/source-row";
import { PageRow } from "./rows/page-row";
import { ProjectRow } from "./rows/project-row";
import type { ReferrerData, CityData, EngagementData } from "./types";

function CityRow({ item, index }: { item: CityData; index: number }) {
  return (
    <motion.tr key={`${item.name}-${index}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <span className="text-xs font-semibold text-text-primary">{item.name}</span>
      </td>
      <td className="py-2.5 px-3 text-right hidden sm:table-cell">
        <span className="text-[10px] text-text-tertiary">{item.country}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <span className="text-[10px] font-mono text-text-tertiary">{item.duration}</span>
      </td>
    </motion.tr>
  );
}

function ReferrerRow({ item, index }: { item: ReferrerData; index: number }) {
  return (
    <motion.tr key={item.domain} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2.5">
          <ExternalLink className="h-3 w-3 text-text-tertiary shrink-0" />
          <span className="text-xs font-semibold text-text-primary">{item.domain}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 text-right hidden md:table-cell">
        <div className="flex items-center gap-2 justify-end">
          <div className="h-1.5 w-20 rounded-full bg-background overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${item.percentage * 10}%` }} />
          </div>
          <span className="text-[10px] font-mono text-text-tertiary">{item.percentage}%</span>
        </div>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <Badge variant="outline" className={cn(
          "text-[9px] px-1.5 py-0 rounded-full border-0 font-medium",
          parseInt(item.bounce) <= 25 ? "text-success bg-success/10" :
          parseInt(item.bounce) <= 40 ? "text-warning bg-warning/10" : "text-error bg-error/10",
        )}>
          {item.bounce}
        </Badge>
      </td>
    </motion.tr>
  );
}

function EmptyRow() {
  return <div className="py-4 text-center text-[10px] text-text-tertiary">No data yet</div>;
}

function EngagementCards({ items }: { items: EngagementData[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((item, i) => (
        <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="p-3 rounded-xl border border-border-subtle bg-surface-hover text-center"
        >
          <p className="text-lg font-bold text-text-primary">{item.count.toLocaleString()}</p>
          <p className="text-[9px] text-text-tertiary mt-0.5">{item.label}</p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            <span className={cn("text-[9px] font-semibold", item.change >= 0 ? "text-success" : "text-error")}>
              {item.change >= 0 ? "+" : ""}{item.change}%
            </span>
            <span className="text-[8px] text-text-tertiary">vs {item.previous.toLocaleString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TablesSection() {
  const [geoSearch, setGeoSearch] = useState("");
  const [trafficTab, setTrafficTab] = useState("sources");
  const { data, loading } = useTablesData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  const countries = data?.countries ?? [];
  const cities = data?.cities ?? [];
  const sources = data?.sources ?? [];
  const referrers = data?.referrers ?? [];
  const topPages = data?.topPages ?? [];
  const projects = data?.projects ?? [];
  const engagementData = data?.engagement ?? [];

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(geoSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" />
                  Countries
                </CardTitle>
                <CardDescription>Top visitor countries</CardDescription>
              </div>
              <div className="relative w-40">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-text-tertiary" />
                <Input value={geoSearch} onChange={(e) => setGeoSearch(e.target.value)}
                  placeholder="Search..." className="pl-8 h-8 text-[10px] border-border-subtle bg-surface rounded-lg" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-2">
              {countries.length === 0 ? <EmptyRow /> : (
                <table className="w-full">
                  <thead>
                    <tr className="text-[9px] text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50">
                      <th className="text-left pb-2 font-medium">Country</th>
                      <th className="text-right pb-2 font-medium">Visitors</th>
                      <th className="text-right pb-2 font-medium hidden md:table-cell">Share</th>
                      <th className="text-right pb-2 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCountries.map((item, i) => <CountryRow key={item.code} item={item} index={i} />)}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Monitor className="h-4 w-4 text-purple-500" />
              Cities
            </CardTitle>
            <CardDescription>Top visitor cities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-2">
              {cities.length === 0 ? <EmptyRow /> : (
                <table className="w-full">
                  <thead>
                    <tr className="text-[9px] text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50">
                      <th className="text-left pb-2 font-medium">City</th>
                      <th className="text-right pb-2 font-medium hidden sm:table-cell">Country</th>
                      <th className="text-right pb-2 font-medium">Visitors</th>
                      <th className="text-right pb-2 font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.map((item, i) => <CityRow key={`${item.name}-${i}`} item={item} index={i} />)}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border-subtle bg-surface">
        <CardHeader className="pb-2">
          <Tabs value={trafficTab} onValueChange={setTrafficTab}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-text-primary">Traffic</CardTitle>
                <CardDescription>Sources and referrers</CardDescription>
              </div>
              <TabsList className="bg-surface-hover p-0.5 rounded-lg">
                <TabsTrigger value="sources" className="rounded-md text-[10px] data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7 px-2.5">Sources</TabsTrigger>
                <TabsTrigger value="referrers" className="rounded-md text-[10px] data-[state=active]:bg-surface data-[state=active]:shadow-sm h-7 px-2.5">Referrers</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="sources">
              {sources.length === 0 ? <EmptyRow /> : (
                <table className="w-full mt-2">
                  <thead>
                    <tr className="text-[9px] text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50">
                      <th className="text-left pb-2 font-medium">Source</th>
                      <th className="text-right pb-2 font-medium">Visitors</th>
                      <th className="text-right pb-2 font-medium hidden md:table-cell">Share</th>
                      <th className="text-right pb-2 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.map((item, i) => <SourceRow key={item.name} item={item} index={i} />)}
                  </tbody>
                </table>
              )}
            </TabsContent>
            <TabsContent value="referrers">
              {referrers.length === 0 ? <EmptyRow /> : (
                <table className="w-full mt-2">
                  <thead>
                    <tr className="text-[9px] text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50">
                      <th className="text-left pb-2 font-medium">Domain</th>
                      <th className="text-right pb-2 font-medium">Visitors</th>
                      <th className="text-right pb-2 font-medium hidden md:table-cell">Share</th>
                      <th className="text-right pb-2 font-medium">Bounce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrers.map((item, i) => <ReferrerRow key={item.domain} item={item} index={i} />)}
                  </tbody>
                </table>
              )}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              Top Pages
            </CardTitle>
            <CardDescription>Most viewed pages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-2">
              {topPages.length === 0 ? <EmptyRow /> : (
                <table className="w-full">
                  <thead>
                    <tr className="text-[9px] text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50">
                      <th className="text-left pb-2 font-medium">Page</th>
                      <th className="text-right pb-2 font-medium">Views</th>
                      <th className="text-right pb-2 font-medium hidden sm:table-cell">Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((item, i) => <PageRow key={item.path} item={item} index={i} />)}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-success" />
              Project Popularity
            </CardTitle>
            <CardDescription>Views and downloads by project</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-2">
              {projects.length === 0 ? <EmptyRow /> : (
                <table className="w-full">
                  <thead>
                    <tr className="text-[9px] text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50">
                      <th className="text-left pb-2 font-medium">Project</th>
                      <th className="text-right pb-2 font-medium">Views</th>
                      <th className="text-right pb-2 font-medium">Downloads</th>
                      <th className="text-right pb-2 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((item, i) => <ProjectRow key={item._id} item={item} index={i} />)}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {engagementData.length > 0 && (
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 text-amber-500" />
              Engagement
            </CardTitle>
            <CardDescription>Resume downloads, contact messages, and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <EngagementCards items={engagementData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
