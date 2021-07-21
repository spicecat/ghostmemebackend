const bycrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')

const getAuth = authHeaders => {
    const splitOnce = (s, d) => {
        const i = s.indexOf(d)
        return [s.slice(0, i), s.slice(i + 1)]
    }
    try {
        const [authType, authContent] = splitOnce(authHeaders, ' ')
        if (authType === 'Basic') {
            const [username, password] = splitOnce(Buffer.from(authContent, 'base64').toString('ASCII'), ':')
            return { username, password }
        }

    } catch (err) { return }
}

module.exports = { getAuth }