const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    Name: String,
    SupplierID: String, // Change field name to ID
    PhoneNumber: String,
    Email: String,
    CompanyName: String,
    OrderID: String,
    Country: String
});

const SupplierModel = mongoose.model("Supplier", SupplierSchema);
module.exports = SupplierModel;  