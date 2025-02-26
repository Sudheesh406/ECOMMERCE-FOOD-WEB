const express = require('express');
const Router = express.Router()
const {profileUpload} = require('../controlls/profile')
Router.post('/profileUpload',profileUpload)


module.exports = Router