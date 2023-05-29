const express = require('express')
const sequelize = require('../UTIL/database')
const routers=express.Router()
const controllers=require('../controllers/forgotpasswordC.js')

routers.post('/password/forgotpassword',controllers.forgotPassword)
module.exports=routers