const express = require('express'), bodyParser = require('body-parser')
const { register, login } = require('../services/userServices')

const userRouter = express.Router()
userRouter.route('/').post(register)
userRouter.route('/').get(login)

module.exports = userRouter