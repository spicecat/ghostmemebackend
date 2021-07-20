const express = require('express'), bodyParser = require('body-parser')
// const { addUser, deleteUser, getUsers } = require('../services/userServices')

const userRouter = express.Router()
// userRouter.route('/').get(getUsers)
// userRouter.route('/').user(addUser)
// userRouter.route('/').delete(deleteUser)
// userRouter.route('/edit').user(deleteUser, addUser)

module.exports = userRouter