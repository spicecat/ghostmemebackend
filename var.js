const port = 3030
const apiUrl = 'https://ghostmeme.api.hscc.bdpa.org/v1'
const apiKey = process.env.REACT_APP_API_KEY
const tokenSignature = process.env.TOKEN_SIGNATURE

module.exports = { port, apiUrl, apiKey, tokenSignature }