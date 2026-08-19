import { Request, Response, NextFunction } from 'express';
import { INewsService } from '../services/INewsService';
import { INewsController } from './INewsController';

export class NewsController implements INewsController {
  constructor(private readonly newsService: INewsService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const news = await this.newsService.create({ title, description });
      res.status(201).json(news);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await this.newsService.findAll();
      res.json(news);
    } catch (err) {
      next(err);
    }
  }

  async findByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await this.newsService.findByTitle(String(req.params.title));
      res.json(news);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        res.status(400).json({ message: 'title e description são obrigatórios para atualização completa' });
        return;
      }
      const news = await this.newsService.update(String(req.params.id), { title, description });
      if (!news) {
        res.status(404).json({ message: 'News não encontrada' });
        return;
      }
      res.json(news);
    } catch (err) {
      next(err);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const data: { title?: string; description?: string } = {};
      if (title !== undefined) data.title = title;
      if (description !== undefined) data.description = description;

      const news = await this.newsService.update(String(req.params.id), data);
      if (!news) {
        res.status(404).json({ message: 'News não encontrada' });
        return;
      }
      res.json(news);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await this.newsService.delete(String(req.params.id));
      if (!news) {
        res.status(404).json({ message: 'News não encontrada' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
