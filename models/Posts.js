const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('posts', PostsSchema)