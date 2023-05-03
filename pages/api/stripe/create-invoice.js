const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { invoicePrice, customerId } = req.query;


    //Create a draft invoice first
    const draftInvoice = await stripe.invoices.create({
        customer: `${customerId}`,
        auto_advance: true,
        collection_method: 'charge_automatically',
        description: "One-time service invoice",
    });

    // Add the invoice item to the draft invoice
    await stripe.invoiceItems.create({
        customer: `${customerId}`,
        amount: invoicePrice,
        currency: "usd",
        description: "please work",
        invoice: draftInvoice.id, // Associate the invoice item with the draft invoice
    });

    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(draftInvoice.id);

    return res.status(200).json({ message: "hi" });

}
