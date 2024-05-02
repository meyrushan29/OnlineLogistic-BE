const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderId :String,
    productName:String,
    itemId:String,
    quantity:String,
    orderDate:String,
    amount:String
})
const OrderModel = mongoose.model("order",OrderSchema)
module.exports = OrderModel