const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { email } = req.query;

    if(req.method !== "GET") {
        return res.status(405).json({ message: "Not allowed" });
    }

    const customers = await stripe.customers.list({
        email: email
    });

    if (customers.data.length === 0) {
        return res.status(404).json({ customerId: null });
    }

    return res.status(200).json({ customerId: customers.data[0].id });
}