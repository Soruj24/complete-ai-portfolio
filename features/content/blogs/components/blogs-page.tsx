"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, LayoutGrid, List } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { toastSuccess } from "@/shared/utils/swal";
import { STATUS_OPTIONS } from "../constants";
import { BlogStats } from "./blog-stats";
import { BlogCard } from "./blog-card";
import { BlogFormDialog } from "./blog-form-dialog";
import { BLOG_STATUS_LABELS } from "../types";
import type { BlogPost, BlogCategory, BlogStats as BlogStatsType } from "../types";

export function BlogsPage() {
  const { data: postsRes, isLoading, error, refetch } = useGetAdminResourceQuery({ resource: "blogs" });
  const { data: catsRes } = useGetAdminResourceQuery({ resource: "blog-categories" });

  const posts: BlogPost[] = useMemo(() => (postsRes?.data ?? []) as BlogPost[], [postsRes]);
  const categories: BlogCategory[] = useMemo(() => (catsRes?.data ?? []) as BlogCategory[], [catsRes]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [category, setCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return posts.filter((post: BlogPost) => {
      if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && !post.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
      if (status !== "all" && post.status !== status) return false;
      if (category && post.category !== category) return false;
      return true;
    });
  }, [posts, search, status, category]);

  const stats: BlogStatsType = useMemo(() => ({
    total: posts.length,
    published: posts.filter((p: BlogPost) => p.status === "published").length,
    draft: posts.filter((p: BlogPost) => p.status === "draft").length,
    review: posts.filter((p: BlogPost) => p.status === "review").length,
    archived: posts.filter((p: BlogPost) => p.status === "archived").length,
    featured: posts.filter((p: BlogPost) => p.featured).length,
    totalViews: posts.reduce((s: number, p: BlogPost) => s + (p.views ?? 0), 0),
    totalComments: posts.reduce((s: number, p: BlogPost) => s + (p.comments ?? 0), 0),
  }), [posts]);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load blogs</p>
      <p className="mt-1 text-sm">{String(error)}</p>
      <button onClick={() => refetch()} className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Blog Posts</h1>
          <p className="text-sm text-text-tertiary">Manage your blog content</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      <BlogStats stats={stats} loading={isLoading} />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-primary bg-surface-primary p-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <input type="text" placeholder="Search posts..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 px-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
          {STATUS_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
          <option value="">All Categories</option>
          {categories.map((c: BlogCategory) => (<option key={c.id} value={c.name}>{c.name}</option>))}
        </select>
        <div className="flex rounded-lg border border-border-primary p-0.5">
          {[{ value: "grid", icon: LayoutGrid }, { value: "list", icon: List }].map((opt) => (
            <button key={opt.value} onClick={() => setView(opt.value as "grid" | "list")}
              className={`rounded-md p-1.5 transition-colors ${view === opt.value ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"}`}>
              <opt.icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {isLoading && filtered.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_: unknown, i: number) => <div key={i} className="h-36 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <p className="text-lg font-medium">No posts found</p>
          <p className="mt-1 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post: BlogPost, i: number) => <BlogCard key={post.id} post={post} index={i} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-border-primary bg-surface-primary overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-primary text-left text-xs text-text-tertiary">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Views</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post: BlogPost) => (
                <tr key={post.id} className="border-b border-border-primary transition-colors hover:bg-surface-hover">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{post.title}</p>
                    <p className="text-xs text-text-tertiary line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      post.status === "published" ? "bg-success/10 text-success" :
                      post.status === "draft" ? "bg-surface-hover text-text-tertiary" :
                      post.status === "review" ? "bg-warning/10 text-warning" :
                      "bg-error/10 text-error"
                    }`}>{BLOG_STATUS_LABELS[post.status]}</span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{post.category}</td>
                  <td className="px-4 py-3 text-text-secondary">{post.views?.toLocaleString() ?? 0}</td>
                  <td className="px-4 py-3 text-xs text-text-tertiary">{new Date(post.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <BlogFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d: Record<string, unknown>) => { await fetch("/api/admin/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }); toastSuccess("Created!", "Blog post has been created."); refetch(); }} />
    </div>
  );
}
