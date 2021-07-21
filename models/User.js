const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/,
        required: true
    },
    phone: {
        type: String,
        match: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: { type: Number, required: true, default: 0 },
    liked: { type: Number, required: true, default: 0 },
    deleted: { type: Boolean, required: true, default: false },
    imageUrl: { type: String }
})

module.exports = mongoose.model('user', UserSchema)