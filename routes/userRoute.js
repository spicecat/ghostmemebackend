const express = require('express'), bodyParser = require('body-parser')
const { getAuth, createToken } = require('../services/auth')
const { register, login } = require('../services/userServices')

const userRouter = express.Router()
userRouter.route('/').post(getAuth, createToken, register)
userRouter.route('/').get(getAuth, createToken, login)

module.exports = userRouter