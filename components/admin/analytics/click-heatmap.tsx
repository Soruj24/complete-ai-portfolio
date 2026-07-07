"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointerClick, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClickPoint {
  id: string;
  x: number;
  y: number;
  count: number;
  label: string;
  element: string;
}

const pages = [
  { value: "home", label: "Homepage" },
  { value: "projects", label: "Projects" },
  { value: "resume", label: "Resume" },
  { value: "blog", label: "Blog" },
];

const clickData: Record<string, ClickPoint[]> = {
  home: [
    { id: "1", x: 50, y: 20, count: 2840, label: "Hero CTA", element: "button" },
    { id: "2", x: 25, y: 40, count: 1820, label: "Featured Project", element: "card" },
    { id: "3", x: 75, y: 40, count: 1650, label: "Featured Project", element: "card" },
    { id: "4", x: 50, y: 55, count: 980, label: "About Link", element: "link" },
    { id: "5", x: 30, y: 70, count: 1240, label: "Testimonials", element: "section" },
    { id: "6", x: 70, y: 70, count: 890, label: "Stats Counter", element: "section" },
    { id: "7", x: 50, y: 85, count: 620, label: "Footer Contact", element: "link" },
    { id: "8", x: 20, y: 30, count: 450, label: "Navigation", element: "menu" },
    { id: "9", x: 80, y: 10, count: 2100, label: "Resume Download", element: "button" },
    { id: "10", x: 40, y: 50, count: 780, label: "Skills Section", element: "section" },
  ],
  projects: [
    { id: "1", x: 30, y: 25, count: 1240, label: "AI Dashboard", element: "card" },
    { id: "2", x: 70, y: 25, count: 980, label: "E-Commerce", element: "card" },
    { id: "3", x: 30, y: 50, count: 720, label: "Task Manager", element: "card" },
    { id: "4", x: 70, y: 50, count: 540, label: "Weather Widget", element: "card" },
    { id: "5", x: 50, y: 75, count: 420, label: "View All Projects", element: "button" },
  ],
  resume: [
    { id: "1", x: 50, y: 15, count: 2840, label: "Download PDF", element: "button" },
    { id: "2", x: 50, y: 30, count: 1240, label: "Experience Section", element: "section" },
    { id: "3", x: 50, y: 50, count: 980, label: "Education", element: "section" },
    { id: "4", x: 50, y: 65, count: 620, label: "Skills Chart", element: "chart" },
    { id: "5", x: 50, y: 80, count: 450, label: "Contact Info", element: "section" },
  ],
  blog: [
    { id: "1", x: 50, y: 20, count: 1820, label: "Featured Post", element: "card" },
    { id: "2", x: 30, y: 40, count: 980, label: "Post Card", element: "card" },
    { id: "3", x: 70, y: 40, count: 840, label: "Post Card", element: "card" },
    { id: "4", x: 30, y: 60, count: 620, label: "Post Card", element: "card" },
    { id: "5", x: 70, y: 60, count: 550, label: "Post Card", element: "card" },
    { id: "6", x: 50, y: 85, count: 320, label: "Load More", element: "button" },
  ],
};

function getHeatColor(count: number, max: number): string {
  const ratio = count / max;
  if (ratio > 0.8) return "bg-error/25 ring-error/40";
  if (ratio > 0.6) return "bg-warning/25 ring-warning/40";
  if (ratio > 0.4) return "bg-accent/25 ring-accent/40";
  if (ratio > 0.2) return "bg-accent/15 ring-accent/30";
  return "bg-accent/8 ring-accent/20";
}

export function ClickHeatmap() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [zoom, setZoom] = useState(1);

  const points = clickData[selectedPage];
  const maxCount = Math.max(...points.map((p) => p.count));

  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 text-amber-500" />
              Click Heatmap
            </CardTitle>
            <CardDescription>Visual representation of user clicks</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-32 h-8 text-[10px] border-border-subtle bg-surface rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.2))} className="h-7 w-7 rounded-lg">
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.2))} className="h-7 w-7 rounded-lg">
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Heatmap Canvas */}
        <div className="relative rounded-xl bg-background border border-border-subtle overflow-hidden" style={{ height: 400 }}>
          <div
            className="absolute inset-0 transition-transform origin-top-left"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Page layout skeleton */}
            <div className="absolute top-0 left-0 right-0 h-14 border-b border-border-subtle/30 flex items-center px-6 gap-4">
              <div className="h-6 w-6 rounded-lg bg-surface-hover" />
              <div className="h-3 w-20 rounded bg-surface-hover" />
              <div className="h-3 w-16 rounded bg-surface-hover" />
              <div className="h-3 w-16 rounded bg-surface-hover" />
              <div className="flex-1" />
              <div className="h-6 w-24 rounded-lg bg-surface-hover" />
            </div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
              <div className="h-8 w-64 mx-auto rounded-lg bg-surface-hover mb-3" />
              <div className="h-3 w-96 mx-auto rounded bg-surface-hover/60" />
            </div>
            <div className="absolute top-40 left-6 right-6 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 rounded-xl bg-surface-hover" />
              ))}
            </div>
            <div className="absolute bottom-16 left-6 right-6 h-20 rounded-xl bg-surface-hover" />
            <div className="absolute bottom-4 left-0 right-0 h-8 border-t border-border-subtle/30 flex items-center justify-center gap-6">
              <div className="h-2 w-12 rounded bg-surface-hover" />
              <div className="h-2 w-12 rounded bg-surface-hover" />
              <div className="h-2 w-12 rounded bg-surface-hover" />
            </div>

            {/* Click point overlays */}
            {points.map((point) => {
              const size = Math.max(24, Math.min(80, (point.count / maxCount) * 80));
              return (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 cursor-pointer group",
                    getHeatColor(point.count, maxCount),
                  )}
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: size,
                    height: size,
                  }}
                >
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block z-20">
                    <div className="bg-surface border border-border-subtle rounded-lg px-3 py-1.5 text-[10px] shadow-lg whitespace-nowrap">
                      <p className="font-semibold text-text-primary">{point.label}</p>
                      <p className="text-text-tertiary">{point.count.toLocaleString()} clicks on {point.element}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-[10px] text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-error/40 ring-1 ring-error/50" /> Hot
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-warning/40 ring-1 ring-warning/50" /> Warm
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/20 ring-1 ring-accent/30" /> Cool
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/8 ring-1 ring-accent/15" /> Cold
            </span>
          </div>
          <Badge variant="outline" className="text-[9px] px-2 py-0 rounded-full border-border-subtle gap-1">
            <MousePointerClick className="h-2.5 w-2.5" />
            {points.reduce((s, p) => s + p.count, 0).toLocaleString()} total clicks
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
