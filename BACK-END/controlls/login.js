const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {findUser,createNewAccount,findWithId,findAllUser,createAddress,getAddress} = require("../services/loginService");

async function connectAccount(req, res) {
  const { email, password, username } = req.body;
  if(email,password,username){
    let data = {email,username,password}
       if(data){
     let result = await findUser(data.email)
        if(result){
       
          return res.status(401).json({message:"allready has an account",account:true})
        }else{
          const hashedPassword = await bcrypt.hash(password,10)
       
           let result = await  createNewAccount({email,username,password:hashedPassword})
           if(result){
         
            
            let accessToken = jwt.sign({id:result.id},process.env.SECRET_KEY,{expiresIn:"24h"})
            return res.cookie("token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax", 
              }).status(200).json({message:" account created successfully...",result,created:true})
              
           }else{
            console.error("some error found serviceSide");
           }
        }
       }
  }else{
    if(!password && !username && email){
        let  data = email
        
          let result = await findUser(data)
        
          if(result == null){
          
           return res.status(401).json({message:"user not found",islogin:true});
          }else if(result){
         
           return res.status(200).json({message:"isExist",isExist:true})
          }
      }else if(!username && password && email){
        let data = {email,password}
       

        let result = await findUser(data.email)
            if(result){
             
              let valid = await bcrypt.compare(password,result.password)
             
              if(valid){
                let accessToken = jwt.sign({id:result.id},process.env.SECRET_KEY,{expiresIn:"24h"})

              return res.cookie("token", accessToken, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "lax", 
                }).status(200).json({message:"login successfully...",result,value:true})
                
              }else{
                return res.status(400).json({message:"in correct password..."})
              }
        }else{
          return res.status(400).json({message:"enter your correct email..."})
        }
      }
  }
}

const authControll = async (req,res)=>{
   let User = req.User
   if(User){
    let {id} = User
   
   let data = await findWithId(id)
   if(data){
     return res.status(200).json({message:"authentication is sucess",data})
   }
   }else{
    return res.status(400).json({message:"authentication is failed"})
   }
}

  async function logout(req,res) {
    res.clearCookie("token");
    res.status(200).json({message: "Logout successfully..."});
  };


  async function allUsers(req,res){
     try {
      let result = await findAllUser()
      if(result && result.length > 0){
        return res.status(200).json({message:'success',result})
      }
     return res.status(401).json({message:'error found in find Users'})
    } catch (error) {
      console.error('error found in collection user:',error);
      res.status(401).json({message:'error found in find Users'})
    }
  }


  async function userAddress(req,res) {
    let data = req.body
    if(data){
      console.log("data:",data);
      try {
        let result = await createAddress(data)
        if(result){
          console.log("result:",result);
       return res.status(200).json({message:'successfully address added',result})
        }else{
          return res.status(400).json({message:'error found in adding address'})
      }
      } catch (error) {
        console.error("error found in userAddress adding");
        res.json(401).status({message:'error found in adding address',error})
      }
    }
  }

const getUserAddress = async(req,res)=>{
  if(req.body){
    console.log("req.body:",req.body);
    try {
      let result = await getAddress(req.body)
      if(result){
        return res.status(200).json({message:"successfully find the address",result})
      }else{
        return res.status(400).json({message:"error found in getUserAddress"})
      }
    } catch (error) {
      console.error("error found in getUserAddress",error);
      return res.status(400).json({message:"error found in getUserAddress",error})
    }

  }
}


module.exports = {connectAccount,authControll,logout,allUsers,userAddress,getUserAddress}
