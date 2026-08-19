import request from 'supertest';
import app from '../src/app';
import { criarNoticiaFixture } from './helpers/noticia';

describe('PUT /api/noticias/:id - Atualização completa', () => {
  it('Cenário 4.1 - Atualizar notícia existente com sucesso', async () => {
    const noticia = await criarNoticiaFixture({ titulo: 'Original', descricao: 'Descrição original' });

    const resposta = await request(app)
      .put(`/api/noticias/${noticia._id}`)
      .send({ titulo: 'Atualizado', descricao: 'Descrição atualizada' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.titulo).toBe('Atualizado');
    expect(resposta.body.descricao).toBe('Descrição atualizada');
  });

  it('Cenário 4.2 - Atualizar sem informar o título', async () => {
    const noticia = await criarNoticiaFixture();

    const resposta = await request(app)
      .put(`/api/noticias/${noticia._id}`)
      .send({ descricao: 'Só descrição' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.message).toBe('titulo e descricao são obrigatórios para atualização completa');
  });

  it('Cenário 4.3 - Atualizar sem informar a descrição', async () => {
    const noticia = await criarNoticiaFixture();

    const resposta = await request(app)
      .put(`/api/noticias/${noticia._id}`)
      .send({ titulo: 'Só título' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.message).toBe('titulo e descricao são obrigatórios para atualização completa');
  });

  it('Cenário 4.4 - Atualizar notícia com id inexistente', async () => {
    const idInexistente = 'id-que-nao-existe';

    const resposta = await request(app)
      .put(`/api/noticias/${idInexistente}`)
      .send({ titulo: 'Título', descricao: 'Descrição' });

    expect(resposta.status).toBe(404);
    expect(resposta.body.message).toBe('Notícia não encontrada');
  });

  it('Cenário 4.5 - Atualizar notícia já excluída', async () => {
    const noticia = await criarNoticiaFixture({ excluido_em: new Date() });

    const resposta = await request(app)
      .put(`/api/noticias/${noticia._id}`)
      .send({ titulo: 'Título', descricao: 'Descrição' });

    expect(resposta.status).toBe(404);
    expect(resposta.body.message).toBe('Notícia não encontrada');
  });
});
