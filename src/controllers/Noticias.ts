import { Request, Response, NextFunction } from 'express';
import { INoticiasService } from '../services/INoticias';
import { INoticiasController } from './INoticias';

export class NoticiasController implements INoticiasController {
  constructor(private readonly noticiasService: INoticiasService) {}

  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { titulo, descricao } = req.body;
      const noticia = await this.noticiasService.criar({ titulo, descricao });
      res.status(201).json(noticia);
    } catch (err) {
      next(err);
    }
  }

  async buscarTodas(req: Request, res: Response, next: NextFunction) {
    try {
      const pagina = Math.max(1, Number.parseInt(String(req.query.pagina ?? '1'), 10) || 1);
      const limite = Math.max(1, Number.parseInt(String(req.query.limite ?? '10'), 10) || 10);

      const noticias = await this.noticiasService.buscarTodas({ pagina, limite });
      res.json(noticias);
    } catch (err) {
      next(err);
    }
  }

  async buscarPorTitulo(req: Request, res: Response, next: NextFunction) {
    try {
      const noticias = await this.noticiasService.buscarPorTitulo(String(req.params.titulo));
      res.json(noticias);
    } catch (err) {
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const { titulo, descricao } = req.body;
      if (!titulo || !descricao) {
        res.status(400).json({ message: 'titulo e descricao são obrigatórios para atualização completa' });
        return;
      }
      const noticia = await this.noticiasService.atualizar(String(req.params.id), { titulo, descricao });
      if (!noticia) {
        res.status(404).json({ message: 'Notícia não encontrada' });
        return;
      }
      res.json(noticia);
    } catch (err) {
      next(err);
    }
  }

  async atualizarParcial(req: Request, res: Response, next: NextFunction) {
    try {
      const { titulo, descricao } = req.body;
      const dados: { titulo?: string; descricao?: string } = {};
      if (titulo !== undefined) dados.titulo = titulo;
      if (descricao !== undefined) dados.descricao = descricao;

      const noticia = await this.noticiasService.atualizar(String(req.params.id), dados);
      if (!noticia) {
        res.status(404).json({ message: 'Notícia não encontrada' });
        return;
      }
      res.json(noticia);
    } catch (err) {
      next(err);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const noticia = await this.noticiasService.excluir(String(req.params.id));
      if (!noticia) {
        res.status(404).json({ message: 'Notícia não encontrada' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
