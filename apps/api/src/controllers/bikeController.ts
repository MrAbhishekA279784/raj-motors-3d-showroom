import { Request, Response } from 'express';
import { BikeModel } from '../models/Bike';

const MOCK_BIKES = [
  { id: '1', bike_name: 'Yamaha R15 V4', price: 182000, engine: '155cc Liquid Cooled', mileage: '45 kmpl', top_speed: '140 km/h', power: '18.4 PS', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop', model_3d: 'model_a.glb' },
  { id: '2', bike_name: 'KTM Duke 250', price: 239000, engine: '248.7cc Liquid Cooled', mileage: '30 kmpl', top_speed: '148 km/h', power: '31 PS', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070&auto=format&fit=crop', model_3d: 'model_b.glb' },
  { id: '3', bike_name: 'TVS Apache RR310', price: 272000, engine: '312.2cc Liquid Cooled', mileage: '30 kmpl', top_speed: '160 km/h', power: '34 PS', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop', model_3d: 'model_c.glb' },
  { id: '4', bike_name: 'Royal Enfield Hunter', price: 149900, engine: '349cc Air-Oil Cooled', mileage: '36 kmpl', top_speed: '114 km/h', power: '20.2 PS', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop', model_3d: 'model_d.glb' }
];

export const getBikes = async (req: Request, res: Response) => {
  try {
    const bikes = await BikeModel.find().sort({ createdAt: -1 });
    if (bikes.length === 0) return res.status(200).json(MOCK_BIKES);
    res.status(200).json(bikes);
  } catch (error) {
    console.warn('DB Error fetching bikes, using fallback.');
    res.status(200).json(MOCK_BIKES);
  }
};
