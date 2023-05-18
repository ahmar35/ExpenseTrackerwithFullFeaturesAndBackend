const express = require('express')
const sequelize = require('../UTIL/database')

const controllers=require('../controllers/purchaseC')
const auth=require('../middleware/auth')
const purchaseRoutes=express.Router()
purchaseRoutes.get('/purchase/premiumMembership',auth.authenticate,controllers.purchasePremium)
purchaseRoutes.post('/purchase/updateTransactionStatus',auth.authenticate,controllers.updateTransactionStatus)

module.exports=purchaseRoutes