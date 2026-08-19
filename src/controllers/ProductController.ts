import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.findAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(String(req.params.id));
      if (!product) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(String(req.params.id), req.body);
      if (!product) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.delete(String(req.params.id));
      if (!product) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
