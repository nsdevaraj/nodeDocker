const User = require('../models/userModel')
const Post = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.signUp = async (req, res) => {
    const { username, password } = req.body
    try {

        const hashpwd = await bcrypt.hash(password, 12)
        const newUser = await User.create({ username, password: hashpwd })
        res.status(200).json({
            status: 'success',
            data: {
                user: newUser,
            },
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }

}

exports.login = async (req, res) => {
    const { username, password } = req.body
    
    try {
        const hashpwd = await bcrypt.hash(password, 12)
        const user = await User.findOne({username})
        if (!user) res.status(404).json({ status: 'no user fail' })
        const isCorrect = await bcrypt.compare(password, user.password)
         if (isCorrect) {
            res.status(200).json({
                status: 'success login'+hashpwd+' '+user.password,
            })
        }else{

            res.status(200).json({
                status: 'failed pwd login',
            })
        }
    } catch (error) {
        res.status(400).json({ status: 'fail login' })
    }

}