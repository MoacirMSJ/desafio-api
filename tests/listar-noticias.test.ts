import request from 'supertest';
import app from '../src/app';
import { criarNoticiaFixture } from './helpers/noticia';

describe('GET /api/noticias - Listar notícias (paginado)', () => {
  it('Cenário 2.1 - Listar sem parâmetros de paginação usa os valores padrão', async () => {
    await criarNoticiaFixture({ titulo: 'Notícia 1' });
    await criarNoticiaFixture({ titulo: 'Notícia 2' });

    const resposta = await request(app).get('/api/noticias');

    expect(resposta.status).toBe(200);
    expect(resposta.body.pagina).toBe(1);
    expect(resposta.body.limite).toBe(10);
    expect(resposta.body.total).toBe(2);
    expect(resposta.body.dados).toHaveLength(2);
  });

  it('Cenário 2.2 - Listar com parâmetros de paginação customizados', async () => {
    for (let i = 1; i <= 12; i += 1) {
      await criarNoticiaFixture({ titulo: `Notícia ${i}` });
    }

    const resposta = await request(app).get('/api/noticias').query({ pagina: 2, limite: 5 });

    expect(resposta.status).toBe(200);
    expect(resposta.body.pagina).toBe(2);
    expect(resposta.body.limite).toBe(5);
    expect(resposta.body.dados).toHaveLength(5);
    expect(resposta.body.total).toBe(12);
  });

  it('Cenário 2.3 - Notícias excluídas não aparecem na listagem', async () => {
    await criarNoticiaFixture({ titulo: 'Notícia ativa' });
    await criarNoticiaFixture({ titulo: 'Notícia excluída', excluido_em: new Date() });

    const resposta = await request(app).get('/api/noticias');

    expect(resposta.status).toBe(200);
    expect(resposta.body.total).toBe(1);
    expect(resposta.body.dados.map((n: { titulo: string }) => n.titulo)).toEqual(['Notícia ativa']);
  });

  it('Cenário 2.4 - Parâmetros de paginação inválidos usam os valores padrão', async () => {
    await criarNoticiaFixture();

    const resposta = await request(app).get('/api/noticias').query({ pagina: 'abc', limite: 'xyz' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.pagina).toBe(1);
    expect(resposta.body.limite).toBe(10);
  });
});
