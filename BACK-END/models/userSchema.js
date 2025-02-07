const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    username: { 
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    },
    role: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model("User",Schema)
module.exports = User;