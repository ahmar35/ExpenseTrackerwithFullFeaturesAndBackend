const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./UTIL/database')
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')
const routes=require('./routes/user')
const router=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const premiumRoutes=require('./routes/premiumFeartures')
const forgotPasswordRoutes=require('./routes/forgotpasswordroutes')

const User = require('./models/expenseCalculatorModels')
const ExpenseDetails=require('./models/expenseModels')
const order=require('./models/orders')
const Forgotpassword=require('./models/forgetpassword')
const app = express()
app.use(cors())

app.use(bodyParser.json())

app.use(routes)
app.use(router)
app.use(purchaseRoutes)
app.use(premiumRoutes)
app.use(forgotPasswordRoutes)





User.hasMany(ExpenseDetails)
ExpenseDetails.belongsTo(User)
User.hasMany(order)
order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);




sequelize.sync(  /* {force:true}   */ )
app.listen(3000)
