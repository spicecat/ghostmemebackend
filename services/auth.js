const jsonWebToken = require('jsonwebtoken')

const { tokenSignature } = require('./var')


const splitOnce = (s, d) => {
    const i = s.indexOf(d)
    return [s.slice(0, i), s.slice(i + 1)]
}

const getAuth = async (req, res, next) => {
    try {
        // console.log(req.header('x-forwarded-for'), req.connection.remoteAddress, req.ip)
        const [authType, authContent] = splitOnce(req.headers.authorization, ' ')
        console.log(req.body, authType, authContent)
        if (authType === 'Basic') {
            const [username, password] = splitOnce(Buffer.from(authContent, 'base64').toString('ASCII'), ':')
            req.body.username = username
            req.body.password = password
            next()
        } else if (authType === 'Bearer') {
            try {
                const verification = verifyToken(authContent)
                req.body.username = verification.username
                console.log(verification)
                next()
            } catch (err) { res.sendStatus(401) }
        }
        else res.sendStatus(401)
    } catch (err) { res.sendStatus(400) }
}

const returnToken = async (req, res) => {
    console.log(req.query)
    res.status(202).send({ token: jsonWebToken.sign({ username: req.body.username }, tokenSignature, req.query.rememberMe && { expiresIn: '2h' }) })
}

const verifyToken = token => jsonWebToken.verify(token, tokenSignature)

module.exports = { getAuth, returnToken, verifyToken }