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

const User = require('./models/expenseCalculatorModels')
const ExpenseDetails=require('./models/expenseModels')
const order=require('./models/orders')
const app = express()
app.use(cors())

app.use(bodyParser.json())

app.use(routes)
app.use(router)
app.use(purchaseRoutes)





User.hasMany(ExpenseDetails)
ExpenseDetails.belongsTo(User)
User.hasMany(order)
order.belongsTo(User)




//user Login End
sequelize.sync(  /* {force:true}   */ )
app.listen(3000)
