const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password:String,
  fullname:String,
  username:{
    type:String,
    unique:true
  },
},{timestamps:true})

const User = mongoose.model("User",userSchema);

module.exports = User;