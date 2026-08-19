import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/', (req, res, next) => userController.create(req, res, next));
router.get('/', (req, res, next) => userController.findAll(req, res, next));
router.get('/:id', (req, res, next) => userController.findById(req, res, next));
router.put('/:id', (req, res, next) => userController.update(req, res, next));
router.delete('/:id', (req, res, next) => userController.delete(req, res, next));

export default router;
