# Plano de Testes BDD — API de Notícias

## Introdução

Este documento descreve o plano de testes BDD (Behavior-Driven Development) para a API de Notícias (`/api/noticias`), construída em Express + TypeScript, com persistência em MongoDB e cache em Redis.

**Objetivo:** mapear as funcionalidades reais expostas pela API e descrever, em cenários no formato Given/When/Then, os testes que validam o comportamento esperado de cada uma — cobrindo o caminho feliz e os principais casos de erro.

**Escopo:** os 6 endpoints do recurso `noticias`:

| Método | Rota | Funcionalidade |
|---|---|---|
| POST | `/api/noticias` | Criar notícia |
| GET | `/api/noticias` | Listar notícias (paginado) |
| GET | `/api/noticias/:titulo` | Buscar notícia por título |
| PUT | `/api/noticias/:id` | Atualização completa |
| PATCH | `/api/noticias/:id` | Atualização parcial |
| DELETE | `/api/noticias/:id` | Excluir notícia (soft-delete) |

**Fora do escopo desta etapa:** os cenários abaixo cobrem caminho feliz + principais erros. Não é feita cobertura detalhada do comportamento do cache Redis (`NoticiasCache`, usado em `buscarPorTitulo` com invalidação em `atualizar`/`excluir`) — fica registrado aqui como área a ser coberta em uma etapa futura, se necessário.


**Modelo de dados (`Noticia`):**

```
_id: string (uuid v4, gerado automaticamente)
titulo: string (obrigatório)
descricao: string (obrigatório)
criado_em: Date (timestamp automático)
atualizado_em: Date (timestamp automático)
excluido_em: Date | null (marcador de soft-delete, default null)
```

---

## 1. Criar notícia — `POST /api/noticias`

**Descrição:** cria uma nova notícia a partir de `titulo` e `descricao` enviados no corpo da requisição. Não há validação explícita no controller — a obrigatoriedade dos campos é garantida apenas pelo schema do Mongoose (`required: true`), e um erro de validação do Mongoose não é tratado/traduzido para uma resposta HTTP limpa.

### Cenário 1.1 — Criar notícia com sucesso
```
Dado que eu tenho um título e uma descrição válidos
Quando eu envio uma requisição POST para /api/noticias com esses dados
Então a resposta deve ter status 201
E o corpo da resposta deve conter a notícia criada com _id, titulo, descricao, criado_em, atualizado_em e excluido_em nulo
```

### Cenário 1.2 — Tentar criar notícia sem o título (caso de erro / gap conhecido)
```
Dado que eu tenho apenas uma descrição, sem título
Quando eu envio uma requisição POST para /api/noticias com esses dados
Então a resposta não deve ser um 400 tratado
E a aplicação deve propagar um erro de validação do Mongoose não tratado
  (comportamento atual: não há tratamento de erro no controller nem middleware de erro na aplicação)
```

### Cenário 1.3 — Tentar criar notícia sem a descrição (caso de erro / gap conhecido)
```
Dado que eu tenho apenas um título, sem descrição
Quando eu envio uma requisição POST para /api/noticias com esses dados
Então a resposta não deve ser um 400 tratado
E a aplicação deve propagar um erro de validação do Mongoose não tratado
```

---

## 2. Listar notícias (paginado) — `GET /api/noticias`

**Descrição:** retorna uma lista paginada de notícias não excluídas, ordenadas por `criado_em` decrescente. Aceita os parâmetros de query `pagina` (default 1) e `limite` (default 10); valores ausentes ou não numéricos caem para os defaults.

### Cenário 2.1 — Listar sem parâmetros de paginação
```
Dado que existem notícias cadastradas no sistema
Quando eu envio uma requisição GET para /api/noticias sem parâmetros de query
Então a resposta deve ter status 200
E deve usar pagina=1 e limite=10 como padrão
E o corpo deve conter dados, pagina, limite, total e totalPaginas
```

### Cenário 2.2 — Listar com parâmetros de paginação customizados
```
Dado que existem mais de 10 notícias cadastradas
Quando eu envio uma requisição GET para /api/noticias?pagina=2&limite=5
Então a resposta deve ter status 200
E deve retornar até 5 notícias referentes à página 2
```

### Cenário 2.3 — Notícias excluídas não aparecem na listagem
```
Dado que existe uma notícia que já foi excluída (soft-delete)
Quando eu envio uma requisição GET para /api/noticias
Então a notícia excluída não deve aparecer na lista de resultados
```

### Cenário 2.4 — Parâmetros de paginação inválidos usam os valores padrão
```
Dado que existem notícias cadastradas no sistema
Quando eu envio uma requisição GET para /api/noticias?pagina=abc&limite=xyz
Então a resposta deve ter status 200
E deve usar pagina=1 e limite=10 (os valores padrão), ignorando os valores inválidos
```

---

## 3. Buscar notícia por título — `GET /api/noticias/:titulo`

**Descrição:** busca notícias cujo `titulo` corresponde ao parâmetro informado. Utiliza cache Redis internamente (fora do escopo de cobertura detalhada deste plano). Sempre retorna um array — nunca 404, mesmo quando não há correspondência.

### Cenário 3.1 — Buscar por título existente
```
Dado que existe uma notícia com o título "Título Exemplo"
Quando eu envio uma requisição GET para /api/noticias/Título Exemplo
Então a resposta deve ter status 200
E o corpo deve ser um array contendo a notícia correspondente
```

### Cenário 3.2 — Buscar por título inexistente
```
Dado que não existe nenhuma notícia com o título "Não Existe"
Quando eu envio uma requisição GET para /api/noticias/Não Existe
Então a resposta deve ter status 200
E o corpo deve ser um array vazio
```

### Cenário 3.3 — Notícia excluída não aparece na busca por título
```
Dado que existe uma notícia com o título "Excluída" que já foi excluída (soft-delete)
Quando eu envio uma requisição GET para /api/noticias/Excluída
Então a resposta deve ter status 200
E o corpo deve ser um array vazio
```

---

## 4. Atualização completa — `PUT /api/noticias/:id`

**Descrição:** atualiza integralmente uma notícia existente. Exige `titulo` e `descricao` no corpo da requisição — ambos obrigatórios. Retorna 404 se o id não existir ou já tiver sido excluído (soft-deleted), pois o repositório filtra registros com `excluido_em != null`.

### Cenário 4.1 — Atualizar notícia existente com sucesso
```
Dado que existe uma notícia cadastrada com um id válido
Quando eu envio uma requisição PUT para /api/noticias/:id com novo titulo e descricao
Então a resposta deve ter status 200
E o corpo deve conter a notícia atualizada com os novos valores
```

### Cenário 4.2 — Atualizar sem informar o título
```
Dado que existe uma notícia cadastrada com um id válido
Quando eu envio uma requisição PUT para /api/noticias/:id apenas com descricao
Então a resposta deve ter status 400
E a mensagem deve ser "titulo e descricao são obrigatórios para atualização completa"
```

### Cenário 4.3 — Atualizar sem informar a descrição
```
Dado que existe uma notícia cadastrada com um id válido
Quando eu envio uma requisição PUT para /api/noticias/:id apenas com titulo
Então a resposta deve ter status 400
E a mensagem deve ser "titulo e descricao são obrigatórios para atualização completa"
```

### Cenário 4.4 — Atualizar notícia com id inexistente
```
Dado que não existe nenhuma notícia com o id informado
Quando eu envio uma requisição PUT para /api/noticias/:id com titulo e descricao válidos
Então a resposta deve ter status 404
E a mensagem deve ser "Notícia não encontrada"
```

### Cenário 4.5 — Atualizar notícia já excluída
```
Dado que existe uma notícia que já foi excluída (soft-delete)
Quando eu envio uma requisição PUT para /api/noticias/:id (o id da notícia excluída) com titulo e descricao válidos
Então a resposta deve ter status 404
E a mensagem deve ser "Notícia não encontrada"
```

---

## 5. Atualização parcial — `PATCH /api/noticias/:id`

**Descrição:** atualiza parcialmente uma notícia — `titulo` e `descricao` são ambos opcionais; apenas os campos enviados (diferentes de `undefined`) são atualizados.

### Cenário 5.1 — Atualizar apenas o título
```
Dado que existe uma notícia cadastrada com titulo "Original" e descricao "Descrição original"
Quando eu envio uma requisição PATCH para /api/noticias/:id apenas com um novo titulo
Então a resposta deve ter status 200
E o titulo deve ser atualizado
E a descricao deve permanecer "Descrição original"
```

### Cenário 5.2 — Atualizar apenas a descrição
```
Dado que existe uma notícia cadastrada com titulo "Original" e descricao "Descrição original"
Quando eu envio uma requisição PATCH para /api/noticias/:id apenas com uma nova descricao
Então a resposta deve ter status 200
E a descricao deve ser atualizada
E o titulo deve permanecer "Original"
```

### Cenário 5.3 — Atualizar notícia com id inexistente
```
Dado que não existe nenhuma notícia com o id informado
Quando eu envio uma requisição PATCH para /api/noticias/:id com qualquer campo
Então a resposta deve ter status 404
```

---

## 6. Excluir notícia (soft-delete) — `DELETE /api/noticias/:id`

**Descrição:** realiza exclusão lógica (soft-delete), definindo `excluido_em` com a data/hora atual. A notícia deixa de aparecer em listagens e buscas, mas permanece no banco de dados. Uma vez excluída, uma segunda tentativa de exclusão retorna 404 (a operação não é idempotente).

### Cenário 6.1 — Excluir notícia existente com sucesso
```
Dado que existe uma notícia cadastrada com um id válido
Quando eu envio uma requisição DELETE para /api/noticias/:id
Então a resposta deve ter status 204
E o corpo da resposta deve estar vazio
E a notícia não deve mais aparecer em listagens ou buscas por título
```

### Cenário 6.2 — Excluir notícia com id inexistente
```
Dado que não existe nenhuma notícia com o id informado
Quando eu envio uma requisição DELETE para /api/noticias/:id
Então a resposta deve ter status 404
```

### Cenário 6.3 — Excluir a mesma notícia duas vezes
```
Dado que uma notícia já foi excluída (soft-delete) anteriormente
Quando eu envio uma nova requisição DELETE para /api/noticias/:id (o mesmo id)
Então a resposta deve ter status 404
```
