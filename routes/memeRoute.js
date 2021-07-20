const express = require('express'), bodyParser = require('body-parser')
// const { addMeme, deleteMeme, getMemes } = require('../services/memeServices')

const memeRouter = express.Router()
// memeRouter.route('/').get(getMemes)
// memeRouter.route('/').meme(addMeme)
// memeRouter.route('/').delete(deleteMeme)
// memeRouter.route('/edit').meme(deleteMeme, addMeme)

module.exports = memeRouter