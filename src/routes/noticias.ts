import { Router } from 'express';
import { NoticiasRepository } from '../models/Noticias';
import { NoticiasService } from '../services/Noticias';
import { NoticiasController } from '../controllers/Noticias';
import { INoticiasController } from '../controllers/INoticias';

const router = Router();

const noticiasController: INoticiasController = new NoticiasController(new NoticiasService(new NoticiasRepository()));

router.get('/', (req, res, next) => noticiasController.buscarTodas(req, res, next));
router.get('/:titulo', (req, res, next) => noticiasController.buscarPorTitulo(req, res, next));
router.post('/', (req, res, next) => noticiasController.criar(req, res, next));
router.put('/:id', (req, res, next) => noticiasController.atualizar(req, res, next));
router.patch('/:id', (req, res, next) => noticiasController.atualizarParcial(req, res, next));
router.delete('/:id', (req, res, next) => noticiasController.excluir(req, res, next));

export default router;
