const bycrypt = require('bcrypt'), jsonWebToken = require('jsonwebtoken')

const { tokenSignature } = require('./var')

const getAuth = async (req, res, next) => {
    const splitOnce = (s, d) => {
        const i = s.indexOf(d)
        return [s.slice(0, i), s.slice(i + 1)]
    }
    try {
        const [authType, authContent] = splitOnce(req.headers.authorization, ' ')
        if (authType === 'Basic') {
            const [username, password] = splitOnce(Buffer.from(authContent, 'base64').toString('ASCII'), ':')
            req.body = { ...req.body, username, password }
            next()
        } else if (authType === 'Bearer') {

            next()
        }
        else res.status(400).send('Bad input')
    } catch (err) { res.status(400).send('Bad input') }
}

const createToken = async (req, res, next) => {
    req.body.token = jsonWebToken.sign({ username: req.body.username }, tokenSignature, { expiresIn: "2h" })
    next()
}

const verifyToken = async (req, res, next) => {
    if (req.body.username === jsonWebToken.verify(req.body.token, tokenSignature).username) next()
    else res.status(401).send('Bad token')
}

module.exports = { getAuth, createToken, verifyToken }