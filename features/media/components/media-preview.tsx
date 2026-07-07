"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Star, StarOff, Trash2, Download, Copy, Check, Image, FileText, Music, Video, Clock, Layers, Info } from "lucide-react";
import { TYPE_COLORS } from "../constants";
import { formatSize } from "../utils";
import { PREVIEW_PANEL_ANIMATION } from "../animations/media-animations";
import type { MediaItem } from "../types";

export function MediaPreview({ item, onClose, onFavorite, onDelete }: {
  item: MediaItem; onClose: () => void; onFavorite: () => void; onDelete: () => void;
}) {
  const [tab, setTab] = useState("details");
  const Icon = tab === "versions" ? Layers : Info;

  return (
    <motion.aside {...PREVIEW_PANEL_ANIMATION}
      className="fixed right-0 top-14 bottom-0 w-96 border-l border-border-subtle bg-background z-30 flex flex-col shadow-xl"
    >
      <div className="flex items-center justify-between p-4 border-b border-border-subtle shrink-0">
        <h3 className="text-sm font-semibold text-text-primary truncate flex-1">{item.name}</h3>
        <div className="flex items-center gap-1">
          <button onClick={onFavorite}
            className="p-1.5 rounded-lg hover:bg-surface-hover text-text-tertiary">
            {item.favorite ? <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> : <StarOff className="h-4 w-4" />}
          </button>
          <button onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-surface-hover text-text-tertiary hover:text-error">
            <Trash2 className="h-4 w-4" />
          </button>
          <button onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-hover text-text-tertiary">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-4">
          <div className={cn("aspect-video rounded-xl flex items-center justify-center border border-border-subtle bg-background mb-4", TYPE_COLORS[item.type])}>
            <Icon className="h-16 w-16 opacity-40" />
          </div>

          <Input defaultValue={item.name}
            className="text-sm font-semibold text-text-primary mb-4 border-border-subtle bg-surface" />
        </div>

        <Tabs value={tab} onValueChange={setTab} className="px-4">
          <TabsList className="bg-surface-hover p-0.5 rounded-xl w-full">
            <TabsTrigger value="details" className="flex-1 rounded-lg text-xs data-[state=active]:bg-surface">
              Details
            </TabsTrigger>
            <TabsTrigger value="versions" className="flex-1 rounded-lg text-xs data-[state=active]:bg-surface">
              Version History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-3 space-y-3">
            {[
              { label: "Type", value: item.type, badge: item.type },
              { label: "Size", value: formatSize(item.size) },
              { label: "Dimensions", value: item.dimensions || "-" },
              { label: "MIME Type", value: item.mime },
              { label: "Folder", value: item.folder },
              { label: "Category", value: item.category },
              { label: "Created", value: formatDate(item.createdAt) },
              { label: "Modified", value: formatDate(item.modifiedAt) },
              item.duration ? { label: "Duration", value: item.duration } : null,
            ].filter(Boolean).map((row) => row && (
              <div key={row.label} className="flex items-center justify-between py-1.5 text-[10px] border-b border-border-subtle/50 last:border-0">
                <span className="text-text-tertiary">{row.label}</span>
                <span className="text-text-primary font-mono font-medium">{row.value}</span>
              </div>
            ))}

            {item.tags.length > 0 && (
              <div>
                <p className="text-[9px] text-text-tertiary mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} className="text-[7px] px-1.5 py-0.5 rounded-full border border-border-subtle bg-surface-hover text-text-tertiary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="versions" className="mt-3 space-y-2">
            {item.versions?.map((v) => (
              <div key={v.version} className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface text-[10px]">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded bg-surface-hover">
                    <Layers className="h-3 w-3 text-text-tertiary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">v{v.version}</p>
                    <p className="text-[8px] text-text-tertiary">{v.note} &middot; {formatSize(v.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[8px] text-text-tertiary">
                  <Clock className="h-2.5 w-2.5" />
                  {formatDate(v.createdAt)}
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </motion.aside>
  );
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
