import type { ApiResponse, PaginationParams, FilterParams } from "@/shared/types";

export interface RepositoryConfig {
  baseUrl: string;
  resourceName: string;
  useMocks?: boolean;
}

export interface IRepository<T> {
  getAll(params?: PaginationParams & FilterParams): Promise<ApiResponse<T[]>>;
  getById(id: string): Promise<ApiResponse<T>>;
  create(data: Partial<T>): Promise<ApiResponse<T>>;
  update(id: string, data: Partial<T>): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<boolean>>;
  bulkDelete(ids: string[]): Promise<ApiResponse<{ deleted: number }>>;
}

export abstract class BaseRepository<T extends { _id: string }> implements IRepository<T> {
  protected config: RepositoryConfig;

  constructor(config: RepositoryConfig) {
    this.config = config;
  }

  protected get url(): string {
    return `${this.config.baseUrl}/api/admin/${this.config.resourceName}`;
  }

  abstract getAll(params?: PaginationParams & FilterParams): Promise<ApiResponse<T[]>>;
  abstract getById(id: string): Promise<ApiResponse<T>>;
  abstract create(data: Partial<T>): Promise<ApiResponse<T>>;
  abstract update(id: string, data: Partial<T>): Promise<ApiResponse<T>>;
  abstract delete(id: string): Promise<ApiResponse<boolean>>;
  abstract bulkDelete(ids: string[]): Promise<ApiResponse<{ deleted: number }>>;
}
