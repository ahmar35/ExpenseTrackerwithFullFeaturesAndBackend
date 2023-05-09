const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./UTIL/database')
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')
const routes=require('./routes/user')
const router=require('./routes/expense')

const User = require('./models/expenseCalculatorModels')
const ExpenseDetails=require('./models/expenseModels')
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(routes)
app.use(router)




User.hasMany(ExpenseDetails)
ExpenseDetails.belongsTo(User)




//user Login End
sequelize.sync(  /* {force:true}   */ )
app.listen(3000)
