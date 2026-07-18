"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Cable,
  Plus,
  Search,
  Wifi,
  WifiOff,
  Terminal,
  Globe,
  Server,
  Database,
  Code,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MCPServer {
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  protocol: string;
  transport: string;
  endpoint: string;
  tools: number;
  latency: string;
  resources: string;
  uptime: string;
  version: string;
}

const servers: MCPServer[] = [
  {
    name: "Filesystem MCP",
    type: "System",
    status: "connected",
    protocol: "2024-11-05",
    transport: "stdio",
    endpoint: "Local Process",
    tools: 8,
    latency: "2ms",
    resources: "File System",
    uptime: "99.9%",
    version: "1.2.0",
  },
  {
    name: "GitHub MCP",
    type: "Integration",
    status: "connected",
    protocol: "2024-11-05",
    transport: "SSE",
    endpoint: "api.github.com",
    tools: 15,
    latency: "120ms",
    resources: "Repos, Issues, PRs",
    uptime: "99.7%",
    version: "2.1.0",
  },
  {
    name: "Database MCP",
    type: "Data",
    status: "connected",
    protocol: "2024-11-05",
    transport: "SSE",
    endpoint: "pg.internal:5432",
    tools: 6,
    latency: "8ms",
    resources: "PostgreSQL",
    uptime: "100%",
    version: "1.0.3",
  },
  {
    name: "Slack MCP",
    type: "Communication",
    status: "disconnected",
    protocol: "2024-11-05",
    transport: "SSE",
    endpoint: "slack.com/api",
    tools: 12,
    latency: "-",
    resources: "Channels, Messages",
    uptime: "-",
    version: "0.9.0",
  },
  {
    name: "Search MCP",
    type: "Utility",
    status: "error",
    protocol: "2024-11-05",
    transport: "SSE",
    endpoint: "search.internal:8080",
    tools: 3,
    latency: "2.5s",
    resources: "Web Search",
    uptime: "92.1%",
    version: "0.5.0",
  },
  {
    name: "Memory MCP",
    type: "System",
    status: "connected",
    protocol: "2024-11-05",
    transport: "stdio",
    endpoint: "Local Process",
    tools: 5,
    latency: "1ms",
    resources: "Knowledge Graph",
    uptime: "100%",
    version: "1.1.0",
  },
];

const typeIcons: Record<string, React.ElementType> = {
  System: Terminal,
  Integration: Globe,
  Data: Database,
  Communication: Code,
  Utility: Server,
};

const statusConfig = {
  connected: {
    icon: Wifi,
    color: "text-success",
    bg: "bg-success/10",
    label: "Connected",
  },
  disconnected: {
    icon: WifiOff,
    color: "text-text-tertiary",
    bg: "bg-surface-hover",
    label: "Disconnected",
  },
  error: {
    icon: WifiOff,
    color: "text-error",
    bg: "bg-error/10",
    label: "Error",
  },
};

export default function MCPPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = servers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">MCP Servers</h1>
          <p className="text-sm text-text-secondary mt-1">
            Model Context Protocol - connect tools and data sources
          </p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add MCP Server
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search MCP servers..."
          className="pl-10 border-border-subtle bg-surface h-10 rounded-xl text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((server, i) => {
          const status = statusConfig[server.status];
          const StatusIcon = status.icon;
          const TypeIcon = typeIcons[server.type] || Server;
          return (
            <motion.div
              key={server.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={cn(
                  "border-border-subtle bg-surface hover:border-border transition-all cursor-pointer group",
                  selected === server.name &&
                    "ring-2 ring-accent/30 border-accent/30",
                )}
                onClick={() =>
                  setSelected(selected === server.name ? null : server.name)
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-xl", status.bg)}>
                        <StatusIcon className={cn("h-4 w-4", status.color)} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-text-primary">
                            {server.name}
                          </h3>
                          <Badge
                            className={cn(
                              "text-[8px] px-1.5 py-0 rounded-full border-0 font-medium",
                              status.color,
                              status.bg,
                            )}
                          >
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-[8px] px-1.5 py-0 rounded border-border-subtle flex items-center gap-1"
                          >
                            <TypeIcon className="h-2.5 w-2.5" /> {server.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[8px] px-1.5 py-0 rounded border-border-subtle"
                          >
                            v{server.version}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-text-tertiary font-mono">
                          <span>{server.transport}</span>
                          <span>🔧 {server.tools} tools</span>
                          <span>⚡ {server.latency}</span>
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked={server.status === "connected"} />
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {selected === server.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-border-subtle space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-background">
                              <span className="text-text-tertiary">
                                Protocol
                              </span>
                              <span className="font-mono text-text-primary">
                                {server.protocol}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-background">
                              <span className="text-text-tertiary">
                                Endpoint
                              </span>
                              <span className="font-mono text-text-primary">
                                {server.endpoint}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-background">
                              <span className="text-text-tertiary">
                                Resources
                              </span>
                              <span className="font-mono text-text-primary">
                                {server.resources}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-background">
                              <span className="text-text-tertiary">Uptime</span>
                              <span className="font-mono text-text-primary">
                                {server.uptime}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle flex-1"
                            >
                              <Terminal className="h-3 w-3" /> Test Connection
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle flex-1"
                            >
                              <ExternalLink className="h-3 w-3" /> View Logs
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
