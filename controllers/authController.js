const User = require('../models/userModel')
const Post = require('../models/userModel')
const bcrypt = require('bcrypt') 

exports.signUp = async (req, res) => {
    const {username, password} = req.body
    const hashpwd = await bcrypt.hashpwd(password,12)
    try {

        const newUser = await User.create( {username, password:hashpwd})
        res.status(200).json({ 
            status: 'success', 
            data:{
                user: newUser,
            },
        })
    } catch (error) {
        res.status(400).json({ status: 'fail' })
    }

}