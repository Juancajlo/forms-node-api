
const { sequelize, User} = require('../models')


const login = async(req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(usuario == null) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }



    res.json({
        user
    })

}


module.exports = {
    login
}