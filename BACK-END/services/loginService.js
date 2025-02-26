const User = require("../models/userSchema");
const UserAddress = require("../models/userAdressSchema");
const temperaryPassword = require('../models/otpSchema')

async function findUser(email) {
  if (email) {
    try {
      let isExist = await User.findOne({ email: email });

      if (isExist) {
        return isExist;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error found in finding User:", error);
    }
  } else {
    console.log("No data provided");
    return null;
  }
}

async function createNewAccount(data) {
  let { email, username, password } = data;
  if (data) {
    let value = await findUser(email);
    if (!value) {
      try {
        let result = await User.create({ email, username, password });
        if (result) {
          return result;
        }
      } catch (error) {
        console.error("error found in user creation");
      }
    } else {
      return value;
    }
  }
}

async function findWithId(id) {
  if (id) {
    try {
      let result = await User.findOne({ _id: id });
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error found in findWithId:", error);
    }
  } else {
    console.log("id is not getting...");
  }
}

async function findAllUser() {
  try {
    let result = await User.find();
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("error found in findAllUser:", error);
  }
}

async function createAddress(data) {
  if (data) {
    try {
      let result = await UserAddress.create({
        userId: data.userId,
        city: data.city,
        state: data.state,
        houseName: data.houseName,
      });
      return result
    } catch (error) {
        console.log("error found in create address",error);
        
    }
  }
}

async function getAddress(data) {
  let {id} = data
  if(data){
    try {
      let result = await UserAddress.find({userId:id})
      if(result){
        return result
      }else{
        return null
      }
      
    } catch (error) {
      console.error("error found in getAddress",error);
    
    }
  }
}

async function addressDelete(data) {
  
  if(data){
    try {
      let id = data.id
      let result = await UserAddress.findByIdAndDelete(id);
      if(result){
        return result
      }else{
        return null
      }
      
    } catch (error) {
      console.error("error found in DeleteAddress",error);
    
    }
  }
}

async function retriveForEdit(data) {
  if(data){
    try {
      let id = data.id
      let result = await UserAddress.findOne({_id:id});
      if(result){
        return result
      }else{
        return null
      }
    } catch (error) {
      console.error("error found in retriveForEdit",error);
    
    }
  }
}

async function updateAddress(value, data) {
  
  if (value.id && data) {
    try {
      
      let result = await UserAddress.findByIdAndUpdate(
       value.id, 
        { $set: data }, 
        { new: true }
      );
      if (result) {
        return result; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error updating address:", error);
      throw error; 
    }
  } else {
    throw new Error("Missing id or data for update.");
  }
}


async function updateUserDetails(value, data) {
  
  if (value.id && data.username) {
    
    try {
      let result = await User.findByIdAndUpdate(
        value.id, 
        { $set: { username: data.username } }, 
        { new: true }
      );
      if (result) {
        return result; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error updating address:", error);
      throw error; 
    }
  } else {
    throw new Error("Missing id or data for update.");
  }
}

async function findPassword(id,data) {
  if(id && !data){
    try {
      let result = await User.findOne({_id:id});
      if(result){
        return result
      }else{
        return null
      }
    } catch (error) {
      console.error("error found in findPassword",error);
    }
  }else if(id && data){
    try {  
      let result = await User.findByIdAndUpdate(
        id, 
        { $set: { password: data} }, 
        { new: true }
      );
      if (result) {
 
        return result; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error updating address:", error);
      throw error; 
    }
  }
}

async function otpStore(data) {
try {

  let result = await temperaryPassword.create({otp:data})
} catch (error) {
  console.log("error:",error);
  
}
}

async function GetOtp() {
try {
  let result = await temperaryPassword.find()
  return result
} catch (error) {
  console.log("error:",error);
  
}
}

async function deleteOtp() {
try {
  let result = await temperaryPassword.deleteMany({})
} catch (error) {
  console.log("error:",error);
  
}
}

const allUsersList = async()=>{
  try {
    let result = await User.find({})
    console.log("result:",result);

    if(result){
      return result
    }
  } catch (error) {
    console.log("error found in allUsersList",error);
    
  }
}
const  AccessBlock = async (id) => {
  console.log("sId:",id);
  
  try {
    let user = await User.findOne({ _id: id });
    if (user && user.access === true) {
      let result = await User.findOneAndUpdate(
        { _id: id}, 
        { $set: { access: false } }, 
        { new: true } 
      );
      return result;
    } else {
      console.log("User is already active or not found.");
      return user; 
    }
  } catch (error) {
    console.log("Error found in Access function:", error);
  }
};

const  AccessUnBlock = async (id) => {
  console.log("sId:",id);
  
  try {
    let user = await User.findOne({ _id: id });
    if (user && user.access === false) {
      let result = await User.findOneAndUpdate(
        { _id: id}, 
        { $set: { access: true } }, 
        { new: true } 
      );
      return result;
    } else {
      console.log("User is already active or not found.");
      return user; 
    }
  } catch (error) {
    console.log("Error found in Access function:", error);
  }
};




module.exports = {
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
};
