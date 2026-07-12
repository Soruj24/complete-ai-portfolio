"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Smartphone, Tablet, Laptop, LogOut } from "lucide-react";
import type { Device } from "../types";

export function DeviceRow({ device }: { device: Device }) {
  const Icon = device.type === "Phone" ? Smartphone : device.type === "Tablet" ? Tablet : Laptop;
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface-hover">
      <div className="p-2 rounded-lg bg-background">
        <Icon className="h-4 w-4 text-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-primary">{device.name}</span>
          <Badge variant="outline" className="text-[7px] px-1 py-0 rounded border-border-subtle text-text-tertiary">{device.type}</Badge>
          {device.trusted && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-success/10 text-success">Trusted</Badge>}
        </div>
        <div className="flex items-center gap-3 mt-0.5 text-[9px] text-text-tertiary font-mono">
          <span>{device.os}</span>
          <span>{device.browser}</span>
          <span>{device.ip}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Switch defaultChecked={device.trusted} />
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-text-tertiary hover:text-error">
          <LogOut className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
