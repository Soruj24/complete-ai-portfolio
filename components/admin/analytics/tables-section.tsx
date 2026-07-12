"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowUpRight, ArrowDownRight, Globe, Monitor, ExternalLink, FileText, Download, MousePointerClick, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TablesData {
  countries: CountryData[];
  cities: CityData[];
  sources: SourceData[];
  referrers: ReferrerData[];
  topPages: PageData[];
  projects: ProjectData[];
  engagement: EngagementData[];
}

interface CountryData {
  code: string;
  name: string;
  flag: string;
  visitors: number;
  percentage: number;
  change: number;
}

interface CityData {
  name: string;
  country: string;
  visitors: number;
  duration: string;
}

interface SourceData {
  name: string;
  visitors: number;
  percentage: number;
  trend: number;
}

interface ReferrerData {
  domain: string;
  visitors: number;
  percentage: number;
  bounce: string;
}

interface PageData {
  path: string;
  title: string;
  views: number;
  visitors: number;
}

interface ProjectData {
  _id: string;
  name: string;
  views: number;
  downloads: number;
  trend: number;
}

interface EngagementData {
  label: string;
  count: number;
  change: number;
  previous: number;
}

function CountryRow({ item, index }: { item: CountryData; index: number }) {
  return (
    <motion.tr key={item.code} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2.5">
          <span className="text-base shrink-0">{item.flag}</span>
          <span className="text-xs font-semibold text-text-primary">{item.name}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-background overflow-hidden max-w-[100px]">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${item.percentage * 2.5}%` }} />
          </div>
          <span className="text-[10px] font-mono text-text-tertiary w-10 text-right">{item.percentage}%</span>
        </div>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <span className={cn("text-[10px] font-semibold inline-flex items-center gap-0.5", item.change >= 0 ? "text-success" : "text-error")}>
          {item.change >= 0 ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
          {Math.abs(item.change)}%
        </span>
      </td>
    </motion.tr>
  );
}

function SourceRow({ item, index }: { item: SourceData; index: number }) {
  return (
    <motion.tr key={item.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <span className="text-xs font-semibold text-text-primary">{item.name}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-background overflow-hidden max-w-[100px]">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${item.percentage * 2.5}%` }} />
          </div>
          <span className="text-[10px] font-mono text-text-tertiary w-10 text-right">{item.percentage}%</span>
        </div>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <span className={cn("text-[10px] font-semibold inline-flex items-center gap-0.5", item.trend >= 0 ? "text-success" : "text-error")}>
          {item.trend >= 0 ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
          {Math.abs(item.trend)}%
        </span>
      </td>
    </motion.tr>
  );
}

function PageRow({ item, index }: { item: PageData; index: number }) {
  return (
    <motion.tr key={item.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md bg-accent/10 shrink-0">
            <FileText className="h-3 w-3 text-accent" />
          </div>
          <div>
            <span className="text-xs font-semibold text-text-primary">{item.title}</span>
            <span className="text-[9px] font-mono text-text-tertiary block">{item.path}</span>
          </div>
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.views.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 text-right hidden sm:table-cell">
        <span className="text-[10px] font-mono text-text-tertiary">{item.visitors.toLocaleString()}</span>
      </td>
    </motion.tr>
  );
}

function ProjectRow({ item, index }: { item: ProjectData; index: number }) {
  return (
    <motion.tr key={item._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <span className="text-xs font-semibold text-text-primary">{item.name}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.views.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.downloads > 0 ? item.downloads.toLocaleString() : "-"}</span>
      </td>
      <td className="py-2.5 pl-3 text-right">
        {item.trend > 0 ? (
          <span className="text-[10px] font-semibold text-success inline-flex items-center gap-0.5">
            <ArrowUpRight className="h-2.5 w-2.5" /> {Math.abs(item.trend)}%
          </span>
        ) : item.trend < 0 ? (
          <span className="text-[10px] font-semibold text-error inline-flex items-center gap-0.5">
            <ArrowDownRight className="h-2.5 w-2.5" /> {Math.abs(item.trend)}%
          </span>
        ) : (
          <span className="text-[10px] text-text-tertiary">-</span>
        )}
      </td>
    </motion.tr>
  );
}

export function TablesSection() {
  const [geoSearch, setGeoSearch] = useState("");
  const [trafficTab, setTrafficTab] = useState("sources");
  const [data, setData] = useState<TablesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/analytics/tables?days=30");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
              {countries.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-text-tertiary">No country data yet</div>
              ) : (
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
              {cities.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-text-tertiary">No city data yet</div>
              ) : (
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
                    {cities.map((item, i) => (
                      <motion.tr key={`${item.name}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
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
                    ))}
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
              {sources.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-text-tertiary">No source data yet</div>
              ) : (
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
              {referrers.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-text-tertiary">No referrer data yet</div>
              ) : (
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
                    {referrers.map((item, i) => (
                      <motion.tr key={item.domain} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
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
                    ))}
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
              {topPages.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-text-tertiary">No page view data yet</div>
              ) : (
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
              {projects.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-text-tertiary">No project data yet</div>
              ) : (
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {engagementData.map((item, i) => (
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
