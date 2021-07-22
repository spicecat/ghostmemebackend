const express = require('express'), bodyParser = require('body-parser')
const { getAuth } = require('../services/auth')
const { register, login } = require('../services/userServices')

const userRouter = express.Router()
userRouter.route('/').post(getAuth, register)
userRouter.route('/').get(getAuth, login)

module.exports = userRouter