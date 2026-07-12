"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Monitor, FileText, ArrowUpRight, MousePointerClick, Loader2 } from "lucide-react";
import { useTablesData } from "./hooks/use-tables-data";
import { CountryRow } from "./rows/country-row";
import { CityRow } from "./rows/city-row";
import { SourceRow } from "./rows/source-row";
import { ReferrerRow } from "./rows/referrer-row";
import { PageRow } from "./rows/page-row";
import { ProjectRow } from "./rows/project-row";
import { EmptyRow } from "./empty-row";
import { EngagementCards } from "./engagement-cards";

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
