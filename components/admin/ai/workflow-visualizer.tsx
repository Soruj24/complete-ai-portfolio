"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, ZoomIn, ZoomOut, Download, ArrowDown, Workflow as WorkflowIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { workflows, defaultNodes, defaultEdges, nodeColors, statusColors } from "./workflow-data";

export function WorkflowVisualizer() {
  const [selectedWorkflow, setSelectedWorkflow] = useState("customer-support");
  const [isRunning, setIsRunning] = useState(false);
  const [zoom, setZoom] = useState(1);

  const toggleRun = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      // Simulate workflow progression
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border-subtle bg-surface">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <WorkflowIcon className="h-5 w-5 text-accent" />
                Workflow Visualizer
              </CardTitle>
              <CardDescription>Visualize and monitor AI agent execution graphs</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
                <SelectTrigger className="w-48 h-8 text-xs border-border-subtle bg-surface">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {workflows.map((w) => <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="h-8 w-8 rounded-lg border-border-subtle">
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="h-8 w-8 rounded-lg border-border-subtle">
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border-subtle">
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button onClick={toggleRun}
                className={cn("h-8 gap-1.5 rounded-lg text-xs", isRunning ? "bg-error hover:bg-error/90" : "bg-accent hover:bg-accent/90")}
              >
                {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isRunning ? "Stop" : "Run"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Graph Canvas */}
          <div className="relative overflow-auto rounded-xl bg-background border border-border-subtle min-h-[400px]">
            <div
              className="relative p-8 transition-transform"
              style={{ transform: `scale(${zoom})`, transformOrigin: "top left", minWidth: `${100 / zoom}%` }}
            >
              {/* Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {defaultEdges.map((edge, i) => {
                  const fromIdx = defaultNodes.findIndex((n) => n.id === edge.from);
                  const toIdx = defaultNodes.findIndex((n) => n.id === edge.to);
                  const x1 = 120 + fromIdx * 160 + 60;
                  const y1 = 100;
                  const x2 = 120 + toIdx * 160 + 60;
                  const y2 = 100;
                  const midX = (x1 + x2) / 2;

                  return (
                    <g key={i}>
                      <defs>
                        <marker id={`arrowhead-${i}`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="var(--color-border-subtle)" />
                        </marker>
                      </defs>
                      <path d={`M ${x1} ${y1} C ${midX} ${y1 - 20}, ${midX} ${y2 - 20}, ${x2} ${y2}`}
                        fill="none" stroke="var(--color-border-subtle)" strokeWidth="2" markerEnd={`url(#arrowhead-${i})`}
                        className="transition-all duration-500"
                      />
                      <rect x={midX - 30} y={y1 - 35} width="60" height="16" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" strokeWidth="1" />
                      <text x={midX} y={y1 - 24} textAnchor="middle" fill="var(--color-text-tertiary)" fontSize="9" fontFamily="monospace">
                        {edge.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              <div className="relative flex items-start gap-6" style={{ zIndex: 1 }}>
                {defaultNodes.map((node, i) => {
                  const colors = nodeColors[node.type];
                  const statusBg = statusColors[node.status];
                  const Icon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center gap-2 min-w-[120px] max-w-[140px]"
                    >
                      {/* Node Card */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                          "relative w-full p-3 rounded-xl border-2 transition-all cursor-pointer group",
                          colors.bg, colors.border,
                          statusBg,
                        )}
                      >
                        {node.status === "running" && (
                          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping" />
                        )}
                        <div className="flex flex-col items-center gap-2">
                          <div className={cn("p-2 rounded-lg", colors.bg)}>
                            <Icon className={cn("h-5 w-5", colors.text)} />
                          </div>
                          <span className="text-[10px] font-semibold text-text-primary text-center leading-tight">{node.label}</span>
                          {node.duration && (
                            <span className="text-[8px] font-mono text-text-tertiary">{node.duration}</span>
                          )}
                        </div>
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 pointer-events-none" />
                      </motion.div>

                      {/* Status Badge */}
                      <Badge variant="outline" className={cn(
                        "text-[8px] px-1.5 py-0 rounded-full border-0 font-medium",
                        node.status === "completed" ? "text-success bg-success/10" :
                        node.status === "running" ? "text-accent bg-accent/10" :
                        node.status === "error" ? "text-error bg-error/10" :
                        "text-text-tertiary bg-surface-hover",
                      )}>
                        {node.status === "running" ? "In Progress..." : node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                      </Badge>

                      {/* Connection arrow */}
                      {i < defaultNodes.length - 1 && <ArrowDown className="h-4 w-4 text-border-subtle -mb-1" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-[10px] text-text-tertiary">
            {Object.entries(nodeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={cn("h-2.5 w-2.5 rounded-full", colors.bg, colors.border.replace("border", "border"))} />
                <span className="capitalize">{type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
