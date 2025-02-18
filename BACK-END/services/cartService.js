const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
async function upload(id) {
  try {
    let cartItems = await Cart.find({ userId: id }).populate("productId");
    let response = [];
    if (cartItems.length > 0) {
      response = cartItems.map((item) => ({
        product: item.productId, 
        quandity: item.quandity, 
      }));
    }
    if(response.length > 0){
        return response;
    }else{
        return null;
    }
   
  } catch (error) {
    console.error("error found in data uploading");
    return null;
  }
}


async function create(dataId, id ,qty) {
  if ((dataId, id)) {
    let userId = id;
    let productId = dataId;
    try {
      console.log("qty:",qty);
      
      let response = await Cart.findOne({ userId, productId });
      if (response) {
        if(!qty) qty = 1
        let result = await Cart.updateOne(
          { userId, productId },
          { $set: { quandity: Number(response.quandity) + Number(qty) } }
        );
        return result;
      } else {
        let result = await Cart.create({ userId, productId, quandity:qty });
        return result;
      }
    } catch (error) {
      console.error("error found in data uploading");
      return null;
    }
  } else {
    console.log("data is empty");
  }
}



async function removeData(id, proId) {
  if (id) {
    try {
      let result = await Cart.deleteOne({ userId: id, productId: proId });
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error found in remove data...");
    }
  } 
}

async function removeQty(id, proId) {
  
  if (id && proId) {
    try {
      let response = await Cart.findOne({ userId: id, productId: proId });
      if(response){
        let result = await Cart.updateOne(
          { userId : id, productId : proId },
          { $set: { quandity: response.quandity - 1 } }
        );
       return result;
       
      } else {
        return null;
      }
    } catch (error) {
      console.error("error found in remove data...");
    }
  } else {
    console.log("id not found...");
  }
}

module.exports = { upload, create, removeData ,removeQty};
