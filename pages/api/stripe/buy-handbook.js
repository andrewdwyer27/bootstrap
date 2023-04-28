const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { email, customPrice } = req.query;

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1N0rXtLQAndH4gXN6EXuxJJl',
                quantity: 1
            }, 
        ],
        customer_email: `${email}`,
        mode: 'payment',
        success_url: `${req.headers.origin}/courses/success`,
        cancel_url: `${req.headers.origin}/courses/error`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}