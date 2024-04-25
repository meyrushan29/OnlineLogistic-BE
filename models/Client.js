const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    clientId: String,
    clientName: String, 
    email: String,
    phone: String, 
    address: String,
    gender:String,
    billingAddress:String,
    status:String
});

const ClientModel = mongoose.model("Client", ClientSchema); 
module.exports = ClientModel; 
