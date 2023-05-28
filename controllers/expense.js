const ExpenseDetails=require('../models/expenseModels')
const User=require('../models/expenseCalculatorModels')
const { use } = require('../routes/purchase')
const Sequelize=require('../UTIL/database')

exports.postExpenseDetails=async(req,res,next)=>{
    const t=await Sequelize.transaction()

    try{
    const Expenditure=req.body.EXPENDITURE
    const Description=req.body.DESCRIPTION 
    const Category=req.body.CATEGORY

    if(Expenditure==undefined||Expenditure.length==0){
        res.status(400).json({success:false,message:'parameter missing'})
    }
    const info =await ExpenseDetails.create({Expenditure,Description,Category,USERId:req.user.id},{transaction:t})
        const totalAmount=Number(req.user.TotalExpense)+Number(Expenditure)
        await User.update({
            TotalExpense:totalAmount
        },{where:{id:req.user.id},
        transaction:t
    })  
        await t.commit()
        res.status(201).json(info)

}catch(err){
    await t.rollback()
    res.status(500).json({success:false,error:err})
}
 
   
}

exports.getExpenseDetails=async(req,res,next)=>{
    const info=await ExpenseDetails.findAll({where:{USERId:req.user.id}})
    res.status(200).json(info)
}

exports.deleteExpenseInfo=async(req,res,next)=>{
    const t=await Sequelize.transaction()
    try{
    const info=await  ExpenseDetails.findAll({where:{id:req.params.id},transaction:t})
    const DeletingExpense=info[0].Expenditure


    await ExpenseDetails.destroy({where:{id:req.params.id},transaction:t})
        const totalAmount=Number(req.user.TotalExpense)-Number(DeletingExpense)
        await User.update({TotalExpense:totalAmount},{whre:{id:req.user.id},transaction:t}) 
        await t.commit()
        res.status(201).json({message:"deleted" })

    } catch(err){
        await t.rollback()
        res.status(500).json({success:false,error:err})
    }


   



}