import { Model, Document, SortOrder } from "mongoose";
import type { PaginationInfo } from "@/shared/types";

export type FilterQuery<T> = {
  [P in keyof T]?: T[P] | { $in?: T[P][]; $gt?: T[P]; $lt?: T[P]; $regex?: string; $options?: string; $or?: FilterQuery<T>[] };
} & Record<string, unknown>;

export interface FindAllParams<T = any> {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
  search?: string;
  searchFields?: (keyof T)[];
  filter?: FilterQuery<T>;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationInfo;
}

export class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findAll(params?: FindAllParams<T>): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      limit = 15,
      sort = "createdAt",
      order = "desc",
      filter = {} as FilterQuery<T>,
    } = params || {};

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model
        .find(filter as any)
        .sort({ [sort]: order })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.model.countDocuments(filter as any),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data as unknown as T[],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).lean() as Promise<T | null>;
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter as any).lean() as Promise<T | null>;
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject() as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .lean() as Promise<T | null>;
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).lean() as Promise<T | null>;
  }

  async count(filter?: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter as any);
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    return this.model.exists(filter as any).then((r) => r !== null);
  }
}
