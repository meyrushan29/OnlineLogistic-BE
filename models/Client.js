const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    clientId: String,
    clientName: String, // Corrected field name
    email: String,
    phone: String, // Changed to String as phone numbers might include non-numeric characters
    address: String
});

const ClientModel = mongoose.model("Client", ClientSchema); // Changed model name to "User"
module.exports = ClientModel; // Corrected export statement
