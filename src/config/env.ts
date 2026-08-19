import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string().min(1, 'MONGO_URI é obrigatória').url('MONGO_URI deve ser uma URL válida'),
  REDIS_URL: z.string().min(1, 'REDIS_URL é obrigatória').url('REDIS_URL deve ser uma URL válida'),
});

const resultado = envSchema.safeParse(process.env);

if (!resultado.success) {
  console.error('Variáveis de ambiente inválidas:', z.treeifyError(resultado.error));
  throw new Error('Variáveis de ambiente inválidas. Verifique o arquivo .env.');
}

export const env = {
  port: resultado.data.PORT,
  mongoUri: resultado.data.MONGO_URI,
  redisUrl: resultado.data.REDIS_URL,
};
