# api-teste-g4f

API REST em Node.js + TypeScript + Express + MongoDB (Mongoose).

## Estrutura

```
src/
├── config/         # env e conexão com o banco
├── models/         # schemas Mongoose
├── controllers/    # camada HTTP
├── services/       # regras de negócio
├── routes/         # definição de endpoints
├── app.ts          # setup do Express
└── server.ts        # bootstrap (conecta ao banco e sobe o servidor)
```

## Requisitos

- Node.js 18+
- MongoDB rodando (local ou remoto)

## Configuração

Copie `.env.example` para `.env` e ajuste conforme necessário:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/api-teste-g4f
```

## Scripts

```bash
npm run dev     # desenvolvimento com hot-reload
npm run build   # compila TS -> dist/
npm start       # roda a versão compilada (dist/server.js)
```

## Testes

Requer Mongo e Redis rodando (`docker compose up -d mongo redis`).

```bash
npm test         # roda a suíte uma vez
npm run test:watch  # modo watch
```

Testes em `tests/`, cenários BDD documentados em `docs/bdd-test-plan.md`.

## Endpoints

- `GET/POST /api/users`
- `GET/PUT/DELETE /api/users/:id`
- `GET/POST /api/products`
- `GET/PUT/DELETE /api/products/:id`
