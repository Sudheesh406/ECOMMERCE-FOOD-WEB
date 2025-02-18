const express = require('express');
const Router = express.Router()
const auth = require('../middleware/authentication')
const {createOrder} = require('../services/razorpay')
const {orderUpdate,orderDisplay} = require('../controlls/order')
Router.post('/orderUpdate',auth,orderUpdate)
Router.post('/razorpay',createOrder)
Router.post('/orderDisplay',orderDisplay)

module.exports = Router