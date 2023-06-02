const seq=require('../UTIL/database')
const Sequelize=require("sequelize")

const ForgotPassword=seq.define('forgotpassword',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.BOOLEAN
    }
  

})
module.exports=ForgotPassword