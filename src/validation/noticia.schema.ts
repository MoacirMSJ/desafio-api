import { z } from 'zod';

export const criarNoticiaSchema = z.object({
  titulo: z.string().trim().min(1, 'titulo é obrigatório'),
  descricao: z.string().trim().min(1, 'descricao é obrigatório'),
});

export const atualizarNoticiaSchema = z
  .object({
    titulo: z.string().trim().min(1, 'titulo não pode ser vazio').optional(),
    descricao: z.string().trim().min(1, 'descricao não pode ser vazio').optional(),
  })
  .refine((dados) => dados.titulo !== undefined || dados.descricao !== undefined, {
    message: 'ao menos um campo (titulo ou descricao) deve ser informado',
  });

export const idSchema = z.string().trim().min(1, 'id é obrigatório');

export const tituloBuscaSchema = z.string().trim().min(1, 'titulo é obrigatório');

export const paginacaoSchema = z.object({
  pagina: z.coerce.number().int().positive().default(1),
  limite: z.coerce.number().int().positive().default(10),
});
