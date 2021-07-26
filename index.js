const express = require('express'), bodyParser = require('body-parser'), cors = require('cors')
const app = express()

app.use((req, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})
app.use(bodyParser.json({ limit: '500kb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const memeRoute = require('./routes/memeRoute')
const userRoute = require('./routes/userRoute')
app.use('/memes', memeRoute)
app.use('/users', userRoute)


module.exports = app