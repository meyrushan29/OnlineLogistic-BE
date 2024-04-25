const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    Name: String,
    SupplierID: { type: String, unique: true }, // Ensure SupplierID is unique
    PhoneNumber: String,
    Email: String,
    CompanyName: String,
    Country: String,
    Status: String,
    Category: String, // New field for Supplier Category
    
});

const SupplierModel = mongoose.model("Supplier", SupplierSchema);
module.exports = SupplierModel;