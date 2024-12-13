/**
 * POST localhost:8888/ecomm/api/v1/auth/signup 
 * i need to intercept this 
 * 
 */

const authController = require("..//Controllers/auth.controller")
const authMw = require("../Middlewares/auth.mw")


module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignUpBody],authController.signup)

    /**
     * routes for post call for this url 
     * POst localhost:8888/ecom/api/v1/auth/signin
     */

    app.post("/ecom/api/v1/auth/signin",[authMw.verifySignInBody],authController.signin)
}