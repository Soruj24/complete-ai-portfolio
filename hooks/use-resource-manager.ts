"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useGetAdminResourceQuery, useCreateAdminResourceMutation, useUpdateAdminResourceMutation, useDeleteAdminResourceMutation } from "@/lib/store/api/admin-api";

export function useResourceManager() {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<string[]>([]);
  const [endpoint, setEndpoint] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resource = endpoint.replace(/^\/api\/admin\//, "");

  const { data: response, isLoading: loading, refetch } = useGetAdminResourceQuery(
    { resource, params: { page, limit: pageSize, sort: sortKey, order: sortDir, search } },
    { skip: !endpoint }
  );

  const [createResource] = useCreateAdminResourceMutation();
  const [updateResource] = useUpdateAdminResourceMutation();
  const [deleteResource] = useDeleteAdminResourceMutation();

  const data = (response?.data as Record<string, unknown>[]) || [];

  useEffect(() => {
    if (response?.pagination) {
      setTotal(response.pagination.total);
    } else {
      setTotal(data.length);
    }
  }, [response, data]);

  const fetchData = useCallback(async (ep: string) => {
    setEndpoint(ep);
    setError(null);
  }, []);

  useEffect(() => {
    if (endpoint) refetch();
  }, [endpoint, search, page, pageSize, sortKey, sortDir, refetch]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const openCreate = (defaults?: Record<string, unknown>) => {
    setDialogMode("create");
    setFormValues(defaults ?? {});
    setEditingId(null);
    setFormErrors({});
    setDialogOpen(true);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setDialogMode("edit");
    setFormValues({ ...item });
    setEditingId(String(item._id ?? item.id));
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleFormChange = (key: string, value: unknown) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
    if (formErrors[key]) {
      setFormErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
    }
  };

  const handleSubmit = async (_endpoint?: string) => {
    if (_endpoint && _endpoint !== endpoint) setEndpoint(_endpoint);
    try {
      if (dialogMode === "create") {
        await createResource({ resource, data: formValues }).unwrap();
      } else if (editingId) {
        await updateResource({ resource, id: editingId, data: formValues }).unwrap();
      }
      toast.success(dialogMode === "create" ? "Created successfully" : "Updated successfully");
      setDialogOpen(false);
      refetch();
    } catch (err: any) {
      if (err?.data?.error?.details) {
        setFormErrors(err.data.error.details);
      }
      toast.error(err?.data?.message || err?.message || "Request failed");
    }
  };

  const handleDelete = async (_endpoint: string, id: string) => {
    try {
      await deleteResource({ resource, id }).unwrap();
      toast.success("Deleted successfully");
      refetch();
      setSelected(s => s.filter(x => x !== id));
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Delete failed");
    }
  };

  const handleBulkAction = async (_endpoint: string, action: string, ids: string[]) => {
    try {
      const res = await fetch(`${endpoint}/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids }),
      });
      if (!res.ok) throw new Error(`${action} failed`);
      toast.success(`${ids.length} items ${action}d`);
      refetch();
      setSelected([]);
    } catch (err: any) {
      toast.error(err.message || `${action} failed`);
    }
  };

  const handleExport = async (_endpoint: string) => {
    try {
      const res = await fetch(`${endpoint}/export`);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "export.csv"; a.click();
      URL.revokeObjectURL(url);
      toast.success("Exported successfully");
    } catch (err: any) {
      toast.error(err.message || "Export failed");
    }
  };

  return {
    data, total, loading, error,
    search, setSearch: handleSearch,
    page, setPage, pageSize, setPageSize: (s: number) => { setPageSize(s); setPage(1); },
    sortKey, sortDir, handleSort,
    selected, setSelected,
    dialogOpen, setDialogOpen: (o: boolean) => { setDialogOpen(o); if (!o) setEditingId(null); },
    dialogMode, formValues, formErrors, editingId,
    openCreate, openEdit, handleFormChange,
    handleSubmit: (endpoint?: string) => handleSubmit(endpoint),
    handleDelete: (endpoint: string, id: string) => handleDelete(endpoint, id),
    handleBulkAction: (endpoint: string, action: string, ids: string[]) => handleBulkAction(endpoint, action, ids),
    handleExport: (endpoint: string) => handleExport(endpoint),
    fetchData: (endpoint: string) => fetchData(endpoint),
  };
}
