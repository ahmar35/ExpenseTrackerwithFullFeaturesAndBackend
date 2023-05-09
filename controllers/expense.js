const ExpenseDetails=require('../models/expenseModels')
exports.postExpenseDetails=async(req,res,next)=>{
    
    
    const Expenditure=req.body.EXPENDITURE
    const Description=req.body.DESCRIPTION 
    const Category=req.body.CATEGORY
    const info =await ExpenseDetails.create({Expenditure,Description,Category,USERId:req.user.id})
        res.status(201).json(info)
    
    
   
}

exports.getExpenseDetails=async(req,res,next)=>{
    const info=await ExpenseDetails.findAll({where:{USERId:req.user.id}})
    res.status(200).json(info)
}

exports.deleteExpenseInfo=async(req,res,next)=>{
    await ExpenseDetails.destroy({where:{USERId:req.user.id}})
    res.status(201).json({message:"deleted" })

}