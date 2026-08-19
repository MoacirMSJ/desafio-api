import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface INew extends Omit<Document, '_id'> {
  _id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

const newSchema = new Schema<INew>(
  {
    _id: { type: String, default: () => uuidv4() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const New = model<INew>('New', newSchema);
