const superagent = require('superagent'), bycrypt = require('bcrypt')
const userModel = require('../models/User')

const { apiUrl, apiKey } = require('./var')

const baseUrl = apiUrl + '/users'

const nullifyUndefined = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v || null]))

// const updateDatabase = async () => {
//     const url = baseUrl
//     const { users } = (await superagent.get(url).set('key', apiKey)).body
//     console.log(users)
// }

const register = async (req, res, next) => {
    const url = baseUrl
    const { name, email, phone, username, imageBase64, password } = req.body
    try { var response = await superagent.post(url, nullifyUndefined({ name, email, phone, username, imageBase64: null })).set('key', apiKey) }
    catch (err) {
        if (err.status === 555) setTimeout(async () => { await register(req, res, next) }, 1500)
        else {
            const error = err.response.body.error
            if (error === 'a user with that email address already exists' ||
                error === 'a user with that username already exists')
                res.sendStatus(409)
            else res.status(400).send({ error })
        }
        return
    }
    const { user } = response.body
    console.log(user)

    const hashedPassword = await bycrypt.hash(password, 10)
    await new userModel({ user_id: user.user_id, username, email, password: hashedPassword, imageBase64 }).save()
    next()
}

const getUser = async (req, res, next) => {
    const { username } = req.body
    const user = await userModel.findOne({
        $or: [
            { username },
            { email: username }
        ]
    })
    if (user) req.body.user = user
    else {
        res.sendStatus(401)
        return
    }
    next()
}

const login = async (req, res, next) => {
    const { password, user } = req.body
    if (user && await bycrypt.compare(password, user.password)) next()
    else res.sendStatus(401)
}

const returnUser = async (req, res) => {
    res.status(202).send({ user_id: req.body.user.user_id, imageBase64: req.body.user.imageBase64 })
}

module.exports = { register, getUser, login, returnUser }