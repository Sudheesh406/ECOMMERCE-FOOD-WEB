const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique : true
    },
    description:{
        type:String,
    },
    price:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    availability:{
        type:Boolean,
        default:true,
    },
    offer:{
        type:Boolean,
        default:false,
    },
    status:{
        type:Boolean,
        default:true,
    }
})

const Product = mongoose.model('products',schema)
module.exports = Product
