# api-teste-g4f

API RESTFULL para gerenciamento de notícias (CRUD + busca por título e listagem paginada), construída em Node.js + TypeScript + Express, com MongoDB para persistência e Redis para cache.

## Requisitos

- Node.js 18+
- MongoDB e Redis (locais, remotos ou via Docker)

## Estrutura

```
src/
├── config/         # env, conexão com banco e Redis
├── models/         # schemas Mongoose
├── controllers/    # camada HTTP
├── services/       # regras de negócio
├── routes/         # definição de endpoints
├── app.ts          # setup do Express
└── server.ts       # bootstrap (conecta ao banco e sobe o servidor)
```

## Como executar

Copie `.env.example` para `.env` e ajuste conforme necessário:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/api-teste-g4f
REDIS_URL=redis://localhost:6379
```

```bash
npm install
npm run dev     # desenvolvimento com hot-reload
npm run build   # compila TS -> dist/
npm start       # roda a versão compilada (dist/server.js)
```

Documentação Swagger disponível em `/docs` (ex.: http://localhost:3000/docs).

## Como testar

**Localmente:** requer Mongo e Redis rodando.

```bash
npm test            # roda a suíte uma vez
npm run test:watch  # modo watch
```

**Com Docker:** suba as dependências e rode os testes localmente contra elas.

```bash
docker compose up -d
npm test
```

Testes em `tests/`, cenários BDD em `tests/bdd/cenarios.md`.
