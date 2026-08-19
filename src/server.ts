import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';

async function bootstrap() {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Servidor rodando na porta ${env.port}`);
  });
}

bootstrap();
