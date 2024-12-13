const mongoose = require("mongoose")



/**
 user id 
 password
 email
 userType 
 */
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    userid: {
        type:String,
        required:true,
        unique:true
    },

    password: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true

    },

    userType:{
        type:String,
        default: "Customer",
        enum:["Customer","Admin"]
    }

},{timestamps:true,versionKey:false})


module.exports = mongoose.model("user",userSchema)
