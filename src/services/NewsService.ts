import { INew } from '../models/New';
import { INewsRepository } from '../models/INewsRepository';
import { INewsService } from './INewsService';

export class NewsService implements INewsService {
  constructor(private readonly newsRepository: INewsRepository) {}

  async create(data: Pick<INew, 'title' | 'description'>): Promise<INew> {
    return this.newsRepository.create(data);
  }

  async findAll(): Promise<INew[]> {
    return this.newsRepository.findAll();
  }

  async findByTitle(title: string): Promise<INew[]> {
    return this.newsRepository.findByFilter({ title });
  }

  async update(id: string, data: Partial<Pick<INew, 'title' | 'description'>>): Promise<INew | null> {
    return this.newsRepository.updateById(id, data);
  }

  async delete(id: string): Promise<INew | null> {
    return this.newsRepository.softDeleteById(id);
  }
}
