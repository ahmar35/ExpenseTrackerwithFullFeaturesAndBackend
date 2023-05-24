const ExpenseDetails=require('../models/expenseModels')
const User=require('../models/expenseCalculatorModels')
const { use } = require('../routes/purchase')
exports.postExpenseDetails=async(req,res,next)=>{
    
    
    const Expenditure=req.body.EXPENDITURE
    const Description=req.body.DESCRIPTION 
    const Category=req.body.CATEGORY
    const info =await ExpenseDetails.create({Expenditure,Description,Category,USERId:req.user.id})
        res.status(201).json(info)
    const totalAmount=Number(req.user.TotalExpense)+Number(Expenditure)
    await User.update({
        TotalExpense:totalAmount
    },{where:{id:req.user.id}})
    console.log(totalAmount)
 
   
}

exports.getExpenseDetails=async(req,res,next)=>{
    const info=await ExpenseDetails.findAll({where:{USERId:req.user.id}})
    res.status(200).json(info)
}

exports.deleteExpenseInfo=async(req,res,next)=>{
    await ExpenseDetails.destroy({where:{USERId:req.user.id}})
    res.status(201).json({message:"deleted" })

}