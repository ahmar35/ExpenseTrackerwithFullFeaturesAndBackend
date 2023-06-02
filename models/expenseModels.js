const seq=require('../UTIL/database')
const Sequelize=require("sequelize")
const expenseModels=seq.define('ExpenseDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true

    },
    Expenditure:{
        type:Sequelize.STRING

    },
    Description:{
        type:Sequelize.STRING,
    },
    Category:{
        type:Sequelize.STRING,
    }
 
}


)
module.exports=expenseModels