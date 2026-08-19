import { Router } from 'express';
import { NewsRepository } from '../models/NewsRepository';
import { NewsService } from '../services/NewsService';
import { NewsController } from '../controllers/NewsController';
import { INewsController } from '../controllers/INewsController';

const router = Router();

const newsController: INewsController = new NewsController(new NewsService(new NewsRepository()));

router.get('/', (req, res, next) => newsController.findAll(req, res, next));
router.get('/:title', (req, res, next) => newsController.findByTitle(req, res, next));
router.post('/', (req, res, next) => newsController.create(req, res, next));
router.put('/:id', (req, res, next) => newsController.update(req, res, next));
router.patch('/:id', (req, res, next) => newsController.patch(req, res, next));
router.delete('/:id', (req, res, next) => newsController.delete(req, res, next));

export default router;
