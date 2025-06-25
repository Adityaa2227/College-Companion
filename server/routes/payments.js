const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticateToken } = require('../middleware/auth');

// Create payment intent for mentor session
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, mentorId, sessionDetails } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        studentId: req.user.userId,
        mentorId: mentorId,
        sessionType: sessionDetails.type,
        sessionDuration: sessionDetails.duration
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

// Confirm payment and create session
router.post('/confirm-payment', authenticateToken, async (req, res) => {
  try {
    const { paymentIntentId, sessionDetails } = req.body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Create the mentorship session
      const session = new Meeting({
        title: sessionDetails.title,
        mentorId: sessionDetails.mentorId,
        studentId: req.user.userId,
        date: new Date(sessionDetails.date),
        duration: sessionDetails.duration,
        type: sessionDetails.type,
        status: 'scheduled',
        paymentIntentId: paymentIntentId,
        amount: paymentIntent.amount / 100
      });

      await session.save();

      res.json({
        success: true,
        sessionId: session._id,
        message: 'Payment confirmed and session scheduled'
      });
    } else {
      res.status(400).json({ message: 'Payment not confirmed' });
    }
  } catch (error) {
    console.error('Payment Confirmation Error:', error);
    res.status(500).json({ message: 'Failed to confirm payment' });
  }
});

// Get payment history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const payments = await Meeting.find({
      $or: [
        { studentId: req.user.userId },
        { mentorId: req.user.userId }
      ],
      paymentIntentId: { $exists: true }
    })
    .populate('mentorId studentId', 'name email')
    .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    console.error('Payment History Error:', error);
    res.status(500).json({ message: 'Failed to fetch payment history' });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Update session status, send confirmation emails, etc.
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;