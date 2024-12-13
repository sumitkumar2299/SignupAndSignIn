/**
 * i need to write the controllers/ logic to register the user 
 */
const bcrypt = require("bcryptjs");
const user_model = require("../Models/user.model")
const jwt = require("jsonwebtoken");
const secret = require("../configs/Auth.config");

exports.signup = async (req,res)=>{
    /**
     * logic to create the user 
     * 
     * read the request body 
     * insert the data in the users collection in mongodb 
     * return the response back to the user 
     * 
     */

    const request_body = req.body;// frame of object in javascript 
    const userObj = {
        name: request_body.name,
        userid: request_body.userid,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)
    }

    try{
       const user_created =  await user_model.create(userObj)
       // return the user 


       const res_obj = {
        name: user_created.name,
        userid: user_created.userid,
        email: user_created.email,
        userType: user_created.userType,
        createdAt: user_created.createdAt,
        updatedAt: user_created.updatedAt
       }

       res.status(201).send(res_obj);
      

    }catch(err){
        console.log("error while registering the user",err)
        res.status(500).send({
            message: "some error happend while registering the user"
        })

    }

}


exports.signin = async (req,res)=>{

    // check if the user id is present in the system. 

    const user = await user_model.findOne({
        userid: req.body.userid
    })

    if(user == null){
      return  res.status(400).send({
            message: "user id is passed is not a valid user id"
        })
    }

    // if password is correct 
    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
    
    if(!isPasswordValid){
     return res.status(401).send({
            message: "wrong password passed"
        })
    }
    // using jwt we will create the access token with a given TTl(time travel limit) and return that 

    const token = jwt.sign({id: user.userid},secret.secret,{
        expiresIn:120
    })


    res.status(200).send({
       name: user.name,
        userid: user.userid,
        email: user.email,
        userType: user.userType,
        accestoken: token
    })





}