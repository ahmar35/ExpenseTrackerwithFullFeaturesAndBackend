const User=require('../models/expenseCalculatorModels')
const jwt=require('jsonwebtoken')
const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        var user=jwt.verify(token,'secretkey')
        User.findByPk(user.USERId).then(user=>{
            req.user=user
            next()
        })

    }catch(err){
        console.log(err)
    }

}
module.exports={authenticate}