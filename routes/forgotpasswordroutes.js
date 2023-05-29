const express = require('express')
const sequelize = require('../UTIL/database')
const routers=express.Router()
const controllers=require('../controllers/forgotpasswordC.js')

routers.use('/password/forgotpassword',controllers.forgotPassword)
routers.get('/password/resetpassword/:id',controllers.resetPassword)
routers.get('/password/updatepassword/:resetid',controllers.updatePassword)
module.exports=routers