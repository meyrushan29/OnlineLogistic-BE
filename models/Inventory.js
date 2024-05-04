const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
    itemId :String,
    name:String,
    description:String,
    price:String,
    quantity:String,
     
})
const InventoryModel = mongoose.model("Inventory",InventorySchema)
module.exports = InventoryModel