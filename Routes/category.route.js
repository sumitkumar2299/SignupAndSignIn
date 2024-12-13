/*
 * POST localhost:8888/ecom/api/v1/categories
*/

const authMw = require('../Middlewares/auth.mw')

category_controller = require('../Controllers/category.controller')
auth_mw = require("../Middlewares/auth.mw")


module.exports = (app) =>{
    app.post("/ecom/api/v1/categories",[auth_mw.verifyToken,authMw.isAdmin],category_controller.createNewCategory)
}

