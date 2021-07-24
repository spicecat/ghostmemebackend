const superagent = require('superagent'), bycrypt = require('bcrypt')
const userModel = require('../models/User')

const { apiUrl, apiKey } = require('./var')

const baseUrl = apiUrl + '/users'

const nullifyUndefined = obj => Object.fromEntries(Object.entries(obj).map(v => [v[0], v[1] || null]))

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
        else res.status(400).send({ error: err.response.body.error })
        return
    }
    const { user } = response.body
    console.log(user)
    const hashedPassword = await bycrypt.hash(password, 10)
    await new userModel({ user_id: user.user_id, password: hashedPassword, imageBase64 }).save()
    next()
}

const getUser = async (req, res, next) => {
    const { username } = req.body
    const url = baseUrl + '/' + username.split('/', 1)
    console.log(url)
    try {
        var response = await superagent.get(url).set('key', apiKey)
    } catch (err) {
        if (err.status === 555) setTimeout(async () => { await getUser(req, res, next) }, 1500)
        res.sendStatus(401)
        return
    }
    const { user } = response.body
    console.log(user)
    req.body.user = user
    next()
}

const login = async (req, res, next) => {
    const { password } = req.body, { user_id } = req.body.user
    const user = await userModel.findOne({ user_id })
    req.body.user.imageBase64 = user.imageBase64
    console.log(user)
    if (user && await bycrypt.compare(password, user.password)) next()
    else res.sendStatus(401)
}

module.exports = { register, getUser, login }