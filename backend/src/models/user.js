const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    lowercase : true,
    required : true,
    trim : true,
    maxlength : 20

  },
  lastName: {
    type: String,
    lowercase : true,
    required : true,
    trim : true,
    maxlength : 20
  },
  email: {
    type: String,
    lowercase : true,
    unique : true,
    required : true,
    trim : true
    
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
    trim : true,
    min : 18
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
    trim : true
  },
  photoUrl : {
    type : String,
    default : "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k=",
    trim : true
  },
  skills : {
    type : [String]
  }
},{ 
    timestamps : true
});

module.exports = mongoose.model("User", userSchema);
