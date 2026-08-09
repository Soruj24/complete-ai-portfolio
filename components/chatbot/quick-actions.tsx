"use client";

import { Button } from "@/components/ui/button";
import { QUICK_ACTIONS } from "@/constants/chat";

interface QuickActionsProps {
  onSelect: (prompt: string) => void;
  visible: boolean;
}

export function QuickActions({ onSelect, visible }: QuickActionsProps) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap gap-1.5 p-3">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={() => onSelect(action.prompt)}
            className="rounded-lg text-[11px] font-medium gap-1.5"
          >
            <Icon className="h-3 w-3" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
