const User = require("../models/userSchema");

const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    userId :{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,  
        required:true
    },
    houseName:{
        type:String,
        required:true
    }
})

const UserAddress = mongoose.model("UserAddress",Schema)
module.exports = UserAddress;