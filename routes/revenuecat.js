const axios = require('axios');

//const req.headers.REVENUECAT_API_KEY = 'YOUR_REVENUECAT_PUBLIC_API_KEY';
const BASE_URL = 'https://api.revenuecat.com/v1';


const createCustomer = async (customerId, apiKey) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/subscribers/${customerId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        return null;
    }
}

const fetchOfferings = async (apiKey) => {
    try {
        const response = await axios.get(`${BASE_URL}/offerings`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        return res.status(200).json(response.data.offerings);
    } catch (error) {
        return res.status(500).json('Error fetching offerings:', error);
    }
}


const pay = async (price, currency, customerId, productId, apiKey) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/receipts`,
            {
                subscriber_id: customerId,
                product_id: productId,
                currency, // or your chosen currency
                price: price, // actual price
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const revenueCat = {pay, fetchOfferings, createCustomer};
module.exports = {revenueCat};