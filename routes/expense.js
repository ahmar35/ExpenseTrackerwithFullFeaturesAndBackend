const express = require('express')
const sequelize = require('../UTIL/database')

const controllers=require('../controllers/expense')
const auth=require('../middleware/auth')
const routers=express.Router()

routers.post('/ExpenseForm/',auth.authenticate,controllers.postExpenseDetails)
routers.get('/ExpenseDetails',auth.authenticate,controllers.getExpenseDetails)
routers.get('/user/download',auth.authenticate,controllers.getdownloadExpenseInfo)
routers.delete('/DeleteInfo/:id',auth.authenticate,controllers.deleteExpenseInfo)
module.exports=routers