const {createOrder,getOrder} = require ('../services/orderService') 

async function orderUpdate(req,res) {
    let {data,currentAddress} = req.body
    let userId = req.User.id
    try {
      if(data && currentAddress && userId){
        console.log("jfgyhugbdh");
        
       let response = await createOrder(data,currentAddress,userId)
       if(response){
         res.status(200).json({message:"success"})
       }else{
        res.status(400).json({message:"error found in order creating"})
       }
      }
    } catch (error) {
      res.status(400).json({message:"error found in order creating"})
      console.log("error:",error);
    }
    
}

async function orderDisplay(req,res) {
  if(req.body){
    try {
      let result = await getOrder(req.body)
      if(result){
        return res.status(200).json({message:"successfully get all orders",result})
      }else{
        return res.status(400).json({message:"error found in get orders"})
      }
    } catch (error) {
      console.error("error found in get orders",error);
      
    }
  }
  
}

module.exports = {orderUpdate,orderDisplay}