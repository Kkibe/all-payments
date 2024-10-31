const axios = require('axios');

function generateOrderIdWithDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // Combine the date and time parts
    const datePart = `${year}${month}${day}${hours}${minutes}${seconds}`;
    // Optional: Add a random suffix to ensure uniqueness
    const uniqueSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${datePart}${uniqueSuffix}`;
}

const payWithPesapal = async (amount, countryCode, currency, description, url, callbackUrl, consumerKey, consumerSecret) => {
    try {
        const { data } = await axios.post("https://pay.pesapal.com/v3/api/Auth/RequestToken",
            {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }
        );

        const ipn = await axios.post(
            "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN",
            {
                url,
                ipn_notification_type: "GET"
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer` + " " + data.token,
                }
            }
        );


        const response = await axios.post(
            "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
            {
                "id": generateOrderIdWithDate(),
                "currency": currency,
                "amount": amount,
                "description": description,
                "callback_url": callbackUrl,
                "notification_id": ipn.data.ipn_id,
                "billing_address": {
                    "country_code": countryCode,
                }
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer` + " " + data.token,
                }
            }
        );
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports =  {payWithPesapal};
