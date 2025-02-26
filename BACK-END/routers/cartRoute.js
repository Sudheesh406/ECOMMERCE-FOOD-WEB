const express = require("express");
const cartRoute = express.Router()
const {uploadCart,addToCart,removeFromCart,removeProductQty,getAllCartProducts,cartClear} = require('../controlls/cart')
const auth = require('../middleware/authentication')

cartRoute.get('/uploadToCart',auth,uploadCart)
cartRoute.post('/addToCart',auth,addToCart)
cartRoute.delete('/removeFromcart',auth,removeFromCart)
cartRoute.post('/removeProductQty',auth,removeProductQty)
cartRoute.get('/getAllCartProducts',getAllCartProducts)
cartRoute.post('/cartClear',cartClear)


module.exports = cartRoute