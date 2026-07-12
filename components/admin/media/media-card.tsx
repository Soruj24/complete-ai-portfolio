"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Download, MoreHorizontal, File } from "lucide-react";
import { formatSize, getTypeColor } from "./media-helpers";
import { FILE_TYPE_OPTIONS } from "./media-constants";
import type { MediaItem } from "@/features/media/types";

export function MediaCard({ item, selected, onToggleSelect, onPreview }: {
  item: MediaItem; selected: boolean; onToggleSelect: (id: string) => void; onPreview: (item: MediaItem) => void;
}) {
  const Icon = FILE_TYPE_OPTIONS.find((o) => o.value === item.type)?.icon || File;
  const typeColor = getTypeColor(item.type);

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "group relative rounded-xl border overflow-hidden cursor-pointer transition-all",
        selected ? "border-accent ring-2 ring-accent/20 bg-accent/5" : "border-border-subtle bg-surface hover:border-border hover:shadow-sm",
      )}
    >
      <div className="relative aspect-[4/3] bg-background overflow-hidden" onClick={() => onPreview(item)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("p-3 rounded-xl", typeColor)}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <Badge className={cn("absolute top-2 left-2 text-[8px] px-1.5 py-0 rounded border-0 font-medium", typeColor)}>
          {item.type.toUpperCase()}
        </Badge>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected} onCheckedChange={() => onToggleSelect(item.id)}
            className="h-4 w-4 border-white/60 data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-black/50 hover:bg-black/70 border-0"
            onClick={() => onPreview(item)}>
            <Download className="h-3 w-3 text-white" />
          </Button>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-black/50 hover:bg-black/70 border-0">
            <Star className={cn("h-3 w-3", item.favorite ? "text-amber-500 fill-amber-500" : "text-white")} />
          </Button>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-black/50 hover:bg-black/70 border-0">
            <MoreHorizontal className="h-3 w-3 text-white" />
          </Button>
        </div>

        {selected && (
          <div className="absolute inset-0 border-2 border-accent rounded-xl pointer-events-none" />
        )}
      </div>

      <div className="p-2.5" onClick={() => onPreview(item)}>
        <p className="text-[11px] font-medium text-text-primary truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[9px] text-text-tertiary font-mono">{formatSize(item.size)}</span>
          <div className="flex items-center gap-1">
            {item.favorite && <Star className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />}
            {item.version > 1 && <span className="text-[8px] text-text-tertiary font-mono">v{item.version}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
