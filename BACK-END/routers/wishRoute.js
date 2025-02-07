const {uploadWish,addWish,removeWish} = require('../controlls/wish')
const auth = require('../middleware/authentication')

const express = require('express')
const wishRoute = express.Router()
wishRoute.post('/uploadWish',auth,uploadWish)
wishRoute.post('/addWish',auth,addWish)
wishRoute.post('/removeWish',auth,removeWish)

module.exports = wishRoute