const express = require("express");
const cartRoute = express.Router()
const {uploadCart,addToCart,removeFromCart,removeProductQty} = require('../controlls/cart')
const auth = require('../middleware/authentication')

cartRoute.get('/uploadToCart',auth,uploadCart)
cartRoute.post('/addToCart',auth,addToCart)
cartRoute.delete('/removeFromcart',auth,removeFromCart)
cartRoute.post('/removeProductQty',auth,removeProductQty)


module.exports = cartRoute