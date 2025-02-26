const {createOrder,getOrder,getOneOrder,allOrder,orderStatusUpdate,createPayment} = require ('../services/orderService') 

async function orderUpdate(req,res) {
    let {data,currentAddress} = req.body
    let userId = req.User.id
    try {
      if(data && currentAddress && userId){
       let response = await createOrder(data,currentAddress,userId)
       if(response){
         res.status(200).json({message:"success",response})
       }else{
        res.status(400).json({message:"error found in order creating"})
       }
      }
    } catch (error) {
      res.status(400).json({message:"error found in order creating"})
     

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

const getOrderDetails = async(req,res)=>{
  const { id } = req.params
  if(id){
    try {
      
      let result = await getOneOrder(id)
      if(result){
        res.status(200).json({message:"successfully selected that order",result})
      }else{
        res.status(404).json({message:"error found in getOrderDetails"})

      }
    } catch (error) {
      console.error("error found in getOrderDetails",error);
      res.status(400).json({message:"error found in getOrderDetails",error})
    }
  }
}

const totalOrder = async (req,res)=>{
  
  try {
    let result  = await allOrder()
    if(result){
      res.status(200).json({message:"successfully collected all orders",result})
    }else{
      res.status(400).json({message:"error found in totalOrder"})

    }
  } catch (error) {
    res.status(400).json({message:"error found in totalOrder",error})
    
  }
}

const orderStatus = async(req,res)=>{
  let {id} = req.body
  console.log('id:',id);
  
  if(id){
  try {
    let result = await orderStatusUpdate(id)
    console.log("result:",result);
    if(result){
      res.status(200).json({message:"user access success",result})
    }
  } catch (error) {
    res.status(200).json({message:"error found in user access",error})

  }
}
}

async function payment(req,res) {
  let value = req.body
  if(value){
    try {
      let result = await createPayment(value)
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

module.exports = {orderUpdate,orderDisplay,getOrderDetails,totalOrder,orderStatus,payment}