const axios = require('axios');
const koraBaseUrl = 'https://api.korahq.com/payments';

const payWithKora = async (amount, currency, customerEmail, apiKey) => {
    try {
        const response = await axios.post(
            `${koraBaseUrl}/initialize`,
            {
                amount,
                currency,
                customer: {
                    email: customerEmail,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
module.exports = {payWithKora}