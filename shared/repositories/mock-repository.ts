import type { ApiResponse, PaginationParams, FilterParams } from "@/shared/types";
import { BaseRepository, type RepositoryConfig } from "./base-repository";
import { paginateQuery, sortItems, filterItems } from "@/shared/types";

export abstract class MockRepository<T extends { _id: string }> extends BaseRepository<T> {
  protected abstract generateMockData(): T[];

  private get data(): T[] {
    return this.generateMockData();
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
    const item = { _id: `mock_${Date.now()}`, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as unknown as T;
    return { success: true, data: item };
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    await this.delay();
    const existing = this.data.find((d) => d._id === id);
    if (!existing) throw new Error(`${this.config.resourceName} with id ${id} not found`);
    return { success: true, data: { ...existing, ...data, updatedAt: new Date().toISOString() } };
  }

  async delete(_id: string): Promise<ApiResponse<boolean>> {
    await this.delay();
    return { success: true, data: true };
  }

  async bulkDelete(_ids: string[]): Promise<ApiResponse<{ deleted: number }>> {
    await this.delay();
    return { success: true, data: { deleted: _ids.length } };
  }

  protected delay(): Promise<void> {
    return new Promise((r) => setTimeout(r, 80 + Math.random() * 120));
  }
}
