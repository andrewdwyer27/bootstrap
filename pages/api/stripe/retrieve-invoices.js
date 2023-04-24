const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { customerId } = req.query;

    const invoices = await stripe.invoices.list({
        customer: customerId
    });

    res.status(200).json({ invoices: invoices})
}
