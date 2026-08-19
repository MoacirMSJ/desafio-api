import { QueryFilter } from 'mongoose';
import { New, INew } from './New';
import { INewsRepository } from './INewsRepository';
import { PaginatedResult, PaginationParams } from '../types/pagination';

export class NewsRepository implements INewsRepository {
  async create(data: Pick<INew, 'title' | 'description'>): Promise<INew> {
    return New.create(data);
  }

  async findAll({ page, limit }: PaginationParams): Promise<PaginatedResult<INew>> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      New.find({ deleted_at: null })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit),
      New.countDocuments({ deleted_at: null }),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByFilter(filter: QueryFilter<INew>): Promise<INew[]> {
    return New.find({ ...filter, deleted_at: null });
  }

  async updateById(id: string, data: Partial<Pick<INew, 'title' | 'description'>>): Promise<INew | null> {
    return New.findOneAndUpdate({ _id: id, deleted_at: null }, data, { new: true });
  }

  async softDeleteById(id: string): Promise<INew | null> {
    return New.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
  }
}
