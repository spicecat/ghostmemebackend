const bycrypt = require('bcrypt')
const userModel = require('../models/User')
const { getAuth } = require('./auth')


const register = async (req, res) => {
    try {
        const hashedPassword = await bycrypt.hash(req.body.password, 10)
        const user = new userModel({ ...req.body, password: hashedPassword })
        await user.save()
        res.status(201).send('User registered')
    } catch (err) {
        if (err.code === 11000) res.status(409).send('Username taken')
        else res.status(400).send('Bad input')
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (user && await bycrypt.compare(password, user.password))
            res.status(202).send('Login successful')
        else res.status(401).send('Bad credentials')
    } catch (err) { res.status(400).send('Bad input') }
}

module.exports = { register, login }