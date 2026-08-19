import { QueryFilter } from 'mongoose';
import { INew } from './New';
import { PaginatedResult, PaginationParams } from '../types/pagination';

export interface INewsRepository {
  create(data: Pick<INew, 'title' | 'description'>): Promise<INew>;
  findAll(pagination: PaginationParams): Promise<PaginatedResult<INew>>;
  findByFilter(filter: QueryFilter<INew>): Promise<INew[]>;
  updateById(id: string, data: Partial<Pick<INew, 'title' | 'description'>>): Promise<INew | null>;
  softDeleteById(id: string): Promise<INew | null>;
}
