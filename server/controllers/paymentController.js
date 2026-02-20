import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe Payment Intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
async function createPaymentIntent(req, res) {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Send Stripe Public Key
// @route   GET /api/payment/config
// @access  Private
async function sendStripeConfig(req, res) {
    try {
        res.send({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    createPaymentIntent,
    sendStripeConfig
};
