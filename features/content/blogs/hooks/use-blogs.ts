"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { blogService } from "../services/blog-service";
import type { BlogPost, BlogStats } from "../types";

export function useBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, blogStats] = await Promise.all([blogService.getAll(), blogService.getStats()]);
      setPosts(data);
      setStats(blogStats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => blogService.filter(posts, search, status, category), [posts, search, status, category]);
  const categories = useMemo(() => blogService.getCategories(), []);

  const addPost = useCallback(async (data: Partial<BlogPost>) => {
    const created = await blogService.create(data);
    setPosts((prev) => [...prev, created]);
    return created;
  }, []);

  return { posts, filtered, stats, categories, loading, error, search, setSearch, status, setStatus, category, setCategory, refresh: fetchData, addPost };
}
