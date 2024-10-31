const Daraja = require("@saverious/daraja");

const payWithMpesa = async (number, amount, shortCode, callbackUrl, consumerKey, consumerSecret, environment) => {
    try{
        const daraja = new Daraja({
            consumer_key : consumerKey,
            consumer_secret : consumerSecret,
            environment
        });
        
        const response = await daraja.stkPush({
            sender_phone : number,
            payBillOrTillNumber : shortCode,
            amount : amount,
            callback_url : callbackUrl,
        });
        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json(error.message);
    }
}

module.exports = {payWithMpesa};