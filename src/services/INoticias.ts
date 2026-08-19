import { INoticia } from '../models/Noticia';
import { ResultadoPaginado, ParametrosPaginacao } from '../types/pagination';

export interface INoticiasService {
  criar(dados: Pick<INoticia, 'titulo' | 'descricao'>): Promise<INoticia>;
  buscarTodas(paginacao: ParametrosPaginacao): Promise<ResultadoPaginado<INoticia>>;
  buscarPorTitulo(titulo: string): Promise<INoticia[]>;
  atualizar(id: string, dados: Partial<Pick<INoticia, 'titulo' | 'descricao'>>): Promise<INoticia | null>;
  excluir(id: string): Promise<INoticia | null>;
}
