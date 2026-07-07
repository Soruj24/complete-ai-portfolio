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
    <div className="flex flex-wrap gap-2 p-4">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={() => onSelect(action.prompt)}
            className="rounded-full border-gray-200 bg-white text-xs font-medium text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
