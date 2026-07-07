"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { testimonialService } from "../services/testimonial-service";
import type { Testimonial } from "../types";

export function useTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try { setItems(await testimonialService.getAll()); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    let result = items;
    if (search) { const q = search.toLowerCase(); result = result.filter((t) => t.name.toLowerCase().includes(q) || t.company.toLowerCase().includes(q) || t.content.toLowerCase().includes(q)); }
    if (rating > 0) result = result.filter((t) => t.rating === rating);
    return result.sort((a, b) => a.order - b.order);
  }, [items, search, rating]);

  const addTestimonial = useCallback(async (data: Partial<Testimonial>) => {
    const created = await testimonialService.create(data);
    setItems((prev) => [...prev, created]);
    return created;
  }, []);

  return { items, filtered, loading, error, search, setSearch, rating, setRating, refresh: fetchData, addTestimonial };
}
