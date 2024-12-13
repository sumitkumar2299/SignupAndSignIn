/**
 this will be the starting file of the project 
*/

const express = require("express");
const mongoose = require("mongoose");

const app = express()
const server_config = require("./configs/server.config");
const db_config = require("./configs/dbconfig")
const user_model = require("./Models/user.model");
const bcrypt = require("bcryptjs");
app.use(express.json())

 

/**
 * create an admin user at the starting of the application 
 * if not already present. 
 * 
 */
// connection with mongodb 

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error",()=>{
    console.log("error while connecting to database")
})

db.once("open",()=>{
    console.log("connected to mongodb");
    init()
})

async function init(){

    try{

        let user = await user_model.findOne({userid : "admin"})

        if(user){
         console.log("Admin is already present")
         return 
        }
     

    }catch(err){
        console.log("error while reading the data",err)
    }
 
  
   try{

    user = await user_model.create({
        name:"sumit",
        userid:"admin",
        email: "sumitkum803202@gmail.com",
        userType:"Admin",
        password:bcrypt.hashSync("welcome",8)
    })
    console.log("Admin created:",user)

   }catch(err){
    console.log("error while create admin",err)
   }
}

/**
 stitch the routes to the server 
 */

 require("./Routes/auth.routes")(app)
 require("./Routes/category.route")(app)




/**
 start the server 
 */


app.listen(server_config.PORT,()=>{
    console.log("server started at port number",server_config.PORT);
})




