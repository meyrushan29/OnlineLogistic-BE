const mongoose = require('mongoose')

const CustomersupportSchema = new mongoose.Schema({
    ticketId :String,
    customerName:String,
    email:String,
    issue:String,
    title:String,
    status:String
})
const CustomersupportModel = mongoose.model("Customersupport",CustomersupportSchema)
module.exports = CustomersupportModel