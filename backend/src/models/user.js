const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    age : Number,
    gender : String
})

module.exports = mongoose.model("User", userSchema);