const bycrypt = require('bcrypt')
const userModel = require('../models/User')
const { getAuth } = require('./auth')


const register = async (req, res) => {
    try {
        const { username, password } = getAuth(req.headers.authorization)
        console.log(username, password, req.body)
        const hashedPassword = await bycrypt.hash(password, 10)
        const user = new userModel({ ...req.body, username, password: hashedPassword })
        await user.save()
        res.status(201).send('User registered')
    } catch (err) {
        if (err.code === 11000) res.status(409).send('Username taken')
        else res.status(401).send('Bad input')
    }
}

const login = async (req, res) => {
    try {
        const { password } = req.body
        // if (await userModel.findOne({ username })) {
        //     res.status(409).json('Username already taken')
        //     return
        // }
        const hashedPassword = await bycrypt.hash(password, 10)
        const user = new userModel({})
        await user.save()
        res.status(201).send('User registered')
    } catch (err) { res.status(401).send('Bad input') }
}

module.exports = { register, login }