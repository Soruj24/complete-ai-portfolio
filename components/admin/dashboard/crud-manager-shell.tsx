"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useManagerCrud } from "@/hooks/use-manager-crud";

interface ColumnDef {
  head: ReactNode;
  className?: string;
  headClassName?: string;
  cellClassName?: string;
}

interface CrudConfig {
  apiUrl: string;
  dataKey: string;
  entityName: string;
}

interface CrudManagerShellProps {
  config: CrudConfig;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  addLabel: string;
  defaultForm: Record<string, any>;
  renderForm: (props: {
    formData: Record<string, any>;
    setFormData: (data: Record<string, any>) => void;
    submitting: boolean;
  }) => ReactNode;
  renderRow: (item: any) => ReactNode[];
  columns: ColumnDef[];
  transformSubmit?: (formData: Record<string, any>) => Record<string, any>;
  transformEdit?: (item: any) => Record<string, any>;
  dialogWidth?: string;
}

export function CrudManagerShell({
  config, icon: Icon, title, description, addLabel, defaultForm,
  renderForm, renderRow, columns,
  transformSubmit, transformEdit, dialogWidth = "max-w-2xl",
}: CrudManagerShellProps) {
  const {
    items, loading, submitting, dialogOpen, editingItem,
    setDialogOpen, setEditingItem,
    handleSave, handleDelete, handleSeed, handleDialogChange,
  } = useManagerCrud<any>(config);

  const [formData, setFormData] = useState(defaultForm);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(transformEdit ? transformEdit(item) : { ...defaultForm, ...item });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = transformSubmit ? transformSubmit(formData) : formData;
    await handleSave(payload);
    if (!editingItem) setFormData(defaultForm);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
            <Icon className="h-4 w-4 text-text-tertiary" />
            {title}
          </h2>
          <p className="text-xs text-text-tertiary mt-0.5">{description}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleSeed} size="sm" className="h-9 rounded-lg text-xs border-border-subtle">Seed Data</Button>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 rounded-lg text-xs gap-1.5">
                <Plus className="h-3.5 w-3.5" /> {addLabel}
              </Button>
            </DialogTrigger>
            <DialogContent className={`${dialogWidth} max-h-[90vh] overflow-y-auto rounded-xl`}>
              <DialogHeader>
                <DialogTitle>{editingItem ? `Edit ${config.entityName}` : `Add New ${config.entityName}`}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                {renderForm({ formData, setFormData, submitting })}
                <DialogFooter className="pt-4">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingItem ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar rounded-xl border border-border-subtle bg-surface">
        <Table>
          <TableHeader>
            <TableRow className="border-border-subtle hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead key={i} className={`font-medium text-text-tertiary text-xs ${col.headClassName || col.className || ""}`}>{col.head}</TableHead>
              ))}
              <TableHead className="py-3 pr-4 text-right font-medium text-text-tertiary text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto text-text-tertiary" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-12 text-sm text-text-tertiary">No {config.entityName}s found.</TableCell>
              </TableRow>
            ) : (
              items.map((item: any) => (
                <TableRow key={item._id} className="border-border-subtle hover:bg-surface-hover transition-colors">
                  {renderRow(item).map((cell, i) => (
                    <TableCell key={i} className={columns[i]?.cellClassName || columns[i]?.className || ""}>{cell}</TableCell>
                  ))}
                  <TableCell className="py-3 pr-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-accent">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-error">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
