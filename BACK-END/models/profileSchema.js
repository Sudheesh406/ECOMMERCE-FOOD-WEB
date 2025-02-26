const User = require('../models/userSchema')
const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    houseName:{
        type:String
    }
})

const profile = mongoose.model('profile',schema)
module.exports = profile