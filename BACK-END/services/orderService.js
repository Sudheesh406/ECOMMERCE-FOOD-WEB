const orders = require ("../models/orderSchema")
const UserAddress = require("../models/userAdressSchema");
const Product = require('../models/productSchema')
const payment = require('../models/paymentSchema')

const createOrder = async (data,currentAddress,userId) => {
    if (data && currentAddress && userId) {
        let isExist = await UserAddress.findOne({_id:currentAddress})
       
        
            if(isExist){
        try {
            const products = data.map((item) => ({
                productId: item._id,
                price: item.price
            }));
            const response = await orders.create({
                userId: userId,
                products: products,
                address:isExist._id

            });

            if (response) {
                console.log('Order created successfully:', response);
                return response
            }
        } catch (error) {
            console.error("Error found in createOrder:", error);
        }
    }

    } else {
        console.log("Invalid data or userId");
    }
};

const getOrder = async(data)=>{
    try {
        let result = await orders.find({ userId: data.id }).populate('products.productId', 'name price image');
        if (result && result.length > 0) {
            return result;
        } else {
            return null;
        }
    } catch (err) {
        console.error("error found in find order", err);
    }
}

const getOneOrder = async(id)=>{
    try {
        let result = await orders.findOne({_id:id}).populate('userId', 'username email')
        .populate('address')
        .populate('products.productId', 'name price image');
        if(result){
            return result
        }else{
            return null
        }
    } catch (error) {
        console.error("error found in getOneOrder",error);
        
    } 
}

const allOrder = async ()=>{
    
    try {
        let result = await orders.find({}).populate('products.productId', 'name');

        if(result){
            return result
        }
    } catch (error) {
        console.error("error found in allOrder",error);
        
    }
}

const  orderStatusUpdate = async (id) => {
    console.log("sId:",id);
    
    try {
      let ord = await orders.findOne({ _id: id });
      if (ord && ord.status === 'pending') {
        let result = await orders.findOneAndUpdate(
          { _id: id}, 
          { $set: { status: 'success' } }, 
          { new: true } 
        );
        return result;
      } else {
        console.log("not order status updated");
        return ord; 
      }
    } catch (error) {
      console.log("Error found in order update function:", error);
    }
  };


  const createPayment = async(data)=>{
    if(data){
        try {
            let result = await payment.create(data)
            if(result){
                return result
            }
        } catch (error) {
            console.error("error found in createPayment",error);
            
        }
    }
  }

module.exports = {createOrder,getOrder,getOneOrder,allOrder,orderStatusUpdate,createPayment}