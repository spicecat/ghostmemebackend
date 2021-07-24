const express = require('express')
const { getAuth, returnToken } = require('../services/auth')
const { register, getUser, login } = require('../services/userServices')

const userRouter = express.Router()
userRouter.route('/').post(getAuth, register, returnToken)
userRouter.route('/').get(getAuth, getUser, login, returnToken)

module.exports = userRouter