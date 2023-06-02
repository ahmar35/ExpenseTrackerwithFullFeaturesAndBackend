const Sequelize=require('sequelize')
const sequelize=new Sequelize('expenseapp','root','Rahil123',{dialect:'mysql',host:'localhost'})
module.exports=sequelize