import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface INoticia extends Omit<Document, '_id'> {
  _id: string;
  titulo: string;
  descricao: string;
  criado_em: Date;
  atualizado_em: Date;
  excluido_em: Date | null;
}

const noticiaSchema = new Schema<INoticia>(
  {
    _id: { type: String, default: () => uuidv4() },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    excluido_em: { type: Date, default: null },
  },
  { timestamps: { createdAt: 'criado_em', updatedAt: 'atualizado_em' } }
);

export const Noticia = model<INoticia>('Noticia', noticiaSchema);
