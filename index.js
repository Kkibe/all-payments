const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const cors = require('cors'); 

const {payWithKora} = require("./routes/kora")
const {payWithMpesa} = require("./routes/mpesa")
const {payWithNowPayments} = require("./routes/nowpayments")
const {payWithPesapal} = require("./routes/pesapal");
const { revenueCat } = require('./routes/revenuecat');
const { payWithStripe } = require('./routes/stripe');

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());

module.exports = {payWithKora, payWithMpesa, payWithNowPayments, payWithPesapal, revenueCat, payWithStripe}