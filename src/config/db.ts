import mongoose from 'mongoose';
import { env } from './env';

export async function conectarBancoDados(): Promise<void> {
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB conectado');
}
