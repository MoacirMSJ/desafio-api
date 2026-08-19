import request from 'supertest';
import app from '../src/app';
import { criarNoticiaFixture } from './helpers/noticia';

describe('DELETE /api/noticias/:id - Excluir notícia (soft-delete)', () => {
  it('Cenário 6.1 - Excluir notícia existente com sucesso', async () => {
    const noticia = await criarNoticiaFixture({ titulo: 'Para excluir' });

    const resposta = await request(app).delete(`/api/noticias/${noticia._id}`);

    expect(resposta.status).toBe(204);
    expect(resposta.body).toEqual({});

    const listagem = await request(app).get('/api/noticias');
    expect(listagem.body.dados).toHaveLength(0);

    const busca = await request(app).get('/api/noticias/Para excluir');
    expect(busca.body).toEqual([]);
  });

  it('Cenário 6.2 - Excluir notícia com id inexistente', async () => {
    const idInexistente = 'id-que-nao-existe';

    const resposta = await request(app).delete(`/api/noticias/${idInexistente}`);

    expect(resposta.status).toBe(404);
    expect(resposta.body.message).toBe('Notícia não encontrada');
  });

  it('Cenário 6.3 - Excluir a mesma notícia duas vezes', async () => {
    const noticia = await criarNoticiaFixture();
    await request(app).delete(`/api/noticias/${noticia._id}`);

    const resposta = await request(app).delete(`/api/noticias/${noticia._id}`);

    expect(resposta.status).toBe(404);
    expect(resposta.body.message).toBe('Notícia não encontrada');
  });
});
