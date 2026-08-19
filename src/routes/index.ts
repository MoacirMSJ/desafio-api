import { Router } from 'express';
import noticiasRoutes from './noticias';

const router = Router();

router.use('/noticias', noticiasRoutes);

export default router;
