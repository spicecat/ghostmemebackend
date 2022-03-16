const express = require('express'), bodyParser = require('body-parser'), cors = require('cors'), mongoose = require('mongoose')
if (!process.env.LOADED) require('dotenv-json')()

const app = express()

app.use((_, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})
app.use(bodyParser.json({ limit: '1.2mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

app.get('/env', (req, res) => { res.send(process.env.LOADED) })
app.get('/', (req, res) => { res.send("home") })

const mongoUrl = process.env.CONNECTION_STRING

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
}, err => {
    if (err) console.log('error:', err)
})

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.error(err))
dbConnection.once('open', () => console.log('Database connected!'))

module.exports = app