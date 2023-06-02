const Razorpay=require('razorpay')
const purchaseModels=require('../models/orders')
const jwt=require('jsonwebtoken')
const Order = require('../models/orders')
const userControllers=require('../controllers/user')
require('dotenv').config()

function generateAccessToken(id,ispremiumuser){
    return jwt.sign({USERId:id,ispremiumuser},'secretkey')
}


exports.purchasePremium=async(req,res,next)=>{
    console.log('first')
    try{
        console.log(process.env.RAZORPAY_KEY_ID)

        const rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount=250
        rzp.orders.create({amount,currency:'INR'},async (err,order)=>{
        try {
            if(err){

                throw new Error(JSON.stringify(err))
                console.log(err)
            }
            await req.user.createOrder({orderId:order.id,status:'pending'})
                return res.status(201).json({order,key_id:rzp.key_id})
            
            } catch (err){
                console.log(err)
                res.status(500).json({message:'something went wrong',error:err})
            }
        })
    
}catch(err){
    console.log(err)
    res.status(403).json({message:'something went wrong',error:err})
}
        
}

 exports.updateTransactionStatus =async (req, res) => { 

    try{
    const {payment_id, order_id} = req.body;
    

    
    const order=await Order.findOne({where: {orderid: order_id}})
    
        const promise1=order.update({ paymentId: payment_id, status: 'SUCCESSFUL'})
    
        const promise2= req.user.update({ ispremiumuser: true })
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({sucess: true, message: "Transaction Successful",token:generateAccessToken(req.user.id,true)})


        }).catch(err=>{
            console.log(err)
        })
        }catch (err){
        console.log(err)
        res.status(403).json({message:'something went wrong'})
 }
    
 
} 

    

