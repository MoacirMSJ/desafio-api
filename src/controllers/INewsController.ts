import { Request, Response, NextFunction } from 'express';

export interface INewsController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByTitle(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  patch(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
