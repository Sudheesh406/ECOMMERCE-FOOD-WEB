const User = require("../models/userSchema");
const UserAddress = require("../models/userAdressSchema");

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

module.exports = {
  findUser,
  createNewAccount,
  findWithId,
  findAllUser,
  createAddress,
  getAddress,
};
