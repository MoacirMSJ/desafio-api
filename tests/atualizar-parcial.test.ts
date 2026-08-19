import request from 'supertest';
import app from '../src/app';
import { criarNoticiaFixture } from './helpers/noticia';

describe('PATCH /api/noticias/:id - Atualização parcial', () => {
  it('Cenário 5.1 - Atualizar apenas o título', async () => {
    const noticia = await criarNoticiaFixture({ titulo: 'Original', descricao: 'Descrição original' });

    const resposta = await request(app)
      .patch(`/api/noticias/${noticia._id}`)
      .send({ titulo: 'Novo título' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.titulo).toBe('Novo título');
    expect(resposta.body.descricao).toBe('Descrição original');
  });

  it('Cenário 5.2 - Atualizar apenas a descrição', async () => {
    const noticia = await criarNoticiaFixture({ titulo: 'Original', descricao: 'Descrição original' });

    const resposta = await request(app)
      .patch(`/api/noticias/${noticia._id}`)
      .send({ descricao: 'Nova descrição' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.descricao).toBe('Nova descrição');
    expect(resposta.body.titulo).toBe('Original');
  });

  it('Cenário 5.3 - Atualizar notícia com id inexistente', async () => {
    const idInexistente = 'id-que-nao-existe';

    const resposta = await request(app)
      .patch(`/api/noticias/${idInexistente}`)
      .send({ titulo: 'Qualquer coisa' });

    expect(resposta.status).toBe(404);
    expect(resposta.body.message).toBe('Notícia não encontrada');
  });
});
