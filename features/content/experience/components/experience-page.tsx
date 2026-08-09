"use client";

import { useState } from "react";
import { Plus, RefreshCw, AlertCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "../hooks/use-experience";
import type { Experience } from "../types";
import { ExperienceToolbar } from "./experience-toolbar";
import { ExperienceTable } from "./experience-table";
import { ExperienceFormDialog } from "./experience-form-dialog";
import { ExperienceDeleteDialog } from "./experience-delete-dialog";
import { ExperienceTimelinePreview } from "./experience-preview";

export function ExperiencePage() {
  const {
    filteredExperiences, stats, loading, error,
    search, typeFilter, selected,
    setSearch, setTypeFilter, setSelected,
    toggleSelectAll, toggleSelect, fetchExperiences,
    createExperience, updateExperience, deleteExperience, bulkDelete,
    toggleEnabled, updateOrder, moveUp, moveDown, duplicateExperience,
  } = useExperience();

  const [formOpen, setFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditingExperience(null);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data: Parameters<typeof createExperience>[0]) => {
    if (editingExperience) {
      await updateExperience(editingExperience._id, data);
    } else {
      await createExperience(data);
    }
  };

  const handleDeleteClick = (id: string) => {
    const exp = filteredExperiences.find((e) => e._id === id);
    setDeleteId(id);
    setDeleteName(exp ? `${exp.role} at ${exp.company}` : "");
    setBulkDeleteMode(false);
  };

  const handleBulkDelete = () => {
    setBulkDeleteMode(true);
    setDeleteName(`${selected.length} experience(s)`);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (bulkDeleteMode) {
      await bulkDelete(selected);
      setBulkDeleteMode(false);
    } else if (deleteId) {
      await deleteExperience(deleteId);
      setDeleteId(null);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-[13px] font-medium text-text-primary">Failed to load experience</p>
        <p className="text-[12px] text-text-tertiary mt-1">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchExperiences} className="mt-4 h-8 text-[13px]">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Experience</h1>
          <p className="text-[12px] text-text-tertiary">Manage your work history and career timeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(!previewOpen)} className="h-8 text-[13px] gap-1.5">
            <Eye className="h-3.5 w-3.5" /> {previewOpen ? "Table" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={fetchExperiences} className="h-8 text-[13px] gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button size="sm" onClick={handleNew} className="h-8 text-[13px] gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Entry
          </Button>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Positions", value: stats.total },
          { label: "Current", value: stats.current },
          { label: "Companies", value: stats.companies },
          { label: "Visible", value: stats.enabled },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border-subtle bg-surface p-3">
            <p className="text-[11px] text-text-tertiary">{s.label}</p>
            <p className="text-[15px] font-semibold text-text-primary tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      <ExperienceToolbar
        search={search}
        typeFilter={typeFilter}
        selected={selected}
        onSearchChange={setSearch}
        onTypeFilterChange={setTypeFilter}
        onBulkDelete={handleBulkDelete}
        onClearSelection={() => setSelected([])}
      />

      {previewOpen ? (
        <ExperienceTimelinePreview experiences={filteredExperiences} />
      ) : (
        <ExperienceTable
          experiences={filteredExperiences}
          loading={loading}
          selected={selected}
          onSelectAll={toggleSelectAll}
          onSelect={toggleSelect}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDuplicate={duplicateExperience}
          onToggleEnabled={toggleEnabled}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onOrderChange={updateOrder}
        />
      )}

      <ExperienceFormDialog
        open={formOpen}
        editingExperience={editingExperience}
        onClose={() => { setFormOpen(false); setEditingExperience(null); }}
        onSubmit={handleFormSubmit}
      />

      <ExperienceDeleteDialog
        open={deleteId !== null || bulkDeleteMode}
        experienceName={deleteName}
        onConfirm={handleDeleteConfirm}
        onCancel={() => { setDeleteId(null); setBulkDeleteMode(false); }}
      />
    </div>
  );
}
