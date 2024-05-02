const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
    shipmentId: String,
    shippingType: String, 
    email: String,
    phone: String,
    zipCode: String,
    shippingStatus: String,
    shippeddat: String,
    address: String,
    cusName: String,
    countryFrom: String,
    countryTo: String,
    totalCost: String
});

const ShippingModel = mongoose.model("Shipping", ShippingSchema);
module.exports = ShippingModel;