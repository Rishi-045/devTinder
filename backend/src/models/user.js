const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var validator = require('validator');

const userSchema = new Schema({
  firstName: {
    type: String,
    lowercase : true,
    required : true,
    trim : true,
    maxlength : 20,
    validate : {
      validator : function (value){
        return /^[A-Za-z]+$/.test(value);
      },
      message : "Firstname must contain only letters."
    }

  },
  lastName: {
    type: String,
    lowercase : true,
    required : true,
    trim : true,
    maxlength : 20,
      validate : {
      validator : function (value){
        return /^[A-Za-z]+$/.test(value);
      },
      message : "Lastname must contain only letters."
    }
  },
  email: {
    type: String,
    lowercase : true,
    unique : true,
    required : true,
    trim : true,
       validate: {
      validator: function (value) {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: props => `${props.value} is not a valid email!`
    }
    
  },
  password: {
    type: String,
    required : true,
    trim : true,
    validate(value){
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value) || value.length < 8){
            throw new Error("Password must have 1 uppercase, 1 lowercase, 1 special character, and min 8 chars")
        }
    }
  },
  age: {
    type: Number,
    min : 18,
    max : 100
  },
  gender: {
    type: String,
    lowercase : true,
    trim : true,
    validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid!");
        }
    }
  },
  about : {
    type : String,
    default : "this is user default bio!",
    trim : true,
    minlength : 20,
    maxlength : 200
  },
  photoUrl : {
    type : String,
    default : "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k=",
    validate : {
      validator : function(value){
        return validator.isURL(value);
      },
      message : "Invalid Url!"
    }
  },
  skills : {
    type : [String]
  }
},{ 
    timestamps : true
});

module.exports = mongoose.model("User", userSchema);
