"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight,
  Search, Download, Upload, Trash2, Archive, RotateCcw,
  EyeOff, Columns3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { FieldDef, BulkAction, ResourceFeatures } from "@/types/admin";

interface DataTableProps {
  fields: FieldDef[];
  data: Record<string, unknown>[];
  total: number;
  loading?: boolean;
  error?: string | null;
  features: ResourceFeatures;
  search: string;
  onSearchChange: (val: string) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  sortKey: string;
  sortDir: "asc" | "desc";
  onSort: (key: string) => void;
  selected: string[];
  onSelectionChange: (ids: string[]) => void;
  getId: (row: Record<string, unknown>) => string;
  onRowClick?: (row: Record<string, unknown>) => void;
  bulkActions?: BulkAction[];
  onBulkAction?: (action: string, ids: string[]) => void;
  onExport?: () => void;
  onImport?: () => void;
  renderActions?: (row: Record<string, unknown>) => React.ReactNode;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
}

export function DataTable({
  fields, data, total, loading, error, features,
  search, onSearchChange,
  page, pageSize, onPageChange, onPageSizeChange,
  sortKey, sortDir, onSort,
  selected, onSelectionChange, getId, onRowClick,
  bulkActions, onBulkAction, onExport, onImport,
  renderActions, emptyMessage, emptyIcon,
}: DataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(fields.filter(f => f.showInTable !== false).map(f => [f.key, true]))
  );
  const [searchFocused, setSearchFocused] = useState(false);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const visibleFields = fields.filter(f => columnVisibility[f.key] !== false && f.showInTable !== false);
  const allSelected = data.length > 0 && selected.length === data.length;
  const someSelected = selected.length > 0 && selected.length < data.length;

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(r => getId(r)));
    }
  };

  const toggleOne = (id: string) => {
    onSelectionChange(
      selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]
    );
  };

  const SortIcon = ({ field }: { field: FieldDef }) => {
    if (!field.sortable) return <span className="w-4" />;
    if (sortKey !== field.key) return <ChevronsUpDown className="h-3 w-3 text-text-tertiary" />;
    return sortDir === "asc" ? <ChevronUp className="h-3 w-3 text-accent" /> : <ChevronDown className="h-3 w-3 text-accent" />;
  };

  const renderCell = (field: FieldDef, row: Record<string, unknown>): ReactNode => {
    if (field.render) return field.render(row[field.key], row);
    const val = row[field.key];
    if (val === null || val === undefined) return <span className="text-text-tertiary">—</span>;
    if (field.type === "toggle") return val ? <Badge className="bg-success/10 text-success border-none">Yes</Badge> : <Badge className="bg-error/10 text-error border-none">No</Badge>;
    if (field.type === "select") {
      const opt = field.options?.find(o => o.value === val);
      return (opt?.label ?? String(val)) as ReactNode;
    }
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return String(val);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="p-3 rounded-full bg-error/10">
          <EyeOff className="h-6 w-6 text-error" />
        </div>
        <p className="text-text-secondary text-sm font-medium">Failed to load data</p>
        <p className="text-text-tertiary text-xs">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className={cn(
          "flex-1 min-w-[200px] max-w-sm relative",
          searchFocused && "ring-2 ring-accent/20 rounded-lg"
        )}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="pl-9 h-9 text-sm rounded-lg border-border-subtle bg-surface"
          />
        </div>

        <div className="flex items-center gap-2">
          {features.export && onExport && (
            <Button variant="outline" size="sm" onClick={onExport} className="h-9 gap-1.5 text-xs rounded-lg border-border-subtle">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          )}
          {features.import && onImport && (
            <Button variant="outline" size="sm" onClick={onImport} className="h-9 gap-1.5 text-xs rounded-lg border-border-subtle">
              <Upload className="h-3.5 w-3.5" /> Import
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg">
                <Columns3 className="h-4 w-4 text-text-tertiary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {fields.filter(f => f.showInTable !== false).map(f => (
                <DropdownMenuCheckboxItem
                  key={f.key}
                  checked={columnVisibility[f.key] !== false}
                  onCheckedChange={(checked) => setColumnVisibility(prev => ({ ...prev, [f.key]: checked }))}
                >
                  {f.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (features.bulkDelete || features.bulkArchive || features.bulkRestore || (bulkActions && bulkActions.length > 0)) && (
        <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg border border-accent/10">
          <span className="text-xs font-medium text-text-secondary mr-2">{selected.length} selected</span>
          {features.bulkDelete && (
            <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("delete", selected)} className="h-7 text-xs gap-1 text-error hover:text-error hover:bg-error/10 rounded-md">
              <Trash2 className="h-3 w-3" /> Delete
            </Button>
          )}
          {features.bulkArchive && (
            <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("archive", selected)} className="h-7 text-xs gap-1 text-warning hover:text-warning hover:bg-warning/10 rounded-md">
              <Archive className="h-3 w-3" /> Archive
            </Button>
          )}
          {features.bulkRestore && (
            <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("restore", selected)} className="h-7 text-xs gap-1 text-success hover:text-success hover:bg-success/10 rounded-md">
              <RotateCcw className="h-3 w-3" /> Restore
            </Button>
          )}
          {bulkActions?.map((ba) => (
            <Button
              key={ba.action}
              variant="ghost" size="sm"
              onClick={() => onBulkAction?.(ba.action, selected)}
              className={cn("h-7 text-xs gap-1 rounded-md", ba.variant === "destructive" ? "text-error hover:text-error hover:bg-error/10" : "")}
            >
              {ba.icon && <ba.icon className="h-3 w-3" />}
              {ba.label}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => onSelectionChange([])} className="h-7 text-xs ml-auto rounded-md text-text-tertiary">
            Clear
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border-subtle overflow-hidden bg-surface">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-background/50">
                <TableHead className="w-10 px-3">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />
                </TableHead>
                {visibleFields.map((field) => (
                  <TableHead
                    key={field.key}
                    className={cn(
                      "text-xs font-semibold text-text-tertiary uppercase tracking-wider",
                      field.sortable && "cursor-pointer select-none hover:text-text-primary",
                    )}
                    style={field.width ? { width: field.width } : undefined}
                    onClick={() => field.sortable && onSort(field.key)}
                  >
                    <div className="flex items-center gap-1.5">
                      {field.label}
                      {features.sorting && field.sortable !== false && <SortIcon field={field} />}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-16 text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-3"><Skeleton className="h-4 w-4" /></TableCell>
                    {visibleFields.map((f) => (
                      <TableCell key={f.key}><Skeleton className="h-4 w-full" /></TableCell>
                    ))}
                    <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleFields.length + 2} className="h-60 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      {emptyIcon || <Search className="h-8 w-8 text-text-tertiary/30" />}
                      <p className="text-sm font-medium text-text-secondary">{emptyMessage || "No data found"}</p>
                      <p className="text-xs text-text-tertiary">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => {
                  const id = getId(row);
                  return (
                    <TableRow
                      key={id}
                      className={cn("group", onRowClick && "cursor-pointer hover:bg-surface-hover")}
                      onClick={() => onRowClick?.(row)}
                    >
                      <TableCell className="px-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selected.includes(id)} onCheckedChange={() => toggleOne(id)} aria-label="Select row" />
                      </TableCell>
                      {visibleFields.map((field) => (
                        <TableCell key={field.key} className="text-sm text-text-primary">
                          {renderCell(field, row)}
                        </TableCell>
                      ))}
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        {renderActions?.(row)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {features.pagination && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">
              {total === 0 ? "0 results" : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`}
            </span>
            {onPageSizeChange && (
              <select
                value={pageSize}
                onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
                className="text-xs bg-surface border border-border-subtle rounded-md px-2 py-1 text-text-secondary"
              >
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>{n} / page</option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="h-8 w-8 rounded-md">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "ghost"}
                  size="icon"
                  onClick={() => onPageChange(pageNum)}
                  className={cn("h-8 w-8 rounded-md text-xs", pageNum === page ? "bg-accent text-accent-foreground" : "")}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button variant="ghost" size="icon" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="h-8 w-8 rounded-md">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
