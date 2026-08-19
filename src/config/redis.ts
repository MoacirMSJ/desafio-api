import { createClient, RedisClientType } from 'redis';
import { env } from './env';

export const redisClient: RedisClientType = createClient({ url: env.redisUrl });

redisClient.on('error', (err) => console.error('Erro na conexão com o Redis', err));

export async function conectarRedis(): Promise<void> {
  await redisClient.connect();
  console.log('Redis conectado');
}
