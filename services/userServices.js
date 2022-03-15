const superagent = require('superagent'), bycrypt = require('bcrypt')
const userModel = require('../models/User')

const { apiUrl, apiKey } = require('../var')

const baseUrl = apiUrl + '/users'

const nullifyUndefined = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v || null]))

const register = async (req, res, next) => {
    const url = baseUrl
    const { name, email, phone, username, imageBase64, password } = req.body
    try { var response = await superagent.post(url, nullifyUndefined({ name, email, phone, username, imageBase64 })).set('key', apiKey) }
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
    await new userModel({ user_id: user.user_id, username, email, password: hashedPassword }).save()
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
    const { user_id, notifications, blocked, blockedBy } = req.body.user
    res.status(202).send({ user_id, notifications, blocked, blockedBy })
}

const updatePassword = async (req, res, next) => {
    const { password, email } = req.body
    console.log(password)
    const hashedPassword = await bycrypt.hash(password, 10)
    console.log(hashedPassword)
    await userModel.findOneAndUpdate({ email }, { password: hashedPassword })
}

const updateProfileInfo = async (req, res, next) => {
    const { name, email, phone, newPassword, imageBase64 } = req.body
    const { user_id } = req.body.user

    // console.log(newPassword)
    console.log(name)
    if (newPassword !== undefined) {
        var hashedPassword = await bycrypt.hash(newPassword, 10)
        await userModel.findOneAndUpdate({ user_id }, { password: hashedPassword })
    }

    const url = apiUrl + `/users/${user_id}`
    console.log(url)
    // await userModel.findOneAndUpdate({user_id},{name, email, phone, username, imageUrl})
    // await superagent.put(url).set('key',apiKey).send(name,email,phone, imageUrl)
    var response = await superagent.put(url, nullifyUndefined({ name, email, phone, imageBase64 })).set('key', apiKey)
    res.sendStatus(200)
}
const blockUser = async (req, res, next) => {
    const { target_id } = req.body
    const { blockedBy = [] } = await userModel.findOne({ user_id: target_id }) || {}

    const { user_id, blocked } = req.body.user
    const deleteFromArray = (arr, e) => arr.splice(arr.indexOf(e), 1)
    if (blocked.includes(target_id)) {
        deleteFromArray(blocked, target_id)
        deleteFromArray(blockedBy, user_id)
    }
    else {
        blocked.push(target_id)
        blockedBy.push(user_id)
    }
    await userModel.findOneAndUpdate({ user_id }, { blocked })
    await userModel.findOneAndUpdate({ user_id: target_id }, { blockedBy })
    next()
}

module.exports = { register, getUser, login, returnUser, updatePassword, updateProfileInfo, blockUser }
