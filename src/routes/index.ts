import { Router } from 'express';
import newsRoutes from './newsRoutes';

const router = Router();

router.use('/news', newsRoutes);

export default router;
