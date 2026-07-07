"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useGetAdminResourceQuery, useCreateAdminResourceMutation, useUpdateAdminResourceMutation, useDeleteAdminResourceMutation } from "@/lib/store/api/admin-api";

interface ManagerConfig {
  apiUrl: string;
  dataKey: string;
  entityName: string;
}

export function useManagerCrud<T extends { _id: string }>({ apiUrl, dataKey, entityName }: ManagerConfig) {
  const resource = apiUrl.replace("/api/", "");
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: response, isLoading: loading, refetch } = useGetAdminResourceQuery({ resource, params: { _limit: "100" } });
  const [createResource] = useCreateAdminResourceMutation();
  const [updateResource] = useUpdateAdminResourceMutation();
  const [deleteResource] = useDeleteAdminResourceMutation();

  const items = (response?.data as T[]) || [];

  const handleSave = async (payload: Partial<T>) => {
    setSubmitting(true);
    try {
      if (editingItem) {
        await updateResource({ resource, id: editingItem._id, data: payload }).unwrap();
      } else {
        await createResource({ resource, data: payload }).unwrap();
      }
      toast.success(`${entityName} ${editingItem ? "updated" : "created"}`);
      handleDialogChange(false);
      refetch();
    } catch {
      toast.error(`Error saving ${entityName}`);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: `Delete ${entityName}?`,
      text: `Are you sure you want to delete this ${entityName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    try {
      await deleteResource({ resource, id }).unwrap();
      toast.success(`${entityName} deleted`);
      refetch();
    } catch {
      toast.error(`Error deleting ${entityName}`);
    }
  };

  const handleSeed = async () => {
    const result = await Swal.fire({
      title: "Seed database?",
      text: "This will overwrite existing data with initial data. Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, seed it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (res.ok) {
        toast.success("Database seeded successfully");
        refetch();
      }
    } catch {
      toast.error("Failed to seed database");
    }
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEditingItem(null);
  };

  return {
    items,
    loading,
    submitting,
    dialogOpen,
    editingItem,
    setSubmitting,
    setDialogOpen,
    setEditingItem,
    fetch: refetch,
    handleSave,
    handleDelete,
    handleSeed,
    handleDialogChange,
  };
}
