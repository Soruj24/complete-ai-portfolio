"use client";

import { Search, Download, Upload, Columns3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { FieldDef, ResourceFeatures } from "@/types/admin";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  searchFocused: boolean;
  onSearchFocus: (focused: boolean) => void;
  features: ResourceFeatures;
  onExport?: () => void;
  onImport?: () => void;
  fields: FieldDef[];
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (key: string, checked: boolean) => void;
}

export function DataTableToolbar({ search, onSearchChange, searchFocused, onSearchFocus, features, onExport, onImport, fields, columnVisibility, onColumnVisibilityChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className={cn("flex-1 min-w-[180px] max-w-xs relative", searchFocused && "ring-1 ring-accent/30 rounded-md")}>
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => onSearchFocus(true)}
          onBlur={() => onSearchFocus(false)}
          className="pl-8 h-8 text-[13px] rounded-md border-border-subtle bg-surface"
        />
      </div>

      <div className="flex items-center gap-1.5">
        {features.export && onExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="h-8 gap-1.5 text-[12px] rounded-md border-border-subtle">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        )}
        {features.import && onImport && (
          <Button variant="outline" size="sm" onClick={onImport} className="h-8 gap-1.5 text-[12px] rounded-md border-border-subtle">
            <Upload className="h-3.5 w-3.5" /> Import
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-md">
              <Columns3 className="h-4 w-4 text-text-tertiary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {fields.filter(f => f.showInTable !== false).map(f => (
              <DropdownMenuCheckboxItem
                key={f.key}
                checked={columnVisibility[f.key] !== false}
                onCheckedChange={(checked) => onColumnVisibilityChange(f.key, checked)}
                className="text-[13px]"
              >
                {f.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
