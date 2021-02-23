const {Router} = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt =require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

//api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email incorect').isEmail(),
        check('password','Parola prea scurta').isLength({min: 6 })
    ],
    async (req,res) => {
try{
    const {email, password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: 'Date incorecte la inregistrare'
        })
    }

    const candidate = await User.findOne({ email })

    if (candidate){
        return res.status(400).json({message:'Asa user exista'})
    }
    const hashedPassword = await bcrypt.hash(password,12)
    const user = new User({email, password:hashedPassword})
    await user.save()
    res.status(201).json({ message: 'Userul este creat'})

}catch (e) {
    res.status(500).json({message: 'Ceva a mers gresit'})
}
})

router.post('/login',
    [
        check('email','Introduceti datele corect').normalizeEmail().isEmail(),
        check('password','Introduceti parola').exists()

    ],
    async (req,res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Date incorecte la logare'
            })
        }

    const { email , password} = req.body
    const user = await User.findOne({ email })
        if (!user){
            return res.status(400).json({message:'Userul lipseste'})
        }
    const isMatch =   await bcrypt.compare(password,user.password)
    if (!isMatch){
        return  res.status(400).json({message:'Parola incorecta'})
    }
    const token = jwt.sign(
        {useId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
    )
    res.json({token, userId: user.id})
    }catch (e) {
        res.status(500).json({message: 'Ceva a mers gresit'})
    }
})

module.exports = router