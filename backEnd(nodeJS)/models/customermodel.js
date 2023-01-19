const mongoose = require("mongoose");
const { db } = require("./signupmodel");

var customerschema = mongoose.Schema({
  
  name: String,
  contact: Number,
  description: String,
   
});

var customermodel = mongoose.model("customertable", customerschema);

module.exports = customermodel;
