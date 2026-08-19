import { QueryFilter } from 'mongoose';
import { INoticia } from './Noticia';
import { ResultadoPaginado, ParametrosPaginacao } from '../types/pagination';

export interface INoticiasRepository {
  criar(dados: Pick<INoticia, 'titulo' | 'descricao'>): Promise<INoticia>;
  buscarTodas(paginacao: ParametrosPaginacao): Promise<ResultadoPaginado<INoticia>>;
  buscarPorFiltro(filtro: QueryFilter<INoticia>): Promise<INoticia[]>;
  atualizarPorId(id: string, dados: Partial<Pick<INoticia, 'titulo' | 'descricao'>>): Promise<INoticia | null>;
  excluirPorId(id: string): Promise<INoticia | null>;
}
