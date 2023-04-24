const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { email } = req.query;

    const customer = await stripe.customers.create({
        email: email
    });

    return res.status(200).json({email: email});
}