import { Request, Response } from 'express';
import { ContactRequestModel } from '../models/ContactRequest';
import { z, ZodError } from 'zod';
import { sendNotificationEmail } from '../utils/email';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  bikeInterest: z.string().min(1, 'Please select a bike'),
  message: z.string().optional(),
});

export const submitContactRequest = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body);

    let newRequest;
    try {
      // Save to database
      newRequest = await ContactRequestModel.create(validatedData);
      // Send email notification (we don't await this to keep the response fast)
      sendNotificationEmail(newRequest).catch(err => console.error('Email failed:', err));
    } catch (dbError) {
      console.warn('DB Error saving contact request, skipping DB save.');
      newRequest = { ...validatedData, createdAt: new Date() };
    }

    res.status(201).json({ message: 'Request submitted successfully', data: newRequest });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: (error as any).errors });
    }
    console.error('Error submitting contact request:', error);
    res.status(500).json({ message: 'Server error submitting request' });
  }
};
