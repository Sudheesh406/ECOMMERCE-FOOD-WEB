
const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const mongoose = require('mongoose')

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
    status:{
        type:Boolean,
        default:true
    }
})

const Wish = mongoose.model('Wish',schema);

module.exports = Wish;