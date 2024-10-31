const stripeLib = require('stripe');

const payWithStripe = (amount, currency, tokenId, stripeKey) => {
    try {
        const stripe = stripeLib(stripeKey);
        stripe.charges.create(
            {
                source: tokenId,
                amount: amount,
                currency,
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    return res.status(500).json(stripeErr);
                } else {
                    return res.status(200).json(stripeRes);
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ error: 'Failed to initialize Stripe with the provided key.' });
    }
}

module.exports = {payWithStripe};