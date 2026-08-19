import { INoticia } from '../models/Noticia';
import { INoticiasRepository } from '../models/INoticias';
import { INoticiasService } from './INoticias';
import { ResultadoPaginado, ParametrosPaginacao } from '../types/pagination';

export class NoticiasService implements INoticiasService {
  constructor(private readonly noticiasRepository: INoticiasRepository) {}

  async criar(dados: Pick<INoticia, 'titulo' | 'descricao'>): Promise<INoticia> {
    return this.noticiasRepository.criar(dados);
  }

  async buscarTodas(paginacao: ParametrosPaginacao): Promise<ResultadoPaginado<INoticia>> {
    return this.noticiasRepository.buscarTodas(paginacao);
  }

  async buscarPorTitulo(titulo: string): Promise<INoticia[]> {
    return this.noticiasRepository.buscarPorFiltro({ titulo });
  }

  async atualizar(id: string, dados: Partial<Pick<INoticia, 'titulo' | 'descricao'>>): Promise<INoticia | null> {
    return this.noticiasRepository.atualizarPorId(id, dados);
  }

  async excluir(id: string): Promise<INoticia | null> {
    return this.noticiasRepository.excluirPorId(id);
  }
}
