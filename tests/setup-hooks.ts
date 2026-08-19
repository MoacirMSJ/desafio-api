import mongoose from 'mongoose';
import { conectarBancoDados } from '../src/config/db';
import { conectarRedis, redisClient } from '../src/config/redis';
import { Noticia } from '../src/models/Noticia';

beforeAll(async () => {
  await conectarBancoDados();
  await conectarRedis();
});

afterEach(async () => {
  await Noticia.deleteMany({});
  await redisClient.flushDb();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await redisClient.quit();
});
