import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ktm';

export const connectDB = async () => {
  try {
    // Set a short timeout for connection since we're local testing
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed. API will use fallback data.');
    return false;
  }
};
