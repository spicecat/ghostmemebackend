const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const AllPosts = require('./services/AllPosts')
const CreatePost = require('./services/CreatePost.js')
const DeletePost = require('./services/DeletePost')
const UpdatePost = require('./services/UpdatePost.js')

app.get('/all', AllPosts)
app.post('/create', CreatePost)
app.delete('/delete', DeletePost)
app.post('/update', UpdatePost)

module.exports = app