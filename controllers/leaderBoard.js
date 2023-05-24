const ExpenseDetails=require('../models/expenseModels')
const UserDetails=require('../models/expenseCalculatorModels')


exports.showLeaderBoard=async(req,res,next)=>{
    try{
    const  userdetails=await UserDetails.findAll()

    const expensedetails=await ExpenseDetails.findAll()
    const totalExpense={}

    expensedetails.forEach((expense)=>{
        if(totalExpense[expense.USERId]){
            totalExpense[expense.USERId]=parseInt(totalExpense[expense.USERId])+parseInt(expense.Expenditure)
        }else{
            totalExpense[expense.USERId]=expense.Expenditure
        }

    })

    var userLeaderboardDetails=[]
    userdetails.forEach((user)=>{
        if (totalExpense[user.id]===undefined){
            totalExpense[user.id]=0
        }
        userLeaderboardDetails.push({name:user.Name,totalAmount:totalExpense[user.id]})
        userLeaderboardDetails.sort((a,b)=> b.totalAmount-a.totalAmount)

    })

    res.status(200).json(userLeaderboardDetails)   
} catch(err){
    console.log(err)
}
    

}

