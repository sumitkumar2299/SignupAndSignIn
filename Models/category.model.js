/**
 * Name of category 
 * description of category 
 */

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,

    },

    description: {
        type: String,
        required: true
    }
},{timestamps:true,versionKey:false})


// timestamp true dalne se createdat and modifiedAt ka value mil jayega.
// version key false that means yeh apna version use nahi karega. 

module.exports = mongoose.model("category",categorySchema)


