const {uploadProducts,createProduct,retrieveProduct,updateProduct,removeProduct,uploadOffers,trashData,dataRestore,trashload} = require('../controlls/product');
const express = require('express')
const productRouter = express.Router()
const {upload} = require('../middleware/uploadImageToS3')

productRouter.get('/Products',uploadProducts)
productRouter.post('/createProduct',upload.single('image'),createProduct)
productRouter.post('/retrieveProduct',retrieveProduct)
productRouter.put('/updateProduct/:id',upload.single('image'),updateProduct)
productRouter.delete('/removeProduct',removeProduct)
productRouter.get('/offers',uploadOffers)
productRouter.get('/trashData',trashData)
productRouter.post('/dataRestore',dataRestore)
productRouter.post('/trashload',trashload)

module.exports = productRouter;