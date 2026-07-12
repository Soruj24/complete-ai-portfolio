"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { File, Clock, MoreHorizontal } from "lucide-react";
import { formatSize, getTypeColor } from "./media-helpers";
import { FILE_TYPE_OPTIONS } from "./media-constants";
import type { MediaItem } from "@/features/media/types";

export function MediaListItem({ item, selected, onToggleSelect, onPreview }: {
  item: MediaItem; selected: boolean; onToggleSelect: (id: string) => void; onPreview: (item: MediaItem) => void;
}) {
  const Icon = FILE_TYPE_OPTIONS.find((o) => o.value === item.type)?.icon || File;
  const typeColor = getTypeColor(item.type);

  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group",
        selected ? "bg-accent/5 border border-accent/20" : "border border-transparent hover:bg-surface-hover",
      )}
      onClick={() => onPreview(item)}
    >
      <Checkbox checked={selected} onCheckedChange={() => onToggleSelect(item.id)}
        onClick={(e) => e.stopPropagation()}
        className="h-4 w-4 data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
      <div className={cn("p-1.5 rounded-lg shrink-0", typeColor)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
        <div>
          <p className="text-xs font-medium text-text-primary truncate">{item.name}</p>
          {item.dimensions && <p className="text-[9px] text-text-tertiary font-mono">{item.dimensions}</p>}
        </div>
        <span className="text-[10px] text-text-tertiary font-mono hidden sm:block">{item.type.toUpperCase()}</span>
        <span className="text-[10px] text-text-tertiary font-mono hidden md:block">{formatSize(item.size)}</span>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-1 text-[9px] text-text-tertiary">
            <Clock className="h-2.5 w-2.5" />
            {new Date(item.modifiedAt).toLocaleDateString()}
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-3.5 w-3.5 text-text-tertiary" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
