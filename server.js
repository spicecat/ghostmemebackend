require('dotenv').config()
const app = require('./index')
const mongoose = require('mongoose')

const port = 3030

mongoose.connect(process.env.CONNECTION_STRING, {}, err => {
    if (err) {
        console.log('Oh no!', err)
        return
    }
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})