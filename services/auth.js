const jsonWebToken = require('jsonwebtoken')

const getAuth = authHeaders => {
    const splitOnce = (s, d) => {
        const i = s.indexOf(d)
        return [s.slice(0, i), s.slice(i + 1)]
    }
    try {
        console.log(authHeaders)
        const [authType, authContent] = splitOnce(authHeaders, ' ')
        if (authType === 'Basic') {
            const [username, password] = splitOnce(Buffer.from(authContent, 'base64').toString('ASCII'), ':')
            return { username, password }
        }

    } catch (err) { return }
}

const authUser = (username, password) => {
}

module.exports = { getAuth, authUser }