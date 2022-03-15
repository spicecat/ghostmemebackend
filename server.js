const express = require('express'), bodyParser = require('body-parser'), cors = require('cors'), mongoose = require('mongoose')
// require('dotenv').config()
const app = express()

app.use((_, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})
app.use(bodyParser.json({ limit: '1.2mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const memeRoute = require('./routes/memeRoute')
const userRoute = require('./routes/userRoute')
app.use('/memes', memeRoute)
app.use('/users', userRoute)

app.get('/', (req, res) => {
    res.send(process.env.ENVTEST);
});


const mongoUrl = process.env.CONNECTION_STRING

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    useCreateIndex: true,
    useFindAndModify: false
}, err => {
    if (err) console.log('error:', err)
})

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.error(err))
dbConnection.once('open', () => console.log('Database connected!'))

module.exports = app