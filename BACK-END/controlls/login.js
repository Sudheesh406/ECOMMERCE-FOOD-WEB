const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {findUser,createNewAccount,findWithId,findAllUser} = require("../services/loginService");

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


module.exports = {connectAccount,authControll,logout,allUsers}
