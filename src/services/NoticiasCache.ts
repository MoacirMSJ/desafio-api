import { redisClient } from '../config/redis';
import { INoticia } from '../models/Noticia';

const HASH_KEY = 'noticias';

export class NoticiasCache {
  async buscarPorTitulo(titulo: string): Promise<INoticia[] | null> {
    const valor = await redisClient.hGet(HASH_KEY, titulo);
    return valor ? JSON.parse(valor) : null;
  }

  async salvar(titulo: string, noticias: INoticia[]): Promise<void> {
    await redisClient.hSet(HASH_KEY, titulo, JSON.stringify(noticias));
  }

  async remover(titulo: string): Promise<void> {
    await redisClient.hDel(HASH_KEY, titulo);
  }
}
