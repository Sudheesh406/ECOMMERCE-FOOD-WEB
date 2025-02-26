const mongoose = require('mongoose');
const orders = require("../models/orderSchema");
const schema = mongoose.Schema({
    orderId :{
        type:mongoose.Schema.ObjectId,
        ref:orders,
        required:true
    },
    totalAmount:{
        type:String,
        required:true
    }
})

const payment = mongoose.model('payment',schema)
module.exports = payment