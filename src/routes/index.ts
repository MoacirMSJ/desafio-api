import { Router } from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import newsRoutes from './newsRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/news', newsRoutes);

export default router;
