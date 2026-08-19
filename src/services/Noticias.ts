import { INoticia } from '../models/Noticia';
import { INoticiasRepository } from '../models/INoticias';
import { INoticiasService } from './INoticias';
import { ResultadoPaginado, ParametrosPaginacao } from '../types/pagination';
import { NoticiasCache } from './NoticiasCache';
import {
  atualizarNoticiaSchema,
  criarNoticiaSchema,
  idSchema,
  paginacaoSchema,
  tituloBuscaSchema,
} from '../validation/noticia.schema';

export class NoticiasService implements INoticiasService {
  private readonly noticiasCache = new NoticiasCache();

  constructor(private readonly noticiasRepository: INoticiasRepository) {}

  async criar(dados: Pick<INoticia, 'titulo' | 'descricao'>): Promise<INoticia> {
    const dadosValidados = criarNoticiaSchema.parse(dados);
    return this.noticiasRepository.criar(dadosValidados);
  }

  async buscarTodas(paginacao: ParametrosPaginacao): Promise<ResultadoPaginado<INoticia>> {
    const paginacaoValidada = paginacaoSchema.parse(paginacao);
    return this.noticiasRepository.buscarTodas(paginacaoValidada);
  }

  async buscarPorTitulo(titulo: string): Promise<INoticia[]> {
    const tituloValidado = tituloBuscaSchema.parse(titulo);

    const emCache = await this.noticiasCache.buscarPorTitulo(tituloValidado);
    if (emCache) {
      return emCache;
    }

    const noticias = await this.noticiasRepository.buscarPorFiltro({ titulo: tituloValidado });
    await this.noticiasCache.salvar(tituloValidado, noticias);
    return noticias;
  }

  async atualizar(id: string, dados: Partial<Pick<INoticia, 'titulo' | 'descricao'>>): Promise<INoticia | null> {
    const idValidado = idSchema.parse(id);
    const dadosValidados = atualizarNoticiaSchema.parse(dados);

    const [existente] = await this.noticiasRepository.buscarPorFiltro({ _id: idValidado });

    const noticia = await this.noticiasRepository.atualizarPorId(idValidado, dadosValidados);
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
    const idValidado = idSchema.parse(id);

    const noticia = await this.noticiasRepository.excluirPorId(idValidado);
    if (!noticia) {
      return null;
    }

    await this.noticiasCache.remover(noticia.titulo);

    return noticia;
  }
}
