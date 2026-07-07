import type { ApiResponse, PaginationParams, FilterParams } from "@/shared/types";
import { BaseRepository, type RepositoryConfig } from "./base-repository";
import { paginateQuery, sortItems, filterItems } from "@/shared/types";

export abstract class MockRepository<T extends { _id: string }> extends BaseRepository<T> {
  protected abstract generateMockData(): T[];

  private store = new Map<string, T>();

  private get data(): T[] {
    const mock = this.generateMockData();
    const stored = Array.from(this.store.values());
    const merged = [...mock];
    for (const s of stored) {
      const idx = merged.findIndex((m) => m._id === s._id);
      if (idx >= 0) merged[idx] = s;
      else merged.push(s);
    }
    return merged;
  }

  async getAll(params?: PaginationParams & FilterParams): Promise<ApiResponse<T[]>> {
    await this.delay();
    let items = this.data;

    if (params?.search && this.searchFields) {
      items = filterItems(items, params.search, this.searchFields);
    }
    if (params?.sort) {
      items = sortItems(items, params.sort as keyof T, params.order || "asc");
    }
    if (params?.page && params?.limit) {
      const result = paginateQuery(items, params.page, params.limit);
      return { success: true, data: result.data, pagination: result.pagination };
    }

    return { success: true, data: items };
  }

  protected searchFields: (keyof T)[] = [];

  async getById(id: string): Promise<ApiResponse<T>> {
    await this.delay();
    const item = this.data.find((d) => d._id === id);
    if (!item) throw new Error(`${this.config.resourceName} with id ${id} not found`);
    return { success: true, data: item };
  }

  async create(data: Partial<T>): Promise<ApiResponse<T>> {
    await this.delay();
    const id = `mock_${Date.now()}`;
    const item = { _id: id, ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as unknown as T;
    this.store.set(id, item);
    return { success: true, data: item };
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    await this.delay();
    const existing = this.data.find((d) => d._id === id);
    if (!existing) throw new Error(`${this.config.resourceName} with id ${id} not found`);
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() } as unknown as T;
    this.store.set(id, updated);
    return { success: true, data: updated };
  }

  async delete(_id: string): Promise<ApiResponse<boolean>> {
    await this.delay();
    this.store.delete(_id);
    return { success: true, data: true };
  }

  async bulkDelete(_ids: string[]): Promise<ApiResponse<{ deleted: number }>> {
    await this.delay();
    for (const id of _ids) this.store.delete(id);
    return { success: true, data: { deleted: _ids.length } };
  }

  protected delay(): Promise<void> {
    return new Promise((r) => setTimeout(r, 80 + Math.random() * 120));
  }
}
