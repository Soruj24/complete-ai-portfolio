"use client";

import { useState } from "react";
import { Plus, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSkills } from "../hooks/use-skills";
import type { Skill } from "../types";
import { SkillsStats } from "./skills-stats";
import { SkillsToolbar } from "./skills-toolbar";
import { SkillsTable } from "./skills-table";
import { SkillFormDialog } from "./skill-form-dialog";
import { SkillDeleteDialog } from "./skill-delete-dialog";

export function SkillsPage() {
  const {
    filteredSkills, stats, loading, error,
    search, categoryFilter, selected,
    setSearch, setCategoryFilter, setSelected,
    toggleSelectAll, toggleSelect, fetchSkills,
    createSkill, updateSkill, deleteSkill, bulkDelete,
    toggleFeatured, toggleEnabled, updateOrder, moveUp, moveDown, duplicateSkill,
  } = useSkills();

  const [formOpen, setFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditingSkill(null);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data: Parameters<typeof createSkill>[0]) => {
    if (editingSkill) {
      await updateSkill(editingSkill._id, data);
    } else {
      await createSkill(data);
    }
  };

  const handleDeleteClick = (id: string) => {
    const skill = filteredSkills.find((s) => s._id === id);
    setDeleteId(id);
    setDeleteName(skill?.name || "");
    setBulkDeleteMode(false);
  };

  const handleBulkDelete = () => {
    setBulkDeleteMode(true);
    setDeleteName(`${selected.length} skill(s)`);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (bulkDeleteMode) {
      await bulkDelete(selected);
      setBulkDeleteMode(false);
    } else if (deleteId) {
      await deleteSkill(deleteId);
      setDeleteId(null);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <p className="text-[13px] font-medium text-text-primary">Failed to load skills</p>
        <p className="text-[12px] text-text-tertiary mt-1">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchSkills} className="mt-4 h-8 text-[13px]">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Skills</h1>
          <p className="text-[12px] text-text-tertiary">Manage your technical skills and proficiencies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchSkills} className="h-8 text-[13px] gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button size="sm" onClick={handleNew} className="h-8 text-[13px] gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Skill
          </Button>
        </div>
      </div>

      <SkillsStats stats={stats} />

      <SkillsToolbar
        search={search}
        categoryFilter={categoryFilter}
        selected={selected}
        onSearchChange={setSearch}
        onCategoryFilterChange={setCategoryFilter}
        onBulkDelete={handleBulkDelete}
        onClearSelection={() => setSelected([])}
      />

      <SkillsTable
        skills={filteredSkills}
        loading={loading}
        selected={selected}
        onSelectAll={toggleSelectAll}
        onSelect={toggleSelect}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onDuplicate={duplicateSkill}
        onToggleFeatured={toggleFeatured}
        onToggleEnabled={toggleEnabled}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onOrderChange={updateOrder}
      />

      <SkillFormDialog
        open={formOpen}
        editingSkill={editingSkill}
        onClose={() => { setFormOpen(false); setEditingSkill(null); }}
        onSubmit={handleFormSubmit}
      />

      <SkillDeleteDialog
        open={deleteId !== null || bulkDeleteMode}
        skillName={deleteName}
        onConfirm={handleDeleteConfirm}
        onCancel={() => { setDeleteId(null); setBulkDeleteMode(false); }}
      />
    </div>
  );
}
