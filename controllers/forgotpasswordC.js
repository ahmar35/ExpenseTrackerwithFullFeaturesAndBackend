const Sib=require('sib-api-v3-sdk')
const client=Sib.ApiClient.instance
const apiKey=client.authentications['api-key']
const uuid=require('uuid')
const bcrypt=require('bcrypt')
const User=require('../models/expenseCalculatorModels')
const Forgotpassword=require('../models/forgetpassword')
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

        const id = uuid.v4();
        user.createForgotpassword({ id , isActive: true })
            .catch(err => {
                throw new Error(err)
            })
    tranEmailApi.sendTransacEmail({
        sender,
        to:recievers,
        subject:'retrieve',
        textContent:`
        hii test compleeted
        `,
        htmlContent:`<a href='http://localhost:3000/password/resetpassword/${id}'>visit</a>`,
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
exports.resetPassword=async(req,res,next)=>{
    const id =  req.params.id
    const forgotpasswordrequest =await Forgotpassword.findOne({ where : { id }})
        if(forgotpasswordrequest && forgotpasswordrequest.isActive==true){
            console.log(forgotpasswordrequest.isActive)
            await forgotpasswordrequest.update({ isActive: false});
            res.status(200).send(`<html>
            <form action="/password/updatepassword/${id}" method="get">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
        </form>
    </html>`)
            res.end()

        }else{
            res.status(498)
        }
        
}
exports.updatePassword=async(req,res,next)=>{
    const newpassword=req.query.newpassword
    const resetpasswordid=req.params.resetid 
    const resetPasswordRequest=await Forgotpassword.findOne({where:{id:resetpasswordid}})
    const user=await User.findOne({where:{id:resetPasswordRequest.USERId}})
    await resetPasswordRequest.destroy()
    if(user){
        const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, async function(err, hash) {
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                        await user.update({Password:hash})
                            res.status(201).send(`<html>
                                <h1>password successfully changed</h1>
                                </html>
                            
                            `)
                            res.end()
                        })
                    })
    }               else{
                        return res.status(404).json({message:'user doesnt exist'})
    }

}
    

