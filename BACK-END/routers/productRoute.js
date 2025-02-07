const {uploadProducts,createProduct,retrieveProduct,updateProduct,removeProduct,uploadOffers} = require('../controlls/product');
const express = require('express')
const productRouter = express.Router()
const {upload} = require('../middleware/uploadImageToS3')

productRouter.get('/Products',uploadProducts)
productRouter.post('/createProduct',upload.single('image'),createProduct)
productRouter.post('/retrieveProduct',retrieveProduct)
productRouter.put('/updateProduct',updateProduct)
productRouter.delete('/removeProduct',removeProduct)
productRouter.get('/offers',uploadOffers)

module.exports = productRouter;