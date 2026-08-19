import { Router } from 'express';
import { NoticiasRepository } from '../models/Noticias';
import { NoticiasService } from '../services/Noticias';
import { NoticiasController } from '../controllers/Noticias';
import { INoticiasController } from '../controllers/INoticias';

const router = Router();

const noticiasController: INoticiasController = new NoticiasController(new NoticiasService(new NoticiasRepository()));

/**
 * @openapi
 * /noticias:
 *   get:
 *     summary: Lista notícias paginadas
 *     tags: [Notícias]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limite
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lista paginada de notícias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResultadoPaginado'
 */
router.get('/', (req, res, next) => noticiasController.buscarTodas(req, res, next));

/**
 * @openapi
 * /noticias/{titulo}:
 *   get:
 *     summary: Busca notícias por título
 *     tags: [Notícias]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Notícias encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Noticia'
 */
router.get('/:titulo', (req, res, next) => noticiasController.buscarPorTitulo(req, res, next));

/**
 * @openapi
 * /noticias:
 *   post:
 *     summary: Cria uma nova notícia
 *     tags: [Notícias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoticiaEntrada'
 *     responses:
 *       201:
 *         description: Notícia criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 */
router.post('/', (req, res, next) => noticiasController.criar(req, res, next));

/**
 * @openapi
 * /noticias/{id}:
 *   put:
 *     summary: Atualiza uma notícia por completo
 *     tags: [Notícias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoticiaEntrada'
 *     responses:
 *       200:
 *         description: Notícia atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Notícia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.put('/:id', (req, res, next) => noticiasController.atualizar(req, res, next));

/**
 * @openapi
 * /noticias/{id}:
 *   patch:
 *     summary: Atualiza uma notícia parcialmente
 *     tags: [Notícias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoticiaAtualizacaoParcial'
 *     responses:
 *       200:
 *         description: Notícia atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       404:
 *         description: Notícia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.patch('/:id', (req, res, next) => noticiasController.atualizarParcial(req, res, next));

/**
 * @openapi
 * /noticias/{id}:
 *   delete:
 *     summary: Exclui uma notícia
 *     tags: [Notícias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Notícia excluída
 *       404:
 *         description: Notícia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete('/:id', (req, res, next) => noticiasController.excluir(req, res, next));

export default router;
