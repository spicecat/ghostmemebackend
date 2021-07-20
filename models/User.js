const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    email: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('user', UserSchema)