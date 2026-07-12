"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MousePointerClick } from "lucide-react";

export function ClickHeatmap() {
  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <MousePointerClick className="h-4 w-4 text-amber-500" />
          Click Heatmap
        </CardTitle>
        <CardDescription>Visual representation of user clicks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-64 rounded-xl bg-background border border-border-subtle">
          <MousePointerClick className="h-10 w-10 text-text-tertiary/40 mb-3" />
          <p className="text-sm text-text-tertiary font-medium">Click tracking not yet available</p>
          <p className="text-[10px] text-text-tertiary/60 mt-1 max-w-md text-center">
            Element-level click heatmaps require additional client-side instrumentation. Data will appear here once tracking is configured.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
