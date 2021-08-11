const express = require('express')
const { getAuth, returnToken } = require('../middleware/auth')
const { register, getUser, login, returnUser } = require('../services/userServices')

const userRouter = express.Router()
userRouter.route('/').post(getAuth, register, returnToken)
userRouter.route('/').get(getAuth, getUser, login, returnToken)
userRouter.route('/getUser').get(getAuth, getUser, returnUser)

module.exports = userRouter