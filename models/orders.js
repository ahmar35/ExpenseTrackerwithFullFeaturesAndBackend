const seq=require('../UTIL/database')
const Sequelize=require("sequelize")
const order= seq.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
})
module.exports=order