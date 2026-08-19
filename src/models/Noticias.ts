import { QueryFilter } from 'mongoose';
import { Noticia, INoticia } from './Noticia';
import { INoticiasRepository } from './INoticias';
import { ResultadoPaginado, ParametrosPaginacao } from '../types/pagination';

export class NoticiasRepository implements INoticiasRepository {
  async criar(dados: Pick<INoticia, 'titulo' | 'descricao'>): Promise<INoticia> {
    return Noticia.create(dados);
  }

  async buscarTodas({ pagina, limite }: ParametrosPaginacao): Promise<ResultadoPaginado<INoticia>> {
    const skip = (pagina - 1) * limite;
    const [dados, total] = await Promise.all([
      Noticia.find({ excluido_em: null })
        .sort({ criado_em: -1 })
        .skip(skip)
        .limit(limite),
      Noticia.countDocuments({ excluido_em: null }),
    ]);

    return {
      dados,
      pagina,
      limite,
      total,
      totalPaginas: Math.ceil(total / limite),
    };
  }

  async buscarPorFiltro(filtro: QueryFilter<INoticia>): Promise<INoticia[]> {
    return Noticia.find({ ...filtro, excluido_em: null });
  }

  async atualizarPorId(id: string, dados: Partial<Pick<INoticia, 'titulo' | 'descricao'>>): Promise<INoticia | null> {
    return Noticia.findOneAndUpdate({ _id: id, excluido_em: null }, dados, { new: true });
  }

  async excluirPorId(id: string): Promise<INoticia | null> {
    return Noticia.findOneAndUpdate(
      { _id: id, excluido_em: null },
      { excluido_em: new Date() },
      { new: true }
    );
  }
}
