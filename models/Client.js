const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    clientId:String,
    clientname:String,
    email : String,
    phone : Number,
    address : String
})

const UserModel = mongoose.model("client",UserSchema)
module.exports = UserModel