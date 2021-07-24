const bycrypt = require('bcrypt'), jsonWebToken = require('jsonwebtoken')

const { tokenSignature } = require('./var')


const splitOnce = (s, d) => {
    const i = s.indexOf(d)
    return [s.slice(0, i), s.slice(i + 1)]
}

const getAuth = async (req, res, next) => {
    try {
        const [authType, authContent] = splitOnce(req.headers.authorization, ' ')
        console.log(req.body, authType, authContent)
        if (authType === 'Basic') {
            const [username, password] = splitOnce(Buffer.from(authContent, 'base64').toString('ASCII'), ':')
            req.body.username = username
            req.body.password = password
            next()
        } else if (authType === 'Bearer') next()
        else res.sendStatus(400)
    } catch (err) { res.sendStatus(400) }
}

const returnToken = async (req, res) => {
    res.status(202).send({ user: req.body.user, token: jsonWebToken.sign({ username: req.body.username }, tokenSignature, { expiresIn: "2h" }) })
}

const verifyToken = async (req, res, next) => {
    if (req.body.username === jsonWebToken.verify(req.body.token, tokenSignature).username) next()
    else res.sendStatus(401)
}

module.exports = { getAuth, returnToken, verifyToken }