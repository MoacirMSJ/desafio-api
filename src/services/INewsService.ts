import { INew } from '../models/New';
import { PaginatedResult, PaginationParams } from '../types/pagination';

export interface INewsService {
  create(data: Pick<INew, 'title' | 'description'>): Promise<INew>;
  findAll(pagination: PaginationParams): Promise<PaginatedResult<INew>>;
  findByTitle(title: string): Promise<INew[]>;
  update(id: string, data: Partial<Pick<INew, 'title' | 'description'>>): Promise<INew | null>;
  delete(id: string): Promise<INew | null>;
}
