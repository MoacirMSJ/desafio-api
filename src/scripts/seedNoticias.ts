import { conectarBancoDados } from '../config/db';
import { NoticiasRepository } from '../models/Noticias';
import mongoose from 'mongoose';

const TOPICOS = [
  'Economia', 'Tecnologia', 'Esportes', 'Política', 'Saúde',
  'Educação', 'Meio Ambiente', 'Cultura', 'Ciência', 'Entretenimento',
];

const MANCHETES = [
  'Governo anuncia novas medidas',
  'Startup levanta rodada de investimento',
  'Time vence campeonato após final emocionante',
  'Pesquisadores descobrem novo tratamento',
  'Cidade recebe investimento em infraestrutura',
  'Empresa lança produto inovador',
  'Estudo revela tendência inesperada',
  'Evento reúne milhares de pessoas',
  'Novo recorde é estabelecido',
  'Especialistas debatem cenário atual',
];

function itemAleatorio<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

async function seed() {
  await conectarBancoDados();
  const noticiasRepository = new NoticiasRepository();

  const total = 30;
  const criadas = [];

  for (let i = 1; i <= total; i++) {
    const topico = itemAleatorio(TOPICOS);
    const manchete = itemAleatorio(MANCHETES);

    const noticia = await noticiasRepository.criar({
      titulo: `${manchete} #${i} - ${topico}`,
      descricao: `Notícia fake gerada automaticamente sobre ${topico.toLowerCase()}. Este é o conteúdo de exemplo número ${i} usado para popular o banco de testes.`,
    });

    criadas.push(noticia);
  }

  console.log(`${criadas.length} notícias criadas com sucesso.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Erro ao popular notícias:', err);
  process.exit(1);
});
