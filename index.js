const express = require('express'), bodyParser = require('body-parser'), cors = require('cors')
const app = express()

app.use((req, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const postRoute = require('./routes/postRoute')
app.use('/post', postRoute)


const mongoose = require('mongoose'), dotenv = require('dotenv').config()
const mongoUrl = process.env.CONNECTION_STRING

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    useCreateIndex: true
}, err => {
    if (err) console.log('error:', err)
})
const dbConnection = mongoose.connection
dbConnection.on('error', err => console.error(err))
dbConnection.once('open', () => console.log('Database connected!'))


const port = 3030
app.listen(port, console.log('port:', port))