const mongoose = require('mongoose');


var signupschema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email : String,
    password : String,
});

var signupmodel = mongoose.model('signuptable',signupschema);

module.exports = signupmodel;

