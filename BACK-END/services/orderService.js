const orders = require ("../models/orderSchema")
const UserAddress = require("../models/userAdressSchema");
const Product = require('../models/productSchema')


const createOrder = async (data,currentAddress,userId) => {
    if (data && currentAddress && userId) {
       console.log("data:",data.id);
 
        let isExist = await UserAddress.findOne({_id:currentAddress})
        console.log("isExist:",isExist);
        
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

module.exports = {createOrder,getOrder}