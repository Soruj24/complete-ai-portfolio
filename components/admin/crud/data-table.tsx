"use client";

import { useState } from "react";
import { Search, EyeOff, LayoutList } from "lucide-react";
import { EmptyState } from "@/components/admin/shared-states";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SortIcon } from "./data-table-sort-icon";
import { renderCell } from "./data-table-cell";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableBulkActions } from "./data-table-bulk-actions";
import { DataTablePagination } from "./data-table-pagination";
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

  const toggleAll = () => {
    onSelectionChange(allSelected ? [] : data.map(r => getId(r)));
  };

  const toggleOne = (id: string) => {
    onSelectionChange(
      selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error/10">
          <EyeOff className="h-5 w-5 text-error" />
        </div>
        <p className="text-text-secondary text-[13px] font-medium">Failed to load data</p>
        <p className="text-text-tertiary text-[12px]">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <DataTableToolbar
        search={search} onSearchChange={onSearchChange}
        searchFocused={searchFocused} onSearchFocus={setSearchFocused}
        features={features} onExport={onExport} onImport={onImport}
        fields={fields} columnVisibility={columnVisibility}
        onColumnVisibilityChange={(key, checked) => setColumnVisibility(prev => ({ ...prev, [key]: checked }))}
      />

      {selected.length > 0 && (features.bulkDelete || features.bulkArchive || features.bulkRestore || (bulkActions && bulkActions.length > 0)) && (
        <DataTableBulkActions selected={selected} onSelectionChange={onSelectionChange} onBulkAction={onBulkAction} features={features} bulkActions={bulkActions} />
      )}

      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
                <TableHead className="w-9 px-3">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />
                </TableHead>
                {visibleFields.map((field) => (
                  <TableHead
                    key={field.key}
                    className={cn(
                      "text-[11px] font-medium text-text-tertiary uppercase tracking-wider h-9",
                      field.sortable && "cursor-pointer select-none hover:text-text-primary",
                    )}
                    style={field.width ? { width: field.width } : undefined}
                    onClick={() => field.sortable && onSort(field.key)}
                  >
                    <div className="flex items-center gap-1">
                      {field.label}
                      {features.sorting && field.sortable !== false && <SortIcon field={field} sortKey={sortKey} sortDir={sortDir} />}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-12 text-right text-[11px] font-medium text-text-tertiary uppercase tracking-wider h-9">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-border-subtle">
                    <TableCell className="px-3"><Skeleton className="h-3.5 w-3.5" /></TableCell>
                    {visibleFields.map((f) => (
                      <TableCell key={f.key}><Skeleton className="h-3.5 w-full" /></TableCell>
                    ))}
                    <TableCell><Skeleton className="h-3.5 w-12 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleFields.length + 2} className="h-48 text-center">
                    <EmptyState
                      icon={LayoutList}
                      title="No data found"
                      description="There are no records to display."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => {
                  const id = getId(row);
                  return (
                    <TableRow
                      key={id}
                      className={cn(
                        "group border-b border-border-subtle last:border-0",
                        onRowClick && "cursor-pointer hover:bg-surface/50",
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      <TableCell className="px-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selected.includes(id)} onCheckedChange={() => toggleOne(id)} aria-label="Select row" />
                      </TableCell>
                      {visibleFields.map((field) => (
                        <TableCell key={field.key} className="text-[13px] text-text-primary py-2.5">
                          {renderCell(field, row)}
                        </TableCell>
                      ))}
                      <TableCell className="text-right py-2.5" onClick={(e) => e.stopPropagation()}>
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

      {features.pagination && (
        <DataTablePagination page={page} pageSize={pageSize} total={total} totalPages={totalPages} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
      )}
    </div>
  );
}
