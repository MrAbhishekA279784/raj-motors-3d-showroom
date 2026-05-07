import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BikeModel } from './models/Bike';
import { OfferModel } from './models/Offer';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ktm';

const bikes = [
  {
    id: '1',
    bike_name: 'Yamaha R15 V4',
    price: 182000,
    engine: '155cc Liquid Cooled',
    mileage: '45 kmpl',
    top_speed: '140 km/h',
    power: '18.4 PS',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop', // generic bike placeholder Let's keep these
    model_3d: 'model_a.glb',
  },
  {
    id: '2',
    bike_name: 'KTM Duke 250',
    price: 239000,
    engine: '248.7cc Liquid Cooled',
    mileage: '30 kmpl',
    top_speed: '148 km/h',
    power: '31 PS',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070&auto=format&fit=crop',
    model_3d: 'model_b.glb',
  },
  {
    id: '3',
    bike_name: 'TVS Apache RR310',
    price: 272000,
    engine: '312.2cc Liquid Cooled',
    mileage: '30 kmpl',
    top_speed: '160 km/h',
    power: '34 PS',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
    model_3d: 'model_c.glb',
  },
  {
    id: '4',
    bike_name: 'Royal Enfield Hunter',
    price: 149900,
    engine: '349cc Air-Oil Cooled',
    mileage: '36 kmpl',
    top_speed: '114 km/h',
    power: '20.2 PS',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
    model_3d: 'model_d.glb',
  }
];

const offers = [
  {
    id: 'o1',
    title: 'Holi Festival Deal',
    description: 'Celebrate the festival of colors with flat 10% off on ex-showroom prices for all naked sports models.',
    discount: 'Flat 10% Off',
    type: 'festival'
  },
  {
    id: 'o2',
    title: 'Zero Downpayment EMI',
    description: 'Ride home your dream motorcycle today without paying anything upfront. Instant approval available.',
    discount: 'Start @ ₹0 Down',
    type: 'emi'
  },
  {
    id: 'o3',
    title: 'Free Touring Kit',
    description: 'Get a complementary touring kit worth ₹10,000 on the purchase of the Dominar 400 this month.',
    discount: '₹10k Accessories',
    type: 'accessory'
  }
];


const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await BikeModel.deleteMany({});
    await OfferModel.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await BikeModel.insertMany(bikes);
    await OfferModel.insertMany(offers);
    console.log('Database seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
