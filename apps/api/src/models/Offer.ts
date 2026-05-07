import { Schema, model } from 'mongoose';

export interface IOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  type?: string; 
}

const offerSchema = new Schema<IOffer>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, required: true },
  type: { type: String, required: false },
}, { timestamps: true });

export const OfferModel = model<IOffer>('Offer', offerSchema);
