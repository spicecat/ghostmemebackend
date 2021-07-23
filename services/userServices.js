const superagent = require('superagent'), bycrypt = require('bcrypt')
const userModel = require('../models/User')

const { apiUrl, apiKey } = require('./var')

const baseUrl = apiUrl + '/users'

const nullifyUndefined = obj => Object.fromEntries(Object.entries(obj).map(v => [v[0], v[1] || null]))

const register = async (req, res) => {
    const url = baseUrl
    try {
        const { name, email, phone, username, imageBase64, password, token } = req.body
        const { user } = (await superagent.post(url, nullifyUndefined({ name, email, phone, username })).set('key', apiKey)).body
        const hashedPassword = await bycrypt.hash(password, 10)
        await new userModel({ user_id: user.user_id, password: hashedPassword, imageBase64 }).save()
        res.status(201).send({ token })
    } catch (err) {
        console.log(err)
        if (err.code === 11000) res.status(409).send({ error: 'Username taken' })
        else res.status(400).send({ error: 'Bad input' })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (user && await bycrypt.compare(password, user.password))
            res.status(202).send({ token: req.body.token })
        else res.status(401).send({ error: 'Bad credentials' })
    } catch (err) { res.status(400).send({ error: 'Bad input' }) }
}

module.exports = { register, login }