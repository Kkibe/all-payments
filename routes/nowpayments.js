const axios = require('axios');

function generateOrderId(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < length; i++) {
        orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
}

const payWithNowPayments = async (amount, priceCurrency, payCurrency, description, apiKey) => {
    try {
        const paymentResponse = await axios.post(
            'https://api.nowpayments.io/v1/payment',
            {
                price_amount: amount,
                price_currency: priceCurrency,
                pay_currency: payCurrency,
                order_id: generateOrderId(),
                order_description: description,
                ipn_callback_url: ipn_url,
                success_url: success_url,
                cancel_url: cancel_url,
            },
            {
                headers: {
                    'x-api-key': apiKey,
                },
            }
        );
        return res.status(200).json({paymentUrl : paymentResponse.data.invoice_url});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {payWithNowPayments};