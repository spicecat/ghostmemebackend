const express = require('express'), bodyParser = require('body-parser')
const { getAuth, returnToken } = require('../services/auth')
const { register, login } = require('../services/userServices')

const userRouter = express.Router()
userRouter.route('/').post(getAuth, register, returnToken)
userRouter.route('/').get(getAuth, login, returnToken)

module.exports = userRouter