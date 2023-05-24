const ExpenseDetails=require('../models/expenseModels')
const UserDetails=require('../models/expenseCalculatorModels')
const sequelize = require('../UTIL/database')


const showLeaderBoard=async(req,res,next)=>{
    try{
    const  leaderBoardOfUsers=await UserDetails.findAll({
        
        attributes:['id','Name',[sequelize.fn('sum',sequelize.col('ExpenseDetails.Expenditure')),'totalAmount']],
        include:[
            {
            model:ExpenseDetails,
            attributes:[]
            }
    ],
    group:['user.id'],
    order:[['totalAmount','DESC']]

    })

  

    
 

    res.status(200).json(leaderBoardOfUsers)   
} catch(err){
    console.log(err)
}
    

}
module.exports={
    showLeaderBoard
}
