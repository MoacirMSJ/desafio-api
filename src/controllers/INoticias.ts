import { Request, Response, NextFunction } from 'express';

export interface INoticiasController {
  criar(req: Request, res: Response, next: NextFunction): Promise<void>;
  buscarTodas(req: Request, res: Response, next: NextFunction): Promise<void>;
  buscarPorTitulo(req: Request, res: Response, next: NextFunction): Promise<void>;
  atualizar(req: Request, res: Response, next: NextFunction): Promise<void>;
  atualizarParcial(req: Request, res: Response, next: NextFunction): Promise<void>;
  excluir(req: Request, res: Response, next: NextFunction): Promise<void>;
}
