const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageBase64: { type: String }
})

module.exports = mongoose.model('user', UserSchema)