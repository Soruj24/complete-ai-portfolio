"use client";

import { useEffect } from "react";
import { Plus, MoreHorizontal, Pencil, Trash2, Archive, RotateCcw, Eye, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/crud/data-table";
import { FormDialog } from "@/components/admin/crud/form-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResourceManager } from "@/hooks/use-resource-manager";
import type { ResourceConfig } from "@/types/admin";

interface ResourcePageProps {
  config: ResourceConfig;
}

export function ResourcePage({ config }: ResourcePageProps) {
  const {
    data, total, loading, error, fetchData,
    search, setSearch,
    page, setPage, pageSize, setPageSize,
    sortKey, sortDir, handleSort,
    selected, setSelected,
    dialogOpen, setDialogOpen, dialogMode,     formValues, formErrors, editingId,
    openCreate, openEdit, handleFormChange,
    handleSubmit, handleDelete, handleBulkAction, handleExport,
  } = useResourceManager();

  const endpoint = config.endpoint;
  const features = {
    create: true, update: true, del: true, archive: true, restore: true,
    bulkDelete: true, bulkArchive: true, bulkRestore: true,
    export: true, import: true, history: true,
    search: true, sorting: true, filtering: true, pagination: true,
    ...config.features,
  };

  useEffect(() => { fetchData(endpoint); }, [endpoint, fetchData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{config.name}</h1>
          <p className="text-sm text-text-secondary mt-1">{config.description}</p>
        </div>
        {features.create && (
          <Button onClick={() => openCreate()} className="gap-1.5 rounded-lg bg-accent hover:bg-accent/90 text-xs h-9">
            <Plus className="h-4 w-4" />
            New {config.nameSingular}
          </Button>
        )}
      </div>

      {/* Tabs */}
      {config.tabs && (
        <Tabs defaultValue={config.tabs[0].value}>
          <TabsList className="bg-surface-hover p-0.5 rounded-lg">
            {config.tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="rounded-md text-xs data-[state=active]:bg-surface data-[state=active]:shadow-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Data Table */}
      <DataTable
        fields={config.fields}
        data={data}
        total={total}
        loading={loading}
        error={error}
        features={features}
        search={search}
        onSearchChange={setSearch}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        selected={selected}
        onSelectionChange={setSelected}
        getId={(row) => String(row._id ?? row.id)}
        onRowClick={(row) => openEdit(row)}
        onExport={() => handleExport(endpoint)}
        bulkActions={config.bulkActions}
        onBulkAction={(action, ids) => handleBulkAction(endpoint, action, ids)}
        renderActions={(row) => {
          const id = String(row._id ?? row.id);
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-7 w-7 p-0 rounded-md opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-3.5 w-3.5 text-text-tertiary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36 p-1">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="rounded-md gap-2 text-xs py-1.5">
                  <Pencil className="h-3 w-3" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }} className="rounded-md gap-2 text-xs py-1.5">
                  <Eye className="h-3 w-3" /> View
                </DropdownMenuItem>
                {features.archive && row.status === "published" && (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }} className="rounded-md gap-2 text-xs py-1.5 text-warning">
                    <Archive className="h-3 w-3" /> Archive
                  </DropdownMenuItem>
                )}
                {features.restore && row.status === "archived" && (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }} className="rounded-md gap-2 text-xs py-1.5 text-success">
                    <RotateCcw className="h-3 w-3" /> Restore
                  </DropdownMenuItem>
                )}
                {features.history && (
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }} className="rounded-md gap-2 text-xs py-1.5">
                    <History className="h-3 w-3" /> History
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDelete(endpoint, id); }} className="rounded-md gap-2 text-xs py-1.5 text-error">
                  <Trash2 className="h-3 w-3" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }}
      />

      {/* Form Dialog */}
      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMode === "create" ? `New ${config.nameSingular}` : `Edit ${config.nameSingular}`}
        fields={config.fields}
        values={formValues}
        onChange={handleFormChange}
        onSubmit={() => handleSubmit(endpoint)}
        onDelete={features.del && dialogMode === "edit" ? () => {
          if (editingId) handleDelete(endpoint, editingId);
          setDialogOpen(false);
        } : undefined}
        loading={false}
        mode={dialogMode}
        errors={formErrors}
      />
    </div>
  );
}
