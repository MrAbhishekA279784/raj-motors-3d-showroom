import { Request, Response } from 'express';
import { OfferModel } from '../models/Offer';

const MOCK_OFFERS = [
  { id: 'o1', title: 'Holi Festival Deal', description: 'Celebrate the festival of colors with flat 10% off on ex-showroom prices for all naked sports models.', discount: 'Flat 10% Off', type: 'festival' },
  { id: 'o2', title: 'Zero Downpayment EMI', description: 'Ride home your dream motorcycle today without paying anything upfront. Instant approval available.', discount: 'Start @ ₹0 Down', type: 'emi' },
  { id: 'o3', title: 'Free Touring Kit', description: 'Get a complementary touring kit worth ₹10,000 on the purchase of the Dominar 400 this month.', discount: '₹10k Accessories', type: 'accessory' }
];

export const getOffers = async (req: Request, res: Response) => {
  try {
    const offers = await OfferModel.find().sort({ createdAt: -1 });
    if (offers.length === 0) return res.status(200).json(MOCK_OFFERS);
    res.status(200).json(offers);
  } catch (error) {
    console.warn('DB Error fetching offers, using fallback.');
    res.status(200).json(MOCK_OFFERS);
  }
};
