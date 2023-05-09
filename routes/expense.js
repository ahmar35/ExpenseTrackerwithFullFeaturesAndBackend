const express = require('express')
const sequelize = require('../UTIL/database')

const controllers=require('../controllers/expense')
const auth=require('../middleware/auth')
const routers=express.Router()

routers.post('/ExpenseForm',auth.authenticate,controllers.postExpenseDetails)
routers.get('/ExpenseDetails',auth.authenticate,controllers.getExpenseDetails)

routers.delete('/DeleteInfo',auth.authenticate,controllers.deleteExpenseInfo)
module.exports=routers