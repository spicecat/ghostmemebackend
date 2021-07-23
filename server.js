require('dotenv').config()
const mongoose = require('mongoose'), app = require('./index')

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
app.listen(port, console.log('listening at port:', port))