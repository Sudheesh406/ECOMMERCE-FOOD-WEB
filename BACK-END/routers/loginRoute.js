const express = require('express');
const {connectAccount,authControll,logout,allUsers} = require('../controlls/login')
const auth = require('../middleware/authentication')
const Router = express.Router()
Router.post('/login',connectAccount)
Router.get('/authentication',auth,authControll)
Router.get('/logout',logout)
Router.get('/allUsers',allUsers)
module.exports = Router