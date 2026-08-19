import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(String(req.params.id));
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(String(req.params.id), req.body);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.delete(String(req.params.id));
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
