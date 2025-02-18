const express = require('express');
const {connectAccount,authControll,logout,allUsers,userAddress,getUserAddress} = require('../controlls/login')
const auth = require('../middleware/authentication')
const Router = express.Router()
Router.post('/login',connectAccount)
Router.get('/authentication',auth,authControll)
Router.get('/logout',logout)
Router.get('/allUsers',allUsers)
Router.post('/userAddress',userAddress)
Router.post('/getUserAddress',getUserAddress)
module.exports = Router