import { Schema, model } from 'mongoose';

export interface IContactRequest {
  name: string;
  phone: string;
  email: string;
  bikeInterest: string;
  message?: string;
  createdAt: Date;
}

const contactRequestSchema = new Schema<IContactRequest>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  bikeInterest: { type: String, required: true },
  message: { type: String, required: false },
}, { timestamps: true });

export const ContactRequestModel = model<IContactRequest>('ContactRequest', contactRequestSchema);
