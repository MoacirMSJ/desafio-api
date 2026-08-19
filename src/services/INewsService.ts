import { INew } from '../models/New';

export interface INewsService {
  create(data: Pick<INew, 'title' | 'description'>): Promise<INew>;
  findAll(): Promise<INew[]>;
  findByTitle(title: string): Promise<INew[]>;
  update(id: string, data: Partial<Pick<INew, 'title' | 'description'>>): Promise<INew | null>;
  delete(id: string): Promise<INew | null>;
}
