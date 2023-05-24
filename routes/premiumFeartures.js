const express=require('express')
const auth=require('../middleware/auth')
const controllers=require('../controllers/leaderBoard')
const router=express.Router()

router.get('/premium/showLeaderBoard',auth.authenticate,controllers.showLeaderBoard)

module.exports=router