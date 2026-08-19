import { connectDatabase } from '../config/database';
import { NewsRepository } from '../models/NewsRepository';
import mongoose from 'mongoose';

const TOPICS = [
  'Economia', 'Tecnologia', 'Esportes', 'Política', 'Saúde',
  'Educação', 'Meio Ambiente', 'Cultura', 'Ciência', 'Entretenimento',
];

const HEADLINES = [
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

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

async function seed() {
  await connectDatabase();
  const newsRepository = new NewsRepository();

  const total = 30;
  const created = [];

  for (let i = 1; i <= total; i++) {
    const topic = randomItem(TOPICS);
    const headline = randomItem(HEADLINES);

    const news = await newsRepository.create({
      title: `${headline} #${i} - ${topic}`,
      description: `Notícia fake gerada automaticamente sobre ${topic.toLowerCase()}. Este é o conteúdo de exemplo número ${i} usado para popular o banco de testes.`,
    });

    created.push(news);
  }

  console.log(`${created.length} news criadas com sucesso.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Erro ao popular news:', err);
  process.exit(1);
});
