import { Schema, model } from 'mongoose';

export interface IBike {
  id: string; // our custom string ID for matching frontend
  bike_name: string;
  price: number;
  engine: string;
  mileage: string;
  top_speed: string;
  power: string;
  image: string;
  model_3d: string;
}

const bikeSchema = new Schema<IBike>({
  id: { type: String, required: true, unique: true },
  bike_name: { type: String, required: true },
  price: { type: Number, required: true },
  engine: { type: String, required: true },
  mileage: { type: String, required: true },
  top_speed: { type: String, required: true },
  power: { type: String, required: true },
  image: { type: String, required: true },
  model_3d: { type: String, required: true },
}, { timestamps: true });

export const BikeModel = model<IBike>('Bike', bikeSchema);
