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

const getUser = async username => {
    const url = baseUrl + '/' + username.split('/', 1)
    console.log(url)
    try {
        var response = await superagent.get(url).set('key', apiKey)
    } catch (err) {
        if (err.status === 555) {
            const retry = async () => new Promise(resolve => setTimeout(() => resolve(getUser(username)), 1500))
            return await retry()
        }
        return {}
    }
    const { user } = response.body
    console.log(user)
    return user
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const { user_id } = await getUser(username)
        if (user_id) {
            const user = await userModel.findOne({ user_id })
            console.log(user)
            if (user && await bycrypt.compare(password, user.password)) next()
            else res.status(401).send({ error: 'Bad credentials' })
        }
        else res.status(401).send({ error: 'Bad credentials' })
    } catch (err) { res.status(400).send({ error: 'Bad input' }) }
}

module.exports = { register, login }