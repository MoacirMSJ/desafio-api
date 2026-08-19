import request from 'supertest';
import app from '../src/app';
import { criarNoticiaFixture } from './helpers/noticia';

describe('GET /api/noticias/:titulo - Buscar notícia por título', () => {
  it('Cenário 3.1 - Buscar por título existente', async () => {
    await criarNoticiaFixture({ titulo: 'TituloExistente' });

    const resposta = await request(app).get('/api/noticias/TituloExistente');

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body).toHaveLength(1);
    expect(resposta.body[0].titulo).toBe('TituloExistente');
  });

  it('Cenário 3.2 - Buscar por título inexistente', async () => {
    const resposta = await request(app).get('/api/noticias/NaoExiste');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([]);
  });

  it('Cenário 3.3 - Notícia excluída não aparece na busca por título', async () => {
    await criarNoticiaFixture({ titulo: 'Excluida', excluido_em: new Date() });

    const resposta = await request(app).get('/api/noticias/Excluida');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([]);
  });
});
