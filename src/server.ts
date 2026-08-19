import app from './app';
import { env } from './config/env';
import { conectarBancoDados } from './config/db';

const PORT = env.port? Number(env.port): 3000

async function iniciarServidor() {
  console.log("env: ", PORT)
  await conectarBancoDados();
  app.listen(PORT ,'0.0.0.0',() => {
    console.log(`Servidor rodando na porta ${env.port}`);
  });
}

iniciarServidor();
