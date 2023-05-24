const seq=require('../UTIL/database')
const Sequelize=require("sequelize")
const userInfo=seq.define('USER',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true

    },
    Name:{
        type:Sequelize.STRING

    },
    Email:{
        type:Sequelize.STRING,
        unique:true
    },
    Password:{
        type:Sequelize.STRING,
    },
    TotalExpense:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        },
    ispremiumuser:Sequelize.BOOLEAN,

    },
    



)
module.exports=userInfo