const bycrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')

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
        }
        else res.status(400).send('Bad input')
    } catch (err) { res.status(400).send('Bad input') }
}

// const tokenAuth = async (req, res, next) => {
//     const requestHeader = req.headers.authorization
//     if (requestHeader === undefined || requestHeader === null) res.status(401).json({ error: "Unauthorized" })
//     const [type, payload] = requestHeader.split(" ")
//     if (type === "Bearer") {
//         try {
//             const verification = jsonWebToken.verify(payload, tokenSignature)
//             console.log("Verification: ", verification)
//             try {
//                 const user = await findUser(verification.email)
//                 req.email = verification.email
//                 next()
//             } catch (error) { res.status(400).json({ error: "Bad Credentials" }) }
//             return
//         } catch (error) { }
//     }
//     res.status(401).json({ error: "Unauthorized Token" })
//     return
// }

module.exports = { getAuth }