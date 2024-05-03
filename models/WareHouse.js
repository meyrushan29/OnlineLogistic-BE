const mongoose = require('mongoose')

const WarehouseSchema = new mongoose.Schema({
    warehouseId :String,
    itemId:String,
    arrivalDate:String,
    departureDate:String,
    address:String,
    
})
const WarehouseModel = mongoose.model("warehouse",WarehouseSchema)
module.exports = WarehouseModel