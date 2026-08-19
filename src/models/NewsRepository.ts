import { QueryFilter } from 'mongoose';
import { New, INew } from './New';
import { INewsRepository } from './INewsRepository';

export class NewsRepository implements INewsRepository {
  async create(data: Pick<INew, 'title' | 'description'>): Promise<INew> {
    return New.create(data);
  }

  async findAll(): Promise<INew[]> {
    return New.find({ deleted_at: null });
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
