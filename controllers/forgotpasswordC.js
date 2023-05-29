const Sib=require('sib-api-v3-sdk')
const client=Sib.ApiClient.instance
const apiKey=client.authentications['api-key']
const User=require('../models/expenseCalculatorModels')
require('dotenv').config()





exports.forgotPassword=async(req,res,next)=>{
    const user=await User.findOne({where:{Email:req.body.Email}})
    apiKey.apiKey=process.env.API_KEY

    
    const tranEmailApi= new Sib.TransactionalEmailsApi()

    const sender={
        email:'muhammadahmar35@gmail.com'
    }
    const recievers=[
        {
            email:req.body.Email ,
        },
    ]
    if (user){
    tranEmailApi.sendTransacEmail({
        sender,
        to:recievers,
        subject:'retrieve',
        textContent:`
        hii test compleeted
        `,
        htmlContent:`<a href='http://localhost:3000/User/LogIn'>visit</a>`,
    }).then((response)=>{
        return res.status(201).json({message:'successfully sent'})
    })

    .catch((err)=>{
        console.log('ERROOOOOR',err)
    })
}else{
    return res.json({message:'user doesnt exist'})
}
}

