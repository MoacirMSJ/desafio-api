import { INoticia } from '../models/Noticia';
import { INoticiasRepository } from '../models/INoticias';
import { INoticiasService } from './INoticias';
import { ResultadoPaginado, ParametrosPaginacao } from '../types/pagination';
import { NoticiasCache } from './NoticiasCache';

export class NoticiasService implements INoticiasService {
  private readonly noticiasCache = new NoticiasCache();

  constructor(private readonly noticiasRepository: INoticiasRepository) {}

  async criar(dados: Pick<INoticia, 'titulo' | 'descricao'>): Promise<INoticia> {
    return this.noticiasRepository.criar(dados);
  }

  async buscarTodas(paginacao: ParametrosPaginacao): Promise<ResultadoPaginado<INoticia>> {
    return this.noticiasRepository.buscarTodas(paginacao);
  }

  async buscarPorTitulo(titulo: string): Promise<INoticia[]> {
    const emCache = await this.noticiasCache.buscarPorTitulo(titulo);
    if (emCache) {
      return emCache;
    }

    const noticias = await this.noticiasRepository.buscarPorFiltro({ titulo });
    await this.noticiasCache.salvar(titulo, noticias);
    return noticias;
  }

  async atualizar(id: string, dados: Partial<Pick<INoticia, 'titulo' | 'descricao'>>): Promise<INoticia | null> {
    const [existente] = await this.noticiasRepository.buscarPorFiltro({ _id: id });

    const noticia = await this.noticiasRepository.atualizarPorId(id, dados);
    if (!noticia) {
      return null;
    }

    if (existente && existente.titulo !== noticia.titulo) {
      await this.noticiasCache.remover(existente.titulo);
    }
    await this.noticiasCache.salvar(noticia.titulo, [noticia]);

    return noticia;
  }

  async excluir(id: string): Promise<INoticia | null> {
    const noticia = await this.noticiasRepository.excluirPorId(id);
    if (!noticia) {
      return null;
    }

    await this.noticiasCache.remover(noticia.titulo);

    return noticia;
  }
}
