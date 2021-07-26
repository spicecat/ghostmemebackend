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
        else res.sendStatus(401)
        return
    }
    const { user } = response.body
    console.log(user)
    req.body.userCreds = {}

    try { // add locally stored profile picture to user
        const userCreds = await userModel.findOne({ user_id: user.user_id })
        user.imageBase64 = userCreds.imageBase64
        req.body.userCreds = userCreds
    }
    catch { }
    req.body.user = user
    next()
}

const login = async (req, res, next) => {
    const { password, userCreds } = req.body
    if (userCreds && await bycrypt.compare(password, userCreds.password)) next()
    else res.sendStatus(401)
}

const returnUser = async (req, res) => {
    res.status(202).send({ user: req.body.user })
}

module.exports = { register, getUser, login, returnUser }