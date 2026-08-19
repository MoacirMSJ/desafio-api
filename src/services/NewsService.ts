import { QueryFilter } from 'mongoose';
import { New, INew } from '../models/New';

export class NewsService {
  async create(data: Pick<INew, 'title' | 'description'>): Promise<INew> {
    return New.create(data);
  }

  async findAll(): Promise<INew[]> {
    return New.find({ deleted_at: null });
  }

  async findByParam(filter: QueryFilter<INew>): Promise<INew[]> {
    return New.find({ ...filter, deleted_at: null });
  }

  async update(id: string, data: Partial<Pick<INew, 'title' | 'description'>>): Promise<INew | null> {
    return New.findOneAndUpdate({ _id: id, deleted_at: null }, data, { new: true });
  }

  async delete(id: string): Promise<INew | null> {
    return New.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
  }
}
