const express = require("express");
const {
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
} = require("../controlls/login");
const auth = require("../middleware/authentication");
const Router = express.Router();
Router.post("/login", login);
Router.get("/authentication", auth, authControll);
Router.get("/logout", logout);
Router.get("/allUsers", allUsers);
Router.post("/userAddress", userAddress);
Router.post("/getUserAddress", getUserAddress);
Router.post("/deletUser", deletUserAddress);
Router.post("/retriveAddress", retriveAddress);
Router.put("/editAddress/:id", editAddress);
Router.put("/edituserDetails/:id", edituserDetails);
Router.post("/getPassword/:id", getPassword);
Router.post("/Signup", Signup);
Router.get("/userList", userList);
Router.post("/userAccessBlock", userAccessBlock);
Router.post("/userAccessUnBlock", userAccessUnBlock);
module.exports = Router;
