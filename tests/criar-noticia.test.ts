import request from 'supertest';
import app from '../src/app';

describe('POST /api/noticias - Criar notícia', () => {
  it('Cenário 1.1 - Criar notícia com sucesso', async () => {
    const dados = { titulo: 'Título Exemplo', descricao: 'Descrição de exemplo' };

    const resposta = await request(app).post('/api/noticias').send(dados);

    expect(resposta.status).toBe(201);
    expect(resposta.body).toMatchObject({
      titulo: dados.titulo,
      descricao: dados.descricao,
      excluido_em: null,
    });
    expect(resposta.body._id).toBeTruthy();
    expect(resposta.body.criado_em).toBeTruthy();
    expect(resposta.body.atualizado_em).toBeTruthy();
  });

  it('Cenário 1.2 - Tentar criar notícia sem o título (gap conhecido)', async () => {
    const dados = { descricao: 'Descrição sem título' };

    const resposta = await request(app).post('/api/noticias').send(dados);

    expect(resposta.status).not.toBe(201);
    expect(resposta.status).toBeGreaterThanOrEqual(400);
  });

  it('Cenário 1.3 - Tentar criar notícia sem a descrição (gap conhecido)', async () => {
    const dados = { titulo: 'Título sem descrição' };

    const resposta = await request(app).post('/api/noticias').send(dados);

    expect(resposta.status).not.toBe(201);
    expect(resposta.status).toBeGreaterThanOrEqual(400);
  });
});
