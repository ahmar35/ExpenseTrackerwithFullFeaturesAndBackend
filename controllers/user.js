const User=require('../models/expenseCalculatorModels')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.signupPost=async(req, res, next) => {

    const Name = req.body.NAME
    const Email = req.body.EMAIL
    const Password = req.body.PASSWORD
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(Password, salt, function (err, hash) {
            const info = User.create({ Name, Email, Password: hash }).then(() => {
                res.status(201).json({ message: 'Successfuly create new user' })
            }).catch(err => {
                res.status(403).json(err);
            })

        })
    })


}
function generateAccessToken(id){
    return jwt.sign({USERId:id},'secretkey')
}
exports.logInPost=async (req, res, next) => {
    try {
        const Email = req.body.EMAIL
        const Password = req.body.PASSWORD
        const UserInfo = await User.findAll({ where: { Email } })
        const userId=UserInfo[0].id

        if (UserInfo.length > 0) {
            bcrypt.compare(Password, UserInfo[0].Password, (err, result) => {
                if (err) {
                    res.status(500).json({ message: 'Something Went Wrong' })
                } else if (result == true) {
                    res.status(201).json({message:'logged in successfully',token:generateAccessToken(UserInfo[0].id)})
                } else {
                    return res.status(401).json({ message: 'Incorrect Password' })
                }
            })
        }
        else {
            return res.status(404).json({ message: 'User Not Found' })
        }
    } catch (err) {
        res.status(400).json({ message: 'Something Went Wrong' })

    }
}