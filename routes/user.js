const express = require('express')

const sequelize = require('../UTIL/database')


const routes=express.Router()
const controllers=require('../controllers/user')

routes.post('/User/SignUp',controllers.signupPost )



routes.post('/User/LogIn',controllers.logInPost)
module.exports=routes