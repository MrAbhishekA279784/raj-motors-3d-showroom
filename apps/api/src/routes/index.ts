import { Router } from 'express';
import { getBikes } from '../controllers/bikeController';
import { getOffers } from '../controllers/offerController';
import { submitContactRequest } from '../controllers/contactController';

const router = Router();

router.get('/bikes', getBikes);
router.get('/offers', getOffers);
router.post('/contact', submitContactRequest);

export default router;
