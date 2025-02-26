const mongoose = require('mongoose');
const schema = mongoose.Schema({
    otp:{
        type:String,
        required:true,
        unique : true
    }
})

const temperaryPassword = mongoose.model('temperaryPassword',schema)
module.exports = temperaryPassword
