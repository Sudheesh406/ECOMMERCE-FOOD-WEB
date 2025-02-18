const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Product = require('../models/productSchema');
const UserAddress = require("../models/userAdressSchema");

const schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    address:{
        type: mongoose.Schema.ObjectId,
        ref: UserAddress,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'success'],
        default: 'pending'
    }
});

const orders = mongoose.model('orders', schema);
module.exports = orders;
