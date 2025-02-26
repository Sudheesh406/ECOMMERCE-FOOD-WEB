const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../nodeMailer")
require("dotenv").config();
const {
  findUser,
  createNewAccount,
  findWithId,
  findAllUser,
  createAddress,
  getAddress,
  addressDelete,
  retriveForEdit,
  updateAddress,
  updateUserDetails,
  findPassword,
  otpStore,
  GetOtp,
  deleteOtp,
  allUsersList,
  AccessBlock,
  AccessUnBlock
} = require("../services/loginService");



async function Signup (req,res){
  const { email, password, username , otp} = req.body;
  if (email && password && username ||email && password && username && otp) {
    let result = await findUser(email);
    if (!result && !otp) {
      res.status(201).json({message:"email verified",result})
           let response = await nodemailer(email)
           console.log("response:",response);
            }else if(!result && email && password && username && otp){              
              console.log("otppp:",otp);
               let userOtp = await GetOtp()
               console.log("userOtp.otp:",userOtp);
                if(otp == userOtp[0].otp){
                  deleteOtp()
                const hashedPassword = await bcrypt.hash(password, 10);
                let result = await createNewAccount({
                  email,
                  username,
                  password: hashedPassword,
                });
                if (result) {
                  let accessToken = jwt.sign(
                    { id: result.id },
                    process.env.SECRET_KEY,
                    { expiresIn: "24h" }
                  );
                  return res
                    .cookie("token", accessToken, {
                      httpOnly: true,
                      secure: true,
                      sameSite: "lax",
                    })
                    .status(200)
                    .json({
                      message: " account created successfully...",
                      result
                    });
                  }
                } else {
                  console.error("some error found serviceSide");
              }
  }else{
    res.status(401).json({message:"user has an account"})
  }
}
}

async function login (req,res){
  const { email, password } = req.body;
  if (email && password){
          let data = email;
          let result = await findUser(data);
          if (result) {
            let valid = await bcrypt.compare(password, result.password);
            if (valid) {
              let accessToken = jwt.sign(
                { id: result.id },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
              );
    
              return res
                .cookie("token", accessToken, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "lax",
                })
                .status(200)
                .json({ message: "login successfully...", result});
            } else {
              return res.status(400).json({ message: "in correct password..." });
            }
  }
}else{
  return res.status(400).json({ message: "no user found in this id" });
}
}

async function nodemailer(userMail) {
  let otp = generateOTP()
  deleteOtp()
  otpStore(otp)
  const info = await transporter.sendMail({
    from: 'sudheeshunni406@gmail.com', // sender address
    to: userMail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${otp} here is your otp`, // plain text body
    html: `${otp} here is your otp`, // html body
  });
  console.log("info:",info);
  return info
}

function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
  }
  return otp;
}

const authControll = async (req, res) => {
  let User = req.User;
  if (User) {
    let { id } = User;

    let data = await findWithId(id);
    if (data) {
      return res
        .status(200)
        .json({ message: "authentication is sucess", data });
    }
  } else {
    return res.status(400).json({ message: "authentication is failed" });
  }
};

async function logout(req, res) {
  userOtp = ""
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully..." });
}

async function allUsers(req, res) {
  try {
    let result = await findAllUser();
    if (result && result.length > 0) {
      return res.status(200).json({ message: "success", result });
    }
    return res.status(401).json({ message: "error found in find Users" });
  } catch (error) {
    console.error("error found in collection user:", error);
    res.status(401).json({ message: "error found in find Users" });
  }
}

async function userAddress(req, res) {
  let data = req.body;
  if (data) {
    try {
      let result = await createAddress(data);
      if (result) {
        return res
          .status(200)
          .json({ message: "successfully address added", result });
      } else {
        return res
          .status(400)
          .json({ message: "error found in adding address" });
      }
    } catch (error) {
      console.error("error found in userAddress adding");
      res.json(401).status({ message: "error found in adding address", error });
    }
  }
}

const getUserAddress = async (req, res) => {
  if (req.body) {
    try {
      let result = await getAddress(req.body);
      if (result) {
        return res
          .status(200)
          .json({ message: "successfully find the address", result });
      } else {
        return res
          .status(400)
          .json({ message: "error found in getUserAddress" });
      }
    } catch (error) {
      console.error("error found in getUserAddress", error);
      return res
        .status(400)
        .json({ message: "error found in getUserAddress", error });
    }
  }
};

const deletUserAddress = async (req, res) => {
  if (req.body) {
    try {
      let result = await addressDelete(req.body);
      if (result) {
        return res
          .status(200)
          .json({ message: "successfully deleted address", result });
      } else {
        return res
          .status(400)
          .json({ message: "error found in deleteAddress" });
      }
    } catch (error) {
      console.error("error found in deleteAddress", error);
      return res
        .status(400)
        .json({ message: "error found in getUserAddress", error });
    }
  }
};

const retriveAddress = async (req, res) => {
  if (req.body) {
    try {
      let result = await retriveForEdit(req.body);
      if (result) {
        return res
          .status(200)
          .json({ message: "successfully Address retrived", result });
      } else {
        return res
          .status(400)
          .json({ message: "error found in retriveAddress" });
      }
    } catch (error) {
      console.error("error found in deleteAddress", error);
      return res
        .status(400)
        .json({ message: "error found in retriveAddress", error });
    }
  }
};

const editAddress = async (req, res) => {
  if (req.params && req.body) {
    try {
      let result = await updateAddress(req.params, req.body);
      if (result) {
        return res
          .status(200)
          .json({ message: "successfully Address edited", result });
      } else {
        return res.status(400).json({ message: "error found in edit" });
      }
    } catch (error) {
      console.error("error found in editAddress", error);
      return res.status(400).json({ message: "error found in edit", error });
    }
  }
};

const edituserDetails = async (req, res) => {
  if (req.params && req.body) {
    try {
      let result = await updateUserDetails(req.params, req.body.data);
      if (result) {
        return res
          .status(200)
          .json({ message: "successfully user details edited", result });
      } else {
        return res
          .status(400)
          .json({ message: "error found in edit user Details" });
      }
    } catch (error) {
      console.error("error found in editAddress", error);
      return res
        .status(400)
        .json({ message: "error found in edit user Details", error });
    }
  }
};

const getPassword = async (req, res) => {
  if (req.body && req.params) {
    try {
      let data;
      let result = await findPassword(req.params.id, data);
      if (result) {
        let valid = await bcrypt.compare(
          req.body.exist.oldPassword,
          result.password
        );
        if (valid) {
          let newPassword = await bcrypt.hash(req.body.exist.newPassword, 10);
          let success = await findPassword(req.params.id, newPassword);
          if (success) {
            return res
              .status(200)
              .json({ message: "password changed", success });
          } else {
            return res.status(400).json({ message: "something error occurs" });
          }
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Error in getPassword", error });
    }
  }
};

const userList = async(req,res)=>{
  try {
    let result = await allUsersList()
    console.log("result:",result);
    if(result){
      res.status(200).json({message:"user collected",result})
    }
  } catch (error) {
    res.status(200).json({message:"error found in userList",error})

  }
}

const userAccessBlock = async(req,res)=>{
  let {id} = req.body
  console.log('id:',id);
  
  if(id){
  try {
    let result = await AccessBlock(id)
    console.log("result:",result);
    if(result){
      res.status(200).json({message:"user access success",result})
    }
  } catch (error) {
    res.status(200).json({message:"error found in user access",error})

  }
}
}

const userAccessUnBlock = async(req,res)=>{
  let {id} = req.body
  console.log('id:',id);
  
  if(id){
  try {
    let result = await AccessUnBlock(id)
    console.log("result:",result);
    if(result){
      res.status(200).json({message:"user access success",result})
    }
  } catch (error) {
    res.status(200).json({message:"error found in user access",error})

  }
}
}

module.exports = {
  login,
  authControll,
  logout,
  allUsers,
  userAddress,
  getUserAddress,
  deletUserAddress,
  retriveAddress,
  editAddress,
  edituserDetails,
  getPassword,
  Signup,
  userList,
  userAccessBlock,
  userAccessUnBlock
};
