export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SortState {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterState {
  search: string;
  filters: Record<string, string | string[] | boolean | null>;
}

export function calculatePagination(total: number, page: number, limit: number): PaginationState {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export function paginateQuery<T>(items: T[], page: number, limit: number): { data: T[]; pagination: PaginationState } {
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    pagination: calculatePagination(items.length, page, limit),
  };
}

export function sortItems<T>(items: T[], field: keyof T, direction: "asc" | "desc"): T[] {
  return [...items].sort((a, b) => {
    const aVal = String(a[field] ?? "");
    const bVal = String(b[field] ?? "");
    const cmp = aVal.localeCompare(bVal);
    return direction === "asc" ? cmp : -cmp;
  });
}

export function filterItems<T>(items: T[], search: string, fields: (keyof T)[]): T[] {
  if (!search.trim()) return items;
  const query = search.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => String(item[field] ?? "").toLowerCase().includes(query))
  );
}
