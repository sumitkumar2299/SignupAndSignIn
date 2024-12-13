

const user_model  = require("../Models/user.model")
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/Auth.config")
/**
 * create a middleware which checks if the request body is proper and correct . 
 */

const verifysignupbody = async(req,res,next)=>{
    try{

        // check for the name 
        if(!req.body.name){
            return res.status(400).send({
                message: "failed ! name was not provided in request body"
            })
        }
        // check for the email 

        if(!req.body.email){
            return res.status(400).send({
                message: "failed ! email  was not provided in request body"
            })
        }


        // check for the userid 
       
        if(!req.body.userid){
            return res.status(400).send({
                message: "failed ! userid  was not provided in request body"
            })
        }


        // check if the user with the same user id is already present 

        const user = await user_model.findOne({
            userid: req.body.userid
        })

        if(user){
            return res.status(400).send({
                message: "failed ! user user with same userid is already exist"
            })
        }



    }catch(err){

        console.log("Error while validating the request object",err)
        res.status(500).send({
            messages: "error while validating the request body"
        })

    }
}



const verifysignInBody = async(req,res,next)=>{
    if(!req.body.userid){
        return res.status(400).send({
            message: "userid is not provided"
        })
    }


    if(!req.body.userid){
        return res.status(400).send({
            message: "userid is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message: "password is not provided"
        })
    }
    next()


}

const verifyToken = (req,res,next)=>{
    // check if the token is present in the header

    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message: "no token found: unauthorized"
        })
    }
    // if its the valid token 
    jwt.verify(token,auth_config.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message: "unauthorized"
            })
        }

        const user = await user_model.findOne({userid: decoded.id})
        if(!user){
            return res.status(400).send({
                message: "unauthorized, this user for the token doesn't exist"
            })
        }

        // set the user info in the req body 
        req.user = user
        next();
    })

   
    // move to the next step 

}


const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType == "Admin" ){
        next()
    } else{
        return res.status(403).send({
            message:"only admin users are allowed to access this endpoint "
        })
    }
}


module.exports = {
    verifySignUpBody : verifysignupbody,
    verifySignInBody: verifysignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}