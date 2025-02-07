const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:Product,
        required:true
    },
    quandity:{
        type:Number,
        default:1
    }
})

const Cart = mongoose.model('Cart',schema)
module.exports = Cart