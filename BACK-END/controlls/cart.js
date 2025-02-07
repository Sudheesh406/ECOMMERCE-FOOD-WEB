const {upload,create,removeData,removeQty} = require('../services/cartService')

async function uploadCart(req,res) {
    let id = req.User.id
    console.log("id found:",id);
    if(id){

        try {
            let response = await upload(id)
            if(response){
                console.log("response:",response);
                let result = response.map(item => ({
                    product: {
                      ...item.product.toObject(), 
                      quantity: item.quandity 
                    }
                  }));
                  
                  console.log("Updated Result:", result);
            
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"their is no data found"})
            }
        } catch (error) {
            console.error("error found in uploadWish",error);
            res.status(400).json({message:"error in upload data"})
        }
    }else{
        res.status(401).json({message:"their is no data found"})
    }
}
 
async function addToCart(req,res) {
   
    let {id, qty} = req.body
    let userid = req.User.id
        console.log(qty);
        
    if(id && userid){
        try {
            let result = await create(id,userid,qty)
            if(result){
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"data not added"})
            }
        } catch (error) {
            console.error("error found in addToCart",error);
            res.status(400).json({message:"error found in removeWish"})

        }
    }else{
     
        res.status(401).json({message:"id not found so data not added"})
    }
}

async function removeFromCart(req,res) {
    let id = req.User.id
    let proId = req.body
    console.log("id:",proId.id);
    if(id){
        try {
            let result = await removeData(id,proId.id)
            if(result){
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"data not deleted"})
            }
        } catch (error) {
            console.error("error found in removewish",error);
            res.status(400).json({message:"error found in removeWish"})

        }
    }else{
        res.status(401).json({message:"data not deleted"})
    }
}

async function removeProductQty(req,res) {
    let id = req.User.id
    let proId = req.body
    if(id,proId){
        try {
            let result = await removeQty(id,proId.id)
            if(result){
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"data not deleted"})
            }
        } catch (error) {
            console.error("error found in removeQty",error);
            res.status(400).json({message:"error found in removeWish"})

        }
    }else{
        res.status(401).json({message:"data not deleted"})
    }
}



module.exports = {uploadCart,addToCart,removeFromCart,removeProductQty}