const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: { type: Number, required: true, default: 0 },
    liked: { type: Number, required: true, default: 0 },
    deleted: { type: Boolean, required: true, default: false },
    imageUrl: { type: String }
})

module.exports = mongoose.model('user', UserSchema)