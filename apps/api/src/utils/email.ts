import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { IContactRequest } from '../models/ContactRequest';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendNotificationEmail = async (contactRequest: IContactRequest) => {
  const mailOptions = {
    from: `"Raj Motors Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Test Ride Request: ${contactRequest.bikeInterest}`,
    html: `
      <h2>New Test Ride Request</h2>
      <p><strong>Name:</strong> ${contactRequest.name}</p>
      <p><strong>Phone:</strong> ${contactRequest.phone}</p>
      <p><strong>Email:</strong> ${contactRequest.email}</p>
      <p><strong>Bike Interest:</strong> ${contactRequest.bikeInterest}</p>
      <p><strong>Message:</strong> ${contactRequest.message || 'No additional message'}</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Notification email sent: %s', info.messageId);
};
