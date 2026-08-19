import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'api-teste-g4f',
      version: '1.0.0',
      description: 'API REST de notícias em Node.js + TypeScript + Express + MongoDB (Mongoose).',
    },
    servers: [
      {
        url: '/api',
        description: 'Prefixo das rotas da API',
      },
    ],
    components: {
      schemas: {
        Noticia: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '650f1c2e9a1b2c3d4e5f6789' },
            titulo: { type: 'string', example: 'Título da notícia' },
            descricao: { type: 'string', example: 'Descrição da notícia' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        NoticiaEntrada: {
          type: 'object',
          required: ['titulo', 'descricao'],
          properties: {
            titulo: { type: 'string', example: 'Título da notícia' },
            descricao: { type: 'string', example: 'Descrição da notícia' },
          },
        },
        NoticiaAtualizacaoParcial: {
          type: 'object',
          properties: {
            titulo: { type: 'string', example: 'Título da notícia' },
            descricao: { type: 'string', example: 'Descrição da notícia' },
          },
        },
        ResultadoPaginado: {
          type: 'object',
          properties: {
            dados: {
              type: 'array',
              items: { $ref: '#/components/schemas/Noticia' },
            },
            total: { type: 'integer', example: 42 },
            pagina: { type: 'integer', example: 1 },
            limite: { type: 'integer', example: 10 },
          },
        },
        Erro: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
