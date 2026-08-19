import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';

const PORT = env.port? Number(env.port): 3000

async function startServer() {
  console.log("env: ", PORT)
  await connectDatabase();
  app.listen(PORT ,'0.0.0.0',() => {
    console.log(`Servidor rodando na porta ${env.port}`);
  });
}

startServer();
