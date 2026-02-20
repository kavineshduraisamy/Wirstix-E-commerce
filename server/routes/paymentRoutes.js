import express from 'express';
import {
    createPaymentIntent,
    sendStripeConfig,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/config', protect, sendStripeConfig);

export default router;
