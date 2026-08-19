import { Noticia, INoticia } from '../../src/models/Noticia';

export async function criarNoticiaFixture(
  overrides: Partial<Pick<INoticia, 'titulo' | 'descricao' | 'excluido_em'>> = {}
): Promise<INoticia> {
  return Noticia.create({
    titulo: overrides.titulo ?? 'Título Padrão',
    descricao: overrides.descricao ?? 'Descrição padrão',
    excluido_em: overrides.excluido_em ?? null,
  });
}
