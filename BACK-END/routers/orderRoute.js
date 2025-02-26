const express = require('express');
const Router = express.Router()
const auth = require('../middleware/authentication')
const {createOrder} = require('../services/razorpay')
const {orderUpdate,orderDisplay,getOrderDetails,totalOrder,orderStatus,payment} = require('../controlls/order')

Router.post('/orderUpdate',auth,orderUpdate)
Router.post('/razorpay',createOrder)
Router.post('/orderDisplay',orderDisplay)
Router.get('/getOrderDetails/:id',getOrderDetails)
Router.get('/totalOrder',totalOrder)
Router.post('/orderStatus',orderStatus)
Router.post('/payment',payment)

module.exports = Router